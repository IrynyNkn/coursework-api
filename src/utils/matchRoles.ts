function matchRoles(roles: string[], userRoles: string[]): boolean {
  for(let userRole of userRoles) {
    if(roles.includes(userRole)) {
      return true;
    }
  }
  return false;
}

export default matchRoles;