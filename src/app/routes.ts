/**
 * List of all routes
 */

export const HOME = "/";
export const AUCTIONS = "/auctions";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const AUTH_API = "/api/auth";
export const UPGRADE = "/upgrade";

export const HOST_AUCTIONS = "/host/auctions";
export const HOST_AUCTION_CREATE = "/host/auctions/create";

/**
 * List of routes which can be accessed public
 */
export const PUBLIC_ROUTES = [HOME, AUCTIONS, LOGIN, REGISTER, AUTH_API];
