import { MODE } from '../config';
export const BASE_URL = getBaseURL();
export const SAVE_TOOL = 'tool/insert';
export const IMAGE_UPLOAD_LINK = 'upload/';
export const IMAGE_OPTI_UPLOAD = 'imageOpti/';
export const GET_CAMPAIGNS = 'tool/get';
export const GET_ONE_TOOL = 'tool/getOne/';
export const CLONE_TOOL = 'tool/clone/';
export const ARCHIVE_TOOL = 'tool/archive/';
export const PURGE_TOOL = 'tool/purge/';
export const DOWNLOAD_DATA = 'tool/downloadOptin/';
export const SAVE_DOMAIN = 'domain/insert';
export const GET_DOMAIN = 'domain/get';
export const GET_PIXEL = 'pixel/';
export const DASHBOARD_DATA = 'dashboard/get';
export const ADD_RESELLER_USER = 'reseller/add-reseller-user';
export const SEND_LINK_BY_URL = 'reseller/send-by-email';
export const SAVE_USER_DETAILS = 'reseller/update-userdata';
export const KEY_GENERATE = 'reseller/generate-key';
export const VERIFY_AND_ADD_USER = 'register/verify-add-user';
export const GET_TOOL_PERMISSION = 'access/getPermissions';
export const GET_USERS = 'reseller/getUser';
export const UPDATE_USER = 'dashboard/update-user';
export const UPDATE_ACCESS = 'dashboard/change-Access';
export const UPDATE_PASSWORD_ACCESS = 'dashboard/resetPassword';
export const SEARCH_USER = 'reseller/search';
export const GET_LINKS = 'links/get-links';
export const ADD_LINKS = 'links/add-links';
export const UPDATE_LINK = 'links/update-links';
export const ADD_USER = 'reseller/add-user';
export const ADD_SUBUSER = 'reseller/add-subuser';
export const GET_SUBUSER = 'reseller/get-subuser';
export const FORGOT_PASSWORD = 'register/forgot-password';
export const VERIFY_PASSWORD = 'register/verify-password';
export const UPDATE_PASSWORD = 'register/update-password';
export const CHECK_CAMPAIGNS_NAME = 'tool/toolNameVerify';
export const EMAIL_TEMPLATE = 'email/insert/';
export const GET_EMAIL = 'email/get';
export const GET_CAMPS = 'tool/campList';
export const GET_EMAILS = 'email/getEmailList';
export const SEND_MAIL = 'email/sendMail';
export const SAVE_DEVELOPER = 'access/developerAccess';
export const GET_PROFILE_INFO = 'access/getAccountInfo';
export const DELETE_USER = 'access/deleteDeveloper';
export const DELETE_USER_DATA = 'access/deleteUserData';
export const CHANGE_PASSWORD = 'access/changePassword';
export const AUTO_RESPONDER = 'access/configMail';
export const GET_AUTO_RESPONDER = 'access/getAllAutoResponder';
export const SAVE_LIST_ID = 'access/saveListId';
export const AUTO_RESPONDER_TEST = 'access/configMailTest';
export const USER_DISABLE = 'reseller/user-deactive';
export const TEMPLATES = 'gettool/tempates/';
export const CHECKOTO2 = 'pixel/OTO2';
export const GET_LIST_FROM_AUTORESPONDER = "access/getListFromAutoresponder";
export const AUTHORIZATION = "auth/infusionsoft/callback";
export const CONSTANTCONTACTAUTH = "constantContact/callback";
export const AWEBERCALLBACK = "aweber/callback";
export const AWEBERAUTHORIZATION = "access/aweber/authorize";
export const AUTORESPONDER_AUTHORIZE = "access/autoresponder/authorize";
export const ADD_CUSTOME_AR = "access/add-custom-ar-form";
export const EDIT_CUSTOME_AR = "access/edit-custom-ar-form";
export const DELETE_CUSTOME_AR = "access/delete-custom-ar-form";
export const DISCONNECT_AR = "access/disconnect-ar";
export const SCRIPT_UPDATE = "reseller/update-script";

function getBaseURL() {
  return 'https://api.converzee.com/';
  /* return 'http://localhost:3001/'; */
  /* return 'http://192.168.1.227:3001/'; */
}                

export const RPath = function () {
  return 'https://d257yxqteot439.cloudfront.net/app/';
};

export const bonusScriptPixel = '<script';

export const getPath = function (path = '/') {
  return `${path}`;
};

export const getBGPath = function (path = '/') {
  return `url('${path}')`;
};

// window.rPath = RPath();
