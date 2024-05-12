import { ConvexError, v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { hasPermission } from "./auth";

export const toggleFavorite = mutation({
    args: { 
        fileId: v.id("files"),
        organizationId: v.string()
    },
    async handler(ctx, args) {
        const userDetails = await hasPermission(ctx, args.organizationId);

        if (!userDetails) {
            throw new ConvexError("no access to file");
        }

        const favorite = await ctx.db
            .query("favorites")
            .withIndex("by_userId_orgId_fileId", (q) =>
            q
                .eq("userId", userDetails.user._id)
                .eq("organizationId", args.organizationId)
                .eq("fileId", args.fileId)
            )
            .first();

        if (!favorite) {
            return await ctx.db.insert("favorites", {
                fileId: args.fileId,
                userId: userDetails.user._id,
                organizationId: args.organizationId,
            })
            
        }

        ctx.db.delete(favorite._id);
    }
});

  
export const getAllFavorites = query({
    args: { 
        organizationId: v.string() 
    },
    async handler(ctx, args) {
      const userDetails = await hasPermission(ctx, args.organizationId);
  
      if (!userDetails || !userDetails.user) return []; 
  
      return ctx.db.query("favorites")
        .withIndex(
            "by_userId_orgId_fileId", 
            (q) => q.eq("userId", userDetails.user?._id)
                    .eq("organizationId", args.organizationId)
        ).collect();
    },
});


export const getFavorite = query({
    args: { 
        fileId: v.id("files"),
        organizationId: v.string()
    },
    async handler(ctx, args) {
        const userDetails = await hasPermission(ctx, args.organizationId);

        if (!userDetails || !userDetails.user) return null;
  
        return await ctx.db.query("favorites")
            .withIndex(
                "by_userId_orgId_fileId", 
                (q) => q.eq("userId", userDetails.user?._id)
                        .eq("organizationId", args.organizationId)
                        .eq("fileId", args.fileId)
            ).first();
    },
});