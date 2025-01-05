import { authorizePermission } from "@app/rbac/authorizationHelper";
import { ADMIN_ROUTES } from "@app/router/ConstantsRoutes";

export function checkPermission(org, permission = "") {
  let hasPermission = false;
  if (Array.isArray(permission)) {
    permission.forEach((permissions) => {
      if (permissions == "all" || permissions == org?.type) {
        hasPermission = true;
      }
    });
  } else {
    if (permission == "all" || permission == org?.type) {
      hasPermission = true;
    }
  }

  return hasPermission;
}

