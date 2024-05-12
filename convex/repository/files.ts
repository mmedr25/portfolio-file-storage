import { ConvexError, v } from "convex/values";
import { MutationCtx, internalMutation, mutation, query } from "../_generated/server";
import { canDeleteFile, hasAccessToFile, hasPermission } from "./auth";
import { Doc } from "../_generated/dataModel";
import { getAllFavorites } from "./favorites";


// mutations
export const generateUploadUrl = mutation(async (ctx) => {
  return ctx.storage.generateUploadUrl();
});

export const createFile = mutation({
    args: {
        fileId: v.id("_storage"),
        name: v.string(),
        fileExt: v.string(),
        organizationId: v.string(),
    },
    async handler(ctx, args) {
        const organizationId = args.organizationId
        
        const userWithPermission = await hasPermission(ctx, organizationId)

        if (!userWithPermission) {
            throw new ConvexError("no organization found")
        }

        const fileLocation = await getFileUrl(ctx, {fileId: args.fileId})

        if (!fileLocation)  throw new ConvexError("File was not save");

        return await ctx.db.insert("files", {
            name: args.name,
            organizationId: organizationId,
            fileId: args.fileId,
            fileExt: args.fileExt,
            fileLocation: fileLocation,
            userId: userWithPermission.user._id,
        })
    },
})

export const softDeletefileToggle = mutation({
    args: { 
        fileId: v.id("files"),
        shouldDelete: v.boolean()
    },
    async handler(ctx, args) {
        const userDetails = await hasAccessToFile(ctx, args.fileId);
  
        if (!userDetails) throw new ConvexError("no access to file");
  
        canDeleteFile(userDetails.user, userDetails.file);
        
        ctx.db.patch(args.fileId, {
            shouldDelete: args.shouldDelete
        })
    },
});

const deleteFile = async (ctx: MutationCtx, file: Doc<"files">) => {
    await ctx.storage.delete(file.fileId);
    return ctx.db.delete(file._id);
}

export const deleteAllFiles = internalMutation({
    args: {},
    async handler(ctx) {
      const files = await ctx.db
        .query("files")
        .withIndex("by_shouldDelete", (q) => q.eq("shouldDelete", true))
        .collect();
  
        await Promise.all(
            files.map(async (file) => {
                return deleteFile(ctx, file)
            })
        );
    },
})

export const getFileUrl = query({
    args: {
        fileId: v.id("_storage")
    },
    async handler(ctx, args) {
        return ctx.storage.getUrl(args.fileId)
    }
})

const searchFilesByName = (allFiles: Doc<"files">[], searchQuery?: string | null) => {
    if (!allFiles?.length) return {
        files: allFiles,
        hasfiles: false,
        isSearchable: false
    }

    if (!searchQuery) return {
        files: allFiles,
        hasfiles: true,
        isSearchable: true
    }

    const filteredFiles = allFiles.filter(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

    return {
        files: filteredFiles,
        hasfiles: !!filteredFiles?.length,
        isSearchable: true
    }
}

const SearchQueryType = v.optional(v.union(v.string(), v.null()))

export const getFiles = query({
    args: {
        organizationId: v.string(),
        searchQuery: SearchQueryType
    },
    async handler(ctx, args) {
        const organizationId = args.organizationId
        
        if (!organizationId) throw new ConvexError("no organization found")

        const hasPerm = hasPermission(ctx, organizationId)
        
        if (!hasPerm) throw new ConvexError("no organization found")
        
        const filesThatAreNotInTrash = await ctx.db.query("files").withIndex(
            "by_organizationId",
            q => q.eq("organizationId", organizationId)
        ).filter(q => 
            q.or(q.eq(q.field("shouldDelete"), undefined), 
            q.eq(q.field("shouldDelete"), false))
        ).collect()

        return searchFilesByName(filesThatAreNotInTrash, args?.searchQuery)
    }
})

export const getAllFavoriteFiles = query({
    args: {
        organizationId: v.string(),
        searchQuery: SearchQueryType
    },
    async handler(ctx, args) {
        // TODO: add permission check
        const favorites = await getAllFavorites(ctx, {organizationId: args.organizationId})

        const filesPromises = favorites.map(({fileId}) => getFile(ctx, {fileId}))
        const files = (await Promise.all(filesPromises)).filter(file => !file?.shouldDelete && file?._id) as Doc<"files">[]

        return searchFilesByName(files, args?.searchQuery)
    }
})

export const getAllTrashFiles = query({
    args: {
        organizationId: v.string(),
        searchQuery: SearchQueryType
    },
    async handler(ctx, args) {
        // TODO: add permission check

        const files = await ctx.db.query("files")
            .withIndex("by_organizationId", q => q.eq("organizationId", args.organizationId))
            // .filter(q => q.field("shouldDelete"))
            .filter(q => q.eq(q.field("shouldDelete"), true))
            .collect()

        return searchFilesByName(files, args?.searchQuery)
    }
})


export const getFile = query({
    args: {
        fileId: v.id("files")
    },
    async handler(ctx, args) {
        return ctx.db.get(args.fileId)
    }
})