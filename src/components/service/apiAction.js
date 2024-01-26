import { StaticCred } from "./config";

export const LoginApi = (body) => {
  if (
    body.userId === StaticCred.userName &&
    body.password === StaticCred.password
  ) {
    sessionStorage.setItem("user_id", body.userId);
    sessionStorage.setItem("loginFlag", true);
    return true;
  } else {
    return false;
  }
};
