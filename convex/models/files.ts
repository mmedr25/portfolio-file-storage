import { defineTable } from "convex/server";
import { v } from "convex/values";

export const files = defineTable({
    name: v.string(),
    organizationId: v.string()
}).index("by_organizationId", ["organizationId"])