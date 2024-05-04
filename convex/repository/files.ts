import { ConvexError, v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { convexCurrentUser } from "./auth";
import { Ctx, getUserDetails } from "./users";

// TODO: type safe
const hasPermission = async (ctx: Ctx, organizationId: string) => {
    // return true
    const authenticatedUser = await convexCurrentUser(ctx)
	console.log("TCL: hasPermission -> authenticatedUser", authenticatedUser)

    if (!authenticatedUser) return false;

    const userDetails = await getUserDetails(ctx, authenticatedUser.tokenIdentifier)

    // has permission
    return (
        userDetails?.organizationIds.includes(organizationId) || 
        userDetails?.tokenIdentifier.includes(organizationId)
    )
    return authenticatedUser
}

// mutations
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const createFile = mutation({
    args: {
        fileId: v.id("_storage"),
        name: v.string(),
        organizationId: v.string(),
    },
    async handler(ctx, args) {
        const organizationId = args.organizationId
        
        const hasPerm = await hasPermission(ctx, organizationId)

        if (!hasPerm) {
            throw new ConvexError("no organization found")
        }

        ctx.db.insert("files", {
            name: args.name,
            organizationId: organizationId,
            fileId: args.fileId,
        })
    },
})

// queries
export const getFiles = query({
    args: {
        organizationId: v.string(),
    },
    async handler(ctx, args) {
        const organizationId = args.organizationId
        
        if (!organizationId) throw new ConvexError("no organization found")

        // const hasPerm = await ctx.auth.getUserIdentity()
		// console.log("TCL: handler -> hasPerm", hasPerm)
        //  currentUser()
        const hasPerm = hasPermission(ctx, organizationId)
        
        if (!hasPerm) return []

        return ctx.db.query("files").withIndex(
            "by_organizationId",
            q => q.eq("organizationId", organizationId)
        ).collect()
    },
})