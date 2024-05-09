import { defineSchema } from "convex/server";
import { files } from "./models/files";
import { users } from "./models/users";
import { favorites } from "./models/favorites";

export default defineSchema({
    files,
    users,
    favorites
})