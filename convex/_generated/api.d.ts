/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.11.3.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as clerk from "../clerk.js";
import type * as cron from "../cron.js";
import type * as http from "../http.js";
import type * as models_favorites from "../models/favorites.js";
import type * as models_files from "../models/files.js";
import type * as models_users from "../models/users.js";
import type * as repository_auth from "../repository/auth.js";
import type * as repository_favorites from "../repository/favorites.js";
import type * as repository_files from "../repository/files.js";
import type * as repository_users from "../repository/users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  clerk: typeof clerk;
  cron: typeof cron;
  http: typeof http;
  "models/favorites": typeof models_favorites;
  "models/files": typeof models_files;
  "models/users": typeof models_users;
  "repository/auth": typeof repository_auth;
  "repository/favorites": typeof repository_favorites;
  "repository/files": typeof repository_files;
  "repository/users": typeof repository_users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
