import { defineSchema } from "convex/server";
import { files } from "./models/files";
import { users } from "./models/users";

export default defineSchema({
    files,
    users
})