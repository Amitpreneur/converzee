import _ from "lodash";
import { message } from "antd";
export const VerifyCreateAccount = function(email, password) {
  if (_.isEmpty(email)) {
    message.error("Email Missing");
    return false;
  }
  if (_.isEmpty(password)) {
    message.error("Password Missing");
    return false;
  }
  return true;
};

export const checkTools = function(tools) {
  if (_.isEmpty(tools)) {
    message.error("Tool not to be Empty");
    return false;
  }
  return true;
};
