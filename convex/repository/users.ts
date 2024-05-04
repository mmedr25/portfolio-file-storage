import { v } from "convex/values";
import { MutationCtx, QueryCtx, internalMutation } from "../_generated/server";

export type Ctx = QueryCtx | MutationCtx;

// queries
export function getUserDetails(ctx: Ctx, tokenIdentifier: string) {
    return ctx.db.query("users")
        .withIndex(
            "by_tokenIdentifier", 
            q => q.eq("tokenIdentifier", tokenIdentifier)
        )
        .first();
}

// mutations
export const createUser = internalMutation({
    args: { 
        tokenIdentifier: v.string(),
        // name: v.string(), 
        // image: v.string() 
    },
    async handler(ctx, args) {
        ctx.db.insert("users", {
            tokenIdentifier: args.tokenIdentifier,
            organizationIds: [],
            // name: args.name,
            // image: args.image,
        });
    }
});

export const addOrganizationToUser = internalMutation({
    args: { 
        tokenIdentifier: v.string(),
        organizationId: v.string()
    },
    async handler(ctx, args) {
        const user = await getUserDetails(ctx, args.tokenIdentifier);
        
        if (!user) return

        ctx.db.patch(user._id, {
            organizationIds: [...user.organizationIds, args.organizationId],
        });
    },
});