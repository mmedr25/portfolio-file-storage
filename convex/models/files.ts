import { defineTable } from "convex/server";
import { v } from "convex/values";

export const files = defineTable({
    fileId: v.id("_storage"),
    name: v.string(),
    organizationId: v.string(),
}).index("by_organizationId", ["organizationId"])