import { expressjwt } from "express-jwt";
export const requireAuthentication = expressjwt({
  secret: process.env.JWT_SECRET_KEY,
  algorithms: ["HS256"],
});
