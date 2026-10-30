import jwt from "jsonwebtoken";

export const AUTH_COOKIE = "auth_token";
export const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

export function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be set to a random secret of at least 32 characters");
  }
  return secret;
}

export function signAuthToken(user) {
  return jwt.sign({ sub: String(user.id) }, getJwtSecret(), { expiresIn: TOKEN_TTL_SECONDS });
}

export function verifyAuthToken(token) {
  const payload = jwt.verify(token, getJwtSecret(), { algorithms: ["HS256"] });
  if (typeof payload === "string" || typeof payload.sub !== "string") {
    throw new Error("Invalid authentication token payload");
  }
  return payload;
}

export function authCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TOKEN_TTL_SECONDS,
  };
}
