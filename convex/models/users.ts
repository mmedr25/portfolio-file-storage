import { defineTable } from "convex/server";
import { v } from "convex/values";

export const Roles = v.union(v.literal("admin"), v.literal("member"))

export const users = defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    organizationIds: v.array(v.object({
        organizationId: v.string(),
        role: Roles
    }))
}).index("by_tokenIdentifier", ["tokenIdentifier"])