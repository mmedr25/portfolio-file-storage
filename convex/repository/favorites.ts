import { ConvexError, v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { hasAccessToFile, hasPermission } from "./auth";

export const toggleFavorite = mutation({
    args: { 
        fileId: v.id("files")
    },
    async handler(ctx, args) {
        const userDetails = await hasAccessToFile(ctx, args.fileId);

        if (!userDetails) {
            throw new ConvexError("no access to file");
        }

        const favorite = await ctx.db
            .query("favorites")
            .withIndex("by_userId_orgId_fileId", (q) =>
            q
                .eq("userId", userDetails.user._id)
                .eq("organizationId", userDetails.file.organizationId)
                .eq("fileId", userDetails.file._id)
            )
            .first();

        if (!favorite) {
            return await ctx.db.insert("favorites", {
                fileId: userDetails.file._id,
                userId: userDetails.user._id,
                organizationId: userDetails.file.organizationId,
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
    //   const userDetails = await hasAccessToFile(ctx, args.fileId);

  
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
        // const userDetails = await hasPermission(ctx, args.organizationId);
        
        const userDetails = await hasAccessToFile(ctx, args.fileId);

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


