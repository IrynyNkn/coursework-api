import {UserRoleType} from "./constants";

function matchRoles(roles: UserRoleType[], userRole: UserRoleType): boolean {
  return roles.includes(userRole);
}

export default matchRoles;