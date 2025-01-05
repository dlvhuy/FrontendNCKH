import React from "react";

import "./AuthBase.scss";

import BD from "@assets/images/logo/bd.svg";

function AuthBase({ children }) {
  return (
    <div id="login">
      <div className="login-form">{children}</div>
    </div>
  );
}

export default AuthBase;

