import { defineTable } from "convex/server";
import { v } from "convex/values";

export const favorites = defineTable({
    fileId: v.id("files"),
    organizationId: v.string(),
    userId: v.id("users"),
}).index("by_userId_orgId_fileId", ["userId", "organizationId", "fileId"])
