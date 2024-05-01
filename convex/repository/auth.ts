import { GenericDataModel, GenericMutationCtx, GenericQueryCtx } from "convex/server";

type GenericCtx<T extends GenericDataModel> = GenericMutationCtx<T> | GenericQueryCtx<T>

export const convexCurrentUser = (ctx: GenericCtx<any>) => {
    return ctx.auth.getUserIdentity()
}