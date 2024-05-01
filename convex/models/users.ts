import { defineTable } from "convex/server";
import { v } from "convex/values";

export const users = defineTable({
    tokenIdentifier: v.string(),
    organizationIds: v.array(v.string())
}).index("by_tokenIdentifier", ["tokenIdentifier"])