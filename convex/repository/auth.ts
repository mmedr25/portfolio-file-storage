import { GenericDataModel, GenericMutationCtx, GenericQueryCtx } from "convex/server";
import { Ctx, getUserDetails } from "./users";
import { Doc, Id } from "../_generated/dataModel";
import { ConvexError } from "convex/values";

type GenericCtx<T extends GenericDataModel> = GenericMutationCtx<T> | GenericQueryCtx<T>

export const convexCurrentUser = (ctx: GenericCtx<any>) => {
    return ctx.auth.getUserIdentity()
}

export const hasPermission = async (ctx: Ctx, organizationId: string) => {
    const authenticatedUser = await convexCurrentUser(ctx)

    if (!authenticatedUser) return false;

    const userDetails = await getUserDetails(ctx, {tokenIdentifier: authenticatedUser.tokenIdentifier})

    if (!userDetails) return null
    // has permission
    const hasAccess = (
        userDetails.organizationIds.some(org => org.organizationId === organizationId) || 
        userDetails.tokenIdentifier.includes(organizationId)
    )
    
    if (!userDetails) return null

    return { user: userDetails }
}


export const hasAccessToFile = async (ctx: Ctx, fileId: Id<"files">) => {
    const file = await ctx.db.get(fileId);
  
    if (!file) return null; 
  
    const userDetails = await hasPermission(ctx, file.organizationId);
  
    if (!userDetails) return null;

    return { user: userDetails.user, file };
}

export function canDeleteFile(user: Doc<"users">, file: Doc<"files">) {
    const canDelete = (
        // file.userId === user._id ||
        user.organizationIds.find((org) => org.organizationId === file.organizationId)?.role === "admin"
    )
  
    if (!canDelete) {
      throw new ConvexError("you have no acces to delete this file");
    }
  }