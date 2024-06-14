import { ROLES } from "src/constants/roles";

export class UpdateUserDTO{
    readonly username?: string;
    readonly email?: string;
    readonly password?: string;
    readonly rol?: ROLES;
}