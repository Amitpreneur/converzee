import RequestHandler from "../../actions/RequestHandler";
import { GET_USERS } from "../../actions/URLs";

export function getUserList(userType = null, cb) {
  const getType = userType ? GET_USERS + "/" + userType : GET_USERS;
  // return new Promise((resolve, reject) => {
  RequestHandler.PostRequest(getType, {}, (res, err) => {
    if (res) cb(res.data.data, null);
    else cb(null, "Error");
  });
  // });
}

export const parseUserData = function(data) {
  const newData = new Array();
  data.forEach(e => {
    newData.push({
      id: e._id,
      firstname: e.firstname,
      email: e.email,
      isActive: e.isActive,
      date: e.createdAt,
      logs: e.logs ? e.logs : {}
    });
  });
  return newData;
};

export const parseResellerData = function(data) {
  const newData = new Array();
  data.forEach(e => {
    newData.push({
      id: e._id,
      firstname: e.firstname,
      email: e.email,
      isActive: e.isActive,
      date: e.createdAt,
      totallicence: e.totallicence,
      consumeLicence: e.consumeLicence,
      logs: e.logs ? e.logs : {}
    });
  });
  return newData;
};

export const parseLinkData = function(data) {
  const newData = new Array();
  data.forEach(e => {
    newData.push({
      id: e._id,
      name: e.name,
      url: e.url,
    });
  });
  return newData;
};