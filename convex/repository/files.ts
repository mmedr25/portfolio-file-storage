import { ConvexError, v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { convexCurrentUser } from "./auth";
import { Ctx, getUserDetails } from "./users";

// mutations
// TODO: type safe
const hasPermission = async (ctx: Ctx, organizationId: string) => {
    // return true
    const authenticatedUser = await convexCurrentUser(ctx)
	console.log("TCL: hasPermission -> authenticatedUser", authenticatedUser)

    if (!authenticatedUser) return false;

    const user = await getUserDetails(ctx, authenticatedUser.tokenIdentifier)

    if (!user) return false

    // has permission
    return (
        user.organizationIds.includes(organizationId) || 
        user.tokenIdentifier.includes(organizationId)
    )
}

export const createFile = mutation({
    args: {
        name: v.string(),
        organizationId: v.string(),
    },
    async handler(ctx, args) {
        const organizationId = args.organizationId
        
        const hasPerm = await hasPermission(ctx, organizationId)

        if (!hasPerm) {
            throw new ConvexError("You can not use this service")
        }

        ctx.db.insert("files", {
            name: args.name,
            organizationId: organizationId
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
        
        const hasPerm = await hasPermission(ctx, organizationId)

        if (!hasPerm) return []

        return ctx.db.query("files").withIndex(
            "by_organizationId",
            q => q.eq("organizationId", args.organizationId)
        ).collect()
    },
})