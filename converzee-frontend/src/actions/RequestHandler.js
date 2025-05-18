import axios from "axios";
import { Storage } from "../utils/Storage";
import { BASE_URL } from "./URLs";
export default class RequestHandler {
  static getHeader = function () {
    const token = Storage.get("x-access-token");
    return {
      headers: { "x-access-token": token },
    };
  };

  static RegRequest = function (URL, data, callBack) {
    // window.gs.loader(true);
    const header = RequestHandler.getHeader();
    const NEW_URL = BASE_URL + URL;
    axios
      .post(NEW_URL, data, header)
      .then((res) => {
        if (res.status === 205) {
          Storage.removeAll();
          window.gs.setAuth(false);
        }
        callBack(res, null);
      })
      .catch((err) => callBack(null, err))
      .finally(() => {
        // window.gs.loader(false);
      });
  };

  static PostRequest = function (URL, data, callBack) {
    window.gs.loader(true);
    const header = RequestHandler.getHeader();
    const NEW_URL = BASE_URL + URL;
    try {
      axios
        .post(NEW_URL, data, header)
        .then((res) => {
          if (res.status === 205) {
            document.querySelector(".session_login_wrapper").classList.remove("cz_hide");
            Storage.removeAll();
            window.gs.setAuth(false);
          }
          callBack(res, null);
        })
        .catch((err) => {
          window.gs.toast("Something wrong", { position: "bottom-right", autoClose: true, type: window.gs.toast.TYPE.ERROR });
          callBack(null, err);
        })
        .finally(() => {
          window.gs.loader(false);
        });
    } catch (e) {
      window.gs.loader(false);
    }
  };
  static GETRequest = function (URL, callBack) {
    window.gs.loader(true);
    const header = RequestHandler.getHeader();
    axios
      .get(BASE_URL + URL, header)
      .then((res) => callBack(res, null))
      .catch((err) => callBack(null, err))
      .finally(() => {
        window.gs.loader(false);
      });
  };

  static ForgotRequest = function (URL, data, callBack) {
    const NEW_URL = BASE_URL + URL;
    axios
      .post(NEW_URL, data)
      .then((res) => {
        callBack(res, null);
      })
      .catch((err) => callBack(null, err))
      .finally(() => {});
  };
}
