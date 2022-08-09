export { login } from "./login";
export { logout } from "./logout";
export { me } from "./me";
export { register } from "./register";
export { users } from "./users";


declare module "express-session" {
	export interface Session {
		userId: string;
	}
}