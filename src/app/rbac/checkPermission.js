import { authorizePermission } from "@app/rbac/authorizationHelper";
import { ADMIN_ROUTES } from "@app/router/ConstantsRoutes";

export function checkPermission(roleUser, permission = "") {
  
  let hasPermission = false;
  if (Array.isArray(permission)) {
    permission.forEach((permissions) => {
      if (permissions == "all" || permissions == roleUser) {
        hasPermission = true;
      }
    });
  } else {
    if (permission == "all" || permission == roleUser) {
      hasPermission = true;
    }
  }

  return hasPermission;
}

