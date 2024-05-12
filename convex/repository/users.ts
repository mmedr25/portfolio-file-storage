import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, internalMutation, query } from "../_generated/server";
import { Roles } from "../models/users";
import { convexCurrentUser } from "./auth";

export type Ctx = QueryCtx | MutationCtx;

// queries
export const getUserDetails = query({
    args: {
        tokenIdentifier: v.string()
    },
    async handler(ctx, args) {
        return ctx.db.query("users")
            .withIndex(
                "by_tokenIdentifier", 
                q => q.eq("tokenIdentifier", args.tokenIdentifier)
            )
            .first();
    },
})

export const getMe = query({
    args: {},
    async handler(ctx) {
        const authUser = await convexCurrentUser(ctx);
  
        if (!authUser) return null; 

        const userDetails = await getUserDetails(ctx, {tokenIdentifier: authUser.tokenIdentifier});

        if (!userDetails)  return null;
  
        return {
            _id: userDetails._id,
            _creationTime: userDetails._creationTime,
            name: userDetails?.name,
            image: userDetails?.image
        }
    },
});

// mutations
export const createUser = internalMutation({
    args: { 
        tokenIdentifier: v.string(),
        name: v.optional(v.string()), 
        image: v.optional(v.string()) 
    },
    async handler(ctx, args) {
        ctx.db.insert("users", {
            tokenIdentifier: args.tokenIdentifier,
            organizationIds: [],
            name: args.name,
            image: args.image,
        });
    }
});

export const updateUser = internalMutation({
    args: { 
        tokenIdentifier: v.string(), 
        name: v.string(), 
        image: v.string() 
    },
    async handler(ctx, args) {
      const user = await ctx.db.query("users")
        .withIndex(
            "by_tokenIdentifier", 
            (q) => q.eq("tokenIdentifier", args.tokenIdentifier)
        ).first();
  
      if (!user) {
        throw new ConvexError("no user with this token found");
      }
  
      await ctx.db.patch(user._id, {
        name: args.name,
        image: args.image,
      });
    },
  });

export const addOrganizationToUser = internalMutation({
    args: { 
        tokenIdentifier: v.string(),
        organizationId: v.string(),
        role: Roles
    },
    async handler(ctx, args) {
        const user = await getUserDetails(ctx, args);
        
        if (!user) return

        ctx.db.patch(user._id, {
            organizationIds: [
                ...user.organizationIds, 
                {
                    organizationId: args.organizationId, 
                    role: args.role
                }
            ],
        });
    },
});

export const updateRoleInOrgForUser = internalMutation({
    args: {
        tokenIdentifier: v.string(), 
        organizationId: v.string(), 
        role: Roles 
    },
    async handler(ctx, args) {
        const user = await getUserDetails(ctx, args);
        
        if (!user) {
            throw new ConvexError("No user found");
        }

        const org = user.organizationIds.find((organization) => organization.organizationId === args.organizationId);
    
        if (!org) {
            throw new ConvexError("expected an org on the user but was not found when updating");
        }
    
        org.role = args.role;
    
        await ctx.db.patch(user._id, {
            organizationIds: user.organizationIds,
        });
    },
  });