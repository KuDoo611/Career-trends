import type { User } from "../model/UserModel";

interface PostLoginOptions {
  fallback?: string;
  defaultUserPath?: string;
  defaultAdminPath?: string;
}

/**
 * Compute the route a user should be redirected to after logging in.
 * Allows callers to override defaults while keeping role-based logic in one place.
 */
export function getPostLoginPath(
  user: User | null | undefined,
  options?: PostLoginOptions
): string {
  const {
    fallback = "/",
    defaultUserPath = "/Users/HomePageUser",
    defaultAdminPath = "/admin/HomeAdmin"
  } = options ?? {};

  if (!user) {
    return fallback;
  }

  const normalizedRole = user.role?.toLowerCase();

  if (normalizedRole === "admin") {
    return defaultAdminPath;
  }

  if (normalizedRole === "user") {
    return defaultUserPath;
  }

  return fallback;
}
