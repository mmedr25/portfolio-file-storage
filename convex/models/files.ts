import { defineTable } from "convex/server";
import { v } from "convex/values";

// used to store file details
export const files = defineTable({
    fileId: v.id("_storage"),
    fileExt: v.string(),
    name: v.string(),
    organizationId: v.string(),
    userId: v.id("users"),
    fileLocation: v.string(),
    shouldDelete: v.optional(v.boolean()),
})
.index("by_organizationId", ["organizationId"])
.index("by_shouldDelete", ["shouldDelete"])