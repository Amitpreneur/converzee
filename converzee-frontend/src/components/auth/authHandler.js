import axios from "axios";
import { Storage } from "../../utils/Storage";
import { BASE_URL } from "../../actions/URLs";
export class Request {
  static loginAuth = function(params, callback) {
    axios
      .post(BASE_URL + "user/auth", { userData: params })
      .then(res => {
        if (res.data.success) Request.setAuth(res.data.token, res.data.id);
        callback(res, null);
        // const { token } = res.data;
        // localStorage.setItem("jwtToken", token);
      })
      .catch(err => callback(null, err));
  };
  static setAuth = function(token = null, id) {
    var now = new Date();
    now.setMinutes(now.getMinutes() + 24 * 60);
    Storage.put("timeout", now.getTime());
    Storage.put("id", id);
    Storage.put("x-access-token", token);
  };
  static getAuth = function() {
    const current = new Date().getTime();
    const timeout = Storage.get("timeout");
    if (timeout > current) {
      return true;
    }
    return false;
  };
}
