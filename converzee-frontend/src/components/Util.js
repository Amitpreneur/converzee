import {
  CREATE_ELEMENT_VIEWED_ITEMS,
  TEXT,
  TIMER,
  LAYOUT,
  STYLE,
  CODE,
  CTA,
  FILE,
  SOUND,
  VIDEO,
  REDIRECTION,
  NUMBER,
  RESULT,
  MEDIA,
  NOTHANKS,
  TIMING,
  EMAIL,
  DYNEMIC_ELEMENT,
  OFFER_IFRAME,
} from "./Constant";
import moment from "moment";
import { BASE_URL } from "../actions/URLs";
import _ from "lodash";
export default class Util {
  static setCreateItems = function () {
    CREATE_ELEMENT_VIEWED_ITEMS.set(1, [TEXT, FILE, TIMER, SOUND, CODE]);
    CREATE_ELEMENT_VIEWED_ITEMS.set(2, [TEXT, TIMER, STYLE, CODE]);
    CREATE_ELEMENT_VIEWED_ITEMS.set(3, [TEXT, CTA, LAYOUT, STYLE, CODE]);
    CREATE_ELEMENT_VIEWED_ITEMS.set(4, [TEXT, FILE, STYLE, CODE]);
    CREATE_ELEMENT_VIEWED_ITEMS.set(5, [TEXT, VIDEO, STYLE, CODE]);
    CREATE_ELEMENT_VIEWED_ITEMS.set(6, [TEXT, TIMER, LAYOUT, STYLE, CODE]);
    CREATE_ELEMENT_VIEWED_ITEMS.set(7, [TEXT, REDIRECTION, CODE]);
    CREATE_ELEMENT_VIEWED_ITEMS.set(8, [NUMBER, RESULT]);
    CREATE_ELEMENT_VIEWED_ITEMS.set(9, [TEXT, LAYOUT, MEDIA, CTA, NOTHANKS, STYLE, CODE]);
    CREATE_ELEMENT_VIEWED_ITEMS.set(10, [TEXT, TIMING, CODE]);
    CREATE_ELEMENT_VIEWED_ITEMS.set(11, [EMAIL]);
    CREATE_ELEMENT_VIEWED_ITEMS.set(12, [TEXT, CTA, TIMER, LAYOUT, STYLE, CODE, FILE]);
    CREATE_ELEMENT_VIEWED_ITEMS.set(13, [DYNEMIC_ELEMENT]);
    CREATE_ELEMENT_VIEWED_ITEMS.set(14, [OFFER_IFRAME]);
    CREATE_ELEMENT_VIEWED_ITEMS.set(15, [TEXT, CODE]);
    CREATE_ELEMENT_VIEWED_ITEMS.set(16, [TEXT, CTA, TIMER, LAYOUT, STYLE, CODE, FILE]);
  };
  static getCreateItems = function (key) {
    return CREATE_ELEMENT_VIEWED_ITEMS.get(key);
  };
  static CAMPAIGNS_NAME = "";
  static RedirectWhenCampaignEmpty = function (props) {
    if (props && Util.CAMPAIGNS_NAME == "") {
      props.history.push("/Create");
    }
  };
  static isArrayEqual = function (obj1, obj2, numb = 3) {
    const diff = Object.keys(obj1).reduce((result, key) => {
      if (!obj2.hasOwnProperty(key)) {
        result.push(key);
      } else if (_.isEqual(obj1[key], obj2[key])) {
        const resultKeyIndex = result.indexOf(key);
        result.splice(resultKeyIndex, 1);
      }
      return result;
    }, Object.keys(obj2));

    if (diff.length > numb) return false;
    else {
      window.gs.toast("Reqaird Fields Are not to be empty", { position: "bottom-right", autoClose: false, type: window.gs.toast.TYPE.ERROR });
      return true;
    }
  };
  static isRedirected = false;
  static getTimeZoneList = function () {
    return [
      { label: "Pacific/Niue - (GMT-11:00) Niue", value: "Pacific/Niue" },
      { label: "Pacific/Pago_Pago - (GMT-11:00) Pago Pago", value: "Pacific/Pago_Pago" },
      { label: "Pacific/Honolulu - (GMT-10:00) Hawaii Time", value: "Pacific/Honolulu" },
      { label: "Pacific/Rarotonga - (GMT-10:00) Rarotonga", value: "Pacific/Rarotonga" },
      { label: "Pacific/Tahiti - (GMT-10:00) Tahiti", value: "Pacific/Tahiti" },
      { label: "Pacific/Marquesas - (GMT-09:30) Marquesas", value: "Pacific/Marquesas" },
      { label: "America/Anchorage - (GMT-09:00) Alaska Time", value: "America/Anchorage" },
      { label: "Pacific/Gambier - (GMT-09:00) Gambier", value: "Pacific/Gambier" },
      { label: "America/Los_Angeles - (GMT-08:00) Pacific Time", value: "America/Los_Angeles" },
      { label: "America/Tijuana - (GMT-08:00) Pacific Time - Tijuana", value: "America/Tijuana" },
      { label: "America/Vancouver - (GMT-08:00) Pacific Time - Vancouver", value: "America/Vancouver" },
      { label: "America/Whitehorse - (GMT-08:00) Pacific Time - Whitehorse", value: "America/Whitehorse" },
      { label: "Pacific/Pitcairn - (GMT-08:00) Pitcairn", value: "Pacific/Pitcairn" },
      { label: "America/Dawson_Creek - (GMT-07:00) Mountain Time - Dawson Creek", value: "America/Dawson_Creek" },
      { label: "America/Denver - (GMT-07:00) Mountain Time", value: "America/Denver" },
      { label: "America/Edmonton - (GMT-07:00) Mountain Time - Edmonton", value: "America/Edmonton" },
      { label: "America/Hermosillo - (GMT-07:00) Mountain Time - Hermosillo", value: "America/Hermosillo" },
      { label: "America/Mazatlan - (GMT-07:00) Mountain Time - Chihuahua, Mazatlan", value: "America/Mazatlan" },
      { label: "America/Phoenix - (GMT-07:00) Mountain Time - Arizona", value: "America/Phoenix" },
      { label: "America/Yellowknife - (GMT-07:00) Mountain Time - Yellowknife", value: "America/Yellowknife" },
      { label: "America/Belize - (GMT-06:00) Belize", value: "America/Belize" },
      { label: "America/Chicago - (GMT-06:00) Central Time", value: "America/Chicago" },
      { label: "America/Costa_Rica - (GMT-06:00) Costa Rica", value: "America/Costa_Rica" },
      { label: "America/El_Salvador - (GMT-06:00) El Salvador", value: "America/El_Salvador" },
      { label: "America/Guatemala - (GMT-06:00) Guatemala", value: "America/Guatemala" },
      { label: "America/Managua - (GMT-06:00) Managua", value: "America/Managua" },
      { label: "America/Mexico_City - (GMT-06:00) Central Time - Mexico City", value: "America/Mexico_City" },
      { label: "America/Regina - (GMT-06:00) Central Time - Regina", value: "America/Regina" },
      { label: "America/Tegucigalpa - (GMT-06:00) Central Time - Tegucigalpa", value: "America/Tegucigalpa" },
      { label: "America/Winnipeg - (GMT-06:00) Central Time - Winnipeg", value: "America/Winnipeg" },
      { label: "Pacific/Galapagos - (GMT-06:00) Galapagos", value: "Pacific/Galapagos" },
      { label: "America/Bogota - (GMT-05:00) Bogota", value: "America/Bogota" },
      { label: "America/Cancun - (GMT-05:00) America Cancun", value: "America/Cancun" },
      { label: "America/Cayman - (GMT-05:00) Cayman", value: "America/Cayman" },
      { label: "America/Guayaquil - (GMT-05:00) Guayaquil", value: "America/Guayaquil" },
      { label: "America/Havana - (GMT-05:00) Havana", value: "America/Havana" },
      { label: "America/Iqaluit - (GMT-05:00) Eastern Time - Iqaluit", value: "America/Iqaluit" },
      { label: "America/Jamaica - (GMT-05:00) Jamaica", value: "America/Jamaica" },
      { label: "America/Lima - (GMT-05:00) Lima", value: "America/Lima" },
      { label: "America/Nassau - (GMT-05:00) Nassau", value: "America/Nassau" },
      { label: "America/New_York - (GMT-05:00) Eastern Time", value: "America/New_York" },
      { label: "America/Panama - (GMT-05:00) Panama", value: "America/Panama" },
      { label: "America/Port-au-Prince - (GMT-05:00) Port-au-Prince", value: "America/Port-au-Prince" },
      { label: "America/Rio_Branco - (GMT-05:00) Rio Branco", value: "America/Rio_Branco" },
      { label: "America/Toronto - (GMT-05:00) Eastern Time - Toronto", value: "America/Toronto" },
      { label: "Pacific/Easter - (GMT-05:00) Easter Island", value: "Pacific/Easter" },
      { label: "America/Caracas - (GMT-04:30) Caracas", value: "America/Caracas" },
      { label: "America/Asuncion - (GMT-03:00) Asuncion", value: "America/Asuncion" },
      { label: "America/Barbados - (GMT-04:00) Barbados", value: "America/Barbados" },
      { label: "America/Boa_Vista - (GMT-04:00) Boa Vista", value: "America/Boa_Vista" },
      { label: "America/Campo_Grande - (GMT-03:00) Campo Grande", value: "America/Campo_Grande" },
      { label: "America/Cuiaba - (GMT-03:00) Cuiaba", value: "America/Cuiaba" },
      { label: "America/Curacao - (GMT-04:00) Curacao", value: "America/Curacao" },
      { label: "America/Grand_Turk - (GMT-04:00) Grand Turk", value: "America/Grand_Turk" },
      { label: "America/Guyana - (GMT-04:00) Guyana", value: "America/Guyana" },
      { label: "America/Halifax - (GMT-04:00) Atlantic Time - Halifax", value: "America/Halifax" },
      { label: "America/La_Paz - (GMT-04:00) La Paz", value: "America/La_Paz" },
      { label: "America/Manaus - (GMT-04:00) Manaus", value: "America/Manaus" },
      { label: "America/Martinique - (GMT-04:00) Martinique", value: "America/Martinique" },
      { label: "America/Port_of_Spain - (GMT-04:00) Port of Spain", value: "America/Port_of_Spain" },
      { label: "America/Porto_Velho - (GMT-04:00) Porto Velho", value: "America/Porto_Velho" },
      { label: "America/Puerto_Rico - (GMT-04:00) Puerto Rico", value: "America/Puerto_Rico" },
      { label: "America/Santo_Domingo - (GMT-04:00) Santo Domingo", value: "America/Santo_Domingo" },
      { label: "America/Thule - (GMT-04:00) Thule", value: "America/Thule" },
      { label: "Atlantic/Bermuda - (GMT-04:00) Bermuda", value: "Atlantic/Bermuda" },
      { label: "America/St_Johns - (GMT-03:30) Newfoundland Time - St. Johns", value: "America/St_Johns" },
      { label: "America/Araguaina - (GMT-03:00) Araguaina", value: "America/Araguaina" },
      { label: "America/Argentina/Buenos_Aires - (GMT-03:00) Buenos Aires", value: "America/Argentina/Buenos_Aires" },
      { label: "America/Bahia - (GMT-03:00) Salvador", value: "America/Bahia" },
      { label: "America/Belem - (GMT-03:00) Belem", value: "America/Belem" },
      { label: "America/Cayenne - (GMT-03:00) Cayenne", value: "America/Cayenne" },
      { label: "America/Fortaleza - (GMT-03:00) Fortaleza", value: "America/Fortaleza" },
      { label: "America/Godthab - (GMT-03:00) Godthab", value: "America/Godthab" },
      { label: "America/Maceio - (GMT-03:00) Maceio", value: "America/Maceio" },
      { label: "America/Miquelon - (GMT-03:00) Miquelon", value: "America/Miquelon" },
      { label: "America/Montevideo - (GMT-03:00) Montevideo", value: "America/Montevideo" },
      { label: "America/Paramaribo - (GMT-03:00) Paramaribo", value: "America/Paramaribo" },
      { label: "America/Recife - (GMT-03:00) Recife", value: "America/Recife" },
      { label: "America/Santiago - (GMT-03:00) Santiago", value: "America/Santiago" },
      { label: "America/Sao_Paulo - (GMT-02:00) Sao Paulo", value: "America/Sao_Paulo" },
      { label: "Antarctica/Palmer - (GMT-03:00) Palmer", value: "Antarctica/Palmer" },
      { label: "Antarctica/Rothera - (GMT-03:00) Rothera", value: "Antarctica/Rothera" },
      { label: "Atlantic/Stanley - (GMT-03:00) Stanley", value: "Atlantic/Stanley" },
      { label: "America/Noronha - (GMT-02:00) Noronha", value: "America/Noronha" },
      { label: "Atlantic/South_Georgia - (GMT-02:00) South Georgia", value: "Atlantic/South_Georgia" },
      { label: "America/Scoresbysund - (GMT-01:00) Scoresbysund", value: "America/Scoresbysund" },
      { label: "Atlantic/Azores - (GMT-01:00) Azores", value: "Atlantic/Azores" },
      { label: "Atlantic/Cape_Verde - (GMT-01:00) Cape Verde", value: "Atlantic/Cape_Verde" },
      { label: "Africa/Abidjan - (GMT+00:00) Abidjan", value: "Africa/Abidjan" },
      { label: "Africa/Accra - (GMT+00:00) Accra", value: "Africa/Accra" },
      { label: "Africa/Bissau - (GMT+00:00) Bissau", value: "Africa/Bissau" },
      { label: "Africa/Casablanca - (GMT+00:00) Casablanca", value: "Africa/Casablanca" },
      { label: "Africa/El_Aaiun - (GMT+00:00) El Aaiun", value: "Africa/El_Aaiun" },
      { label: "Africa/Monrovia - (GMT+00:00) Monrovia", value: "Africa/Monrovia" },
      { label: "America/Danmarkshavn - (GMT+00:00) Danmarkshavn", value: "America/Danmarkshavn" },
      { label: "Atlantic/Canary - (GMT+00:00) Canary Islands", value: "Atlantic/Canary" },
      { label: "Atlantic/Faroe - (GMT+00:00) Faeroe", value: "Atlantic/Faroe" },
      { label: "Atlantic/Reykjavik - (GMT+00:00) Reykjavik", value: "Atlantic/Reykjavik" },
      { label: "Etc/GMT - (GMT+00:00) GMT (no daylight saving)", value: "Etc/GMT" },
      { label: "Europe/Dublin - (GMT+00:00) Dublin", value: "Europe/Dublin" },
      { label: "Europe/Lisbon - (GMT+00:00) Lisbon", value: "Europe/Lisbon" },
      { label: "Europe/London - (GMT+00:00) London", value: "Europe/London" },
      { label: "Africa/Algiers - (GMT+01:00) Algiers", value: "Africa/Algiers" },
      { label: "Africa/Ceuta - (GMT+01:00) Ceuta", value: "Africa/Ceuta" },
      { label: "Africa/Lagos - (GMT+01:00) Lagos", value: "Africa/Lagos" },
      { label: "Africa/Ndjamena - (GMT+01:00) Ndjamena", value: "Africa/Ndjamena" },
      { label: "Africa/Tunis - (GMT+01:00) Tunis", value: "Africa/Tunis" },
      { label: "Africa/Windhoek - (GMT+02:00) Windhoek", value: "Africa/Windhoek" },
      { label: "Europe/Amsterdam - (GMT+01:00) Amsterdam", value: "Europe/Amsterdam" },
      { label: "Europe/Andorra - (GMT+01:00) Andorra", value: "Europe/Andorra" },
      { label: "Europe/Belgrade - (GMT+01:00) Central European Time - Belgrade", value: "Europe/Belgrade" },
      { label: "Europe/Berlin - (GMT+01:00) Berlin", value: "Europe/Berlin" },
      { label: "Europe/Brussels - (GMT+01:00) Brussels", value: "Europe/Brussels" },
      { label: "Europe/Budapest - (GMT+01:00) Budapest", value: "Europe/Budapest" },
      { label: "Europe/Copenhagen - (GMT+01:00) Copenhagen", value: "Europe/Copenhagen" },
      { label: "Europe/Gibraltar - (GMT+01:00) Gibraltar", value: "Europe/Gibraltar" },
      { label: "Europe/Luxembourg - (GMT+01:00) Luxembourg", value: "Europe/Luxembourg" },
      { label: "Europe/Madrid - (GMT+01:00) Madrid", value: "Europe/Madrid" },
      { label: "Europe/Malta - (GMT+01:00) Malta", value: "Europe/Malta" },
      { label: "Europe/Monaco - (GMT+01:00) Monaco", value: "Europe/Monaco" },
      { label: "Europe/Oslo - (GMT+01:00) Oslo", value: "Europe/Oslo" },
      { label: "Europe/Paris - (GMT+01:00) Paris", value: "Europe/Paris" },
      { label: "Europe/Prague - (GMT+01:00) Central European Time - Prague", value: "Europe/Prague" },
      { label: "Europe/Rome - (GMT+01:00) Rome", value: "Europe/Rome" },
      { label: "Europe/Stockholm - (GMT+01:00) Stockholm", value: "Europe/Stockholm" },
      { label: "Europe/Tirane - (GMT+01:00) Tirane", value: "Europe/Tirane" },
      { label: "Europe/Vienna - (GMT+01:00) Vienna", value: "Europe/Vienna" },
      { label: "Europe/Warsaw - (GMT+01:00) Warsaw", value: "Europe/Warsaw" },
      { label: "Europe/Zurich - (GMT+01:00) Zurich", value: "Europe/Zurich" },
      { label: "Africa/Cairo - (GMT+02:00) Cairo", value: "Africa/Cairo" },
      { label: "Africa/Johannesburg - (GMT+02:00) Johannesburg", value: "Africa/Johannesburg" },
      { label: "Africa/Maputo - (GMT+02:00) Maputo", value: "Africa/Maputo" },
      { label: "Africa/Tripoli - (GMT+02:00) Tripoli", value: "Africa/Tripoli" },
      { label: "Asia/Amman - (GMT+02:00) Amman", value: "Asia/Amman" },
      { label: "Asia/Beirut - (GMT+02:00) Beirut", value: "Asia/Beirut" },
      { label: "Asia/Damascus - (GMT+02:00) Damascus", value: "Asia/Damascus" },
      { label: "Asia/Gaza - (GMT+02:00) Gaza", value: "Asia/Gaza" },
      { label: "Asia/Jerusalem - (GMT+02:00) Jerusalem", value: "Asia/Jerusalem" },
      { label: "Asia/Nicosia - (GMT+02:00) Nicosia", value: "Asia/Nicosia" },
      { label: "Europe/Athens - (GMT+02:00) Athens", value: "Europe/Athens" },
      { label: "Europe/Bucharest - (GMT+02:00) Bucharest", value: "Europe/Bucharest" },
      { label: "Europe/Chisinau - (GMT+02:00) Chisinau", value: "Europe/Chisinau" },
      { label: "Europe/Helsinki - (GMT+02:00) Helsinki", value: "Europe/Helsinki" },
      { label: "Europe/Istanbul - (GMT+02:00) Istanbul", value: "Europe/Istanbul" },
      { label: "Europe/Kaliningrad - (GMT+02:00) Moscow-01 - Kaliningrad", value: "Europe/Kaliningrad" },
      { label: "Europe/Kiev - (GMT+02:00) Kiev", value: "Europe/Kiev" },
      { label: "Europe/Riga - (GMT+02:00) Riga", value: "Europe/Riga" },
      { label: "Europe/Sofia - (GMT+02:00) Sofia", value: "Europe/Sofia" },
      { label: "Europe/Tallinn - (GMT+02:00) Tallinn", value: "Europe/Tallinn" },
      { label: "Europe/Vilnius - (GMT+02:00) Vilnius", value: "Europe/Vilnius" },
      { label: "Africa/Khartoum - (GMT+03:00) Khartoum", value: "Africa/Khartoum" },
      { label: "Africa/Nairobi - (GMT+03:00) Nairobi", value: "Africa/Nairobi" },
      { label: "Antarctica/Syowa - (GMT+03:00) Syowa", value: "Antarctica/Syowa" },
      { label: "Asia/Baghdad - (GMT+03:00) Baghdad", value: "Asia/Baghdad" },
      { label: "Asia/Qatar - (GMT+03:00) Qatar", value: "Asia/Qatar" },
      { label: "Asia/Riyadh - (GMT+03:00) Riyadh", value: "Asia/Riyadh" },
      { label: "Europe/Minsk - (GMT+03:00) Minsk", value: "Europe/Minsk" },
      { label: "Europe/Moscow - (GMT+03:00) Moscow+00 - Moscow", value: "Europe/Moscow" },
      { label: "Asia/Tehran - (GMT+03:30) Tehran", value: "Asia/Tehran" },
      { label: "Asia/Baku - (GMT+04:00) Baku", value: "Asia/Baku" },
      { label: "Asia/Dubai - (GMT+04:00) Dubai", value: "Asia/Dubai" },
      { label: "Asia/Tbilisi - (GMT+04:00) Tbilisi", value: "Asia/Tbilisi" },
      { label: "Asia/Yerevan - (GMT+04:00) Yerevan", value: "Asia/Yerevan" },
      { label: "Europe/Samara - (GMT+04:00) Moscow+01 - Samara", value: "Europe/Samara" },
      { label: "Indian/Mahe - (GMT+04:00) Mahe", value: "Indian/Mahe" },
      { label: "Indian/Mauritius - (GMT+04:00) Mauritius", value: "Indian/Mauritius" },
      { label: "Indian/Reunion - (GMT+04:00) Reunion", value: "Indian/Reunion" },
      { label: "Asia/Kabul - (GMT+04:30) Kabul", value: "Asia/Kabul" },
      { label: "Antarctica/Mawson - (GMT+05:00) Mawson", value: "Antarctica/Mawson" },
      { label: "Asia/Aqtau - (GMT+05:00) Aqtau", value: "Asia/Aqtau" },
      { label: "Asia/Aqtobe - (GMT+05:00) Aqtobe", value: "Asia/Aqtobe" },
      { label: "Asia/Ashgabat - (GMT+05:00) Ashgabat", value: "Asia/Ashgabat" },
      { label: "Asia/Dushanbe - (GMT+05:00) Dushanbe", value: "Asia/Dushanbe" },
      { label: "Asia/Karachi - (GMT+05:00) Karachi", value: "Asia/Karachi" },
      { label: "Asia/Tashkent - (GMT+05:00) Tashkent", value: "Asia/Tashkent" },
      { label: "Asia/Yekaterinburg - (GMT+05:00) Moscow+02 - Yekaterinburg", value: "Asia/Yekaterinburg" },
      { label: "Indian/Kerguelen - (GMT+05:00) Kerguelen", value: "Indian/Kerguelen" },
      { label: "Indian/Maldives - (GMT+05:00) Maldives", value: "Indian/Maldives" },
      { label: "Asia/Calcutta - (GMT+05:30) India Standard Time", value: "Asia/Calcutta" },
      { label: "Asia/Colombo - (GMT+05:30) Colombo", value: "Asia/Colombo" },
      { label: "Asia/Katmandu - (GMT+05:45) Katmandu", value: "Asia/Katmandu" },
      { label: "Antarctica/Vostok - (GMT+06:00) Vostok", value: "Antarctica/Vostok" },
      { label: "Asia/Almaty - (GMT+06:00) Almaty", value: "Asia/Almaty" },
      { label: "Asia/Bishkek - (GMT+06:00) Bishkek", value: "Asia/Bishkek" },
      { label: "Asia/Dhaka - (GMT+06:00) Dhaka", value: "Asia/Dhaka" },
      { label: "Asia/Omsk - (GMT+06:00) Moscow+03 - Omsk, Novosibirsk", value: "Asia/Omsk" },
      { label: "Asia/Thimphu - (GMT+06:00) Thimphu", value: "Asia/Thimphu" },
      { label: "Indian/Chagos - (GMT+06:00) Chagos", value: "Indian/Chagos" },
      { label: "Asia/Rangoon - (GMT+06:30) Rangoon", value: "Asia/Rangoon" },
      { label: "Indian/Cocos - (GMT+06:30) Cocos", value: "Indian/Cocos" },
      { label: "Antarctica/Davis - (GMT+07:00) Davis", value: "Antarctica/Davis" },
      { label: "Asia/Bangkok - (GMT+07:00) Bangkok", value: "Asia/Bangkok" },
      { label: "Asia/Hovd - (GMT+07:00) Hovd", value: "Asia/Hovd" },
      { label: "Asia/Jakarta - (GMT+07:00) Jakarta", value: "Asia/Jakarta" },
      { label: "Asia/Krasnoyarsk - (GMT+07:00) Moscow+04 - Krasnoyarsk", value: "Asia/Krasnoyarsk" },
      { label: "Asia/Saigon - (GMT+07:00) Hanoi", value: "Asia/Saigon" },
      { label: "Asia/Ho_Chi_Minh - (GMT+07:00) Ho Chi Minh", value: "Asia/Ho_Chi_Minh" },
      { label: "Indian/Christmas - (GMT+07:00) Christmas", value: "Indian/Christmas" },
      { label: "Antarctica/Casey - (GMT+08:00) Casey", value: "Antarctica/Casey" },
      { label: "Asia/Brunei - (GMT+08:00) Brunei", value: "Asia/Brunei" },
      { label: "Asia/Choibalsan - (GMT+08:00) Choibalsan", value: "Asia/Choibalsan" },
      { label: "Asia/Hong_Kong - (GMT+08:00) Hong Kong", value: "Asia/Hong_Kong" },
      { label: "Asia/Irkutsk - (GMT+08:00) Moscow+05 - Irkutsk", value: "Asia/Irkutsk" },
      { label: "Asia/Kuala_Lumpur - (GMT+08:00) Kuala Lumpur", value: "Asia/Kuala_Lumpur" },
      { label: "Asia/Macau - (GMT+08:00) Macau", value: "Asia/Macau" },
      { label: "Asia/Makassar - (GMT+08:00) Makassar", value: "Asia/Makassar" },
      { label: "Asia/Manila - (GMT+08:00) Manila", value: "Asia/Manila" },
      { label: "Asia/Shanghai - (GMT+08:00) China Time - Beijing", value: "Asia/Shanghai" },
      { label: "Asia/Singapore - (GMT+08:00) Singapore", value: "Asia/Singapore" },
      { label: "Asia/Taipei - (GMT+08:00) Taipei", value: "Asia/Taipei" },
      { label: "Asia/Ulaanbaatar - (GMT+08:00) Ulaanbaatar", value: "Asia/Ulaanbaatar" },
      { label: "Australia/Perth - (GMT+08:00) Western Time - Perth", value: "Australia/Perth" },
      { label: "Asia/Pyongyang - (GMT+08:30) Pyongyang", value: "Asia/Pyongyang" },
      { label: "Asia/Dili - (GMT+09:00) Dili", value: "Asia/Dili" },
      { label: "Asia/Jayapura - (GMT+09:00) Jayapura", value: "Asia/Jayapura" },
      { label: "Asia/Seoul - (GMT+09:00) Seoul", value: "Asia/Seoul" },
      { label: "Asia/Tokyo - (GMT+09:00) Tokyo", value: "Asia/Tokyo" },
      { label: "Asia/Yakutsk - (GMT+09:00) Moscow+06 - Yakutsk", value: "Asia/Yakutsk" },
      { label: "Pacific/Palau - (GMT+09:00) Palau", value: "Pacific/Palau" },
      { label: "Australia/Adelaide - (GMT+10:30) Central Time - Adelaide", value: "Australia/Adelaide" },
      { label: "Australia/Darwin - (GMT+09:30) Central Time - Darwin", value: "Australia/Darwin" },
      { label: "Antarctica/DumontDUrville - (GMT+10:00) Dumont DUrville", value: "Antarctica/DumontDUrville" },
      { label: "Asia/Magadan - (GMT+10:00) Moscow+07 - Magadan", value: "Asia/Magadan" },
      { label: "Asia/Vladivostok - (GMT+10:00) Moscow+07 - Yuzhno-Sakhalinsk", value: "Asia/Vladivostok" },
      { label: "Australia/Brisbane - (GMT+10:00) Eastern Time - Brisbane", value: "Australia/Brisbane" },
      { label: "Australia/Hobart - (GMT+11:00) Eastern Time - Hobart", value: "Australia/Hobart" },
      { label: "Australia/Sydney - (GMT+11:00) Eastern Time - Melbourne, Sydney", value: "Australia/Sydney" },
      { label: "Pacific/Chuuk - (GMT+10:00) Truk", value: "Pacific/Chuuk" },
      { label: "Pacific/Guam - (GMT+10:00) Guam", value: "Pacific/Guam" },
      { label: "Pacific/Port_Moresby - (GMT+10:00) Port Moresby", value: "Pacific/Port_Moresby" },
      { label: "Pacific/Efate - (GMT+11:00) Efate", value: "Pacific/Efate" },
      { label: "Pacific/Guadalcanal - (GMT+11:00) Guadalcanal", value: "Pacific/Guadalcanal" },
      { label: "Pacific/Kosrae - (GMT+11:00) Kosrae", value: "Pacific/Kosrae" },
      { label: "Pacific/Norfolk - (GMT+11:00) Norfolk", value: "Pacific/Norfolk" },
      { label: "Pacific/Noumea - (GMT+11:00) Noumea", value: "Pacific/Noumea" },
      { label: "Pacific/Pohnpei - (GMT+11:00) Ponape", value: "Pacific/Pohnpei" },
      { label: "Asia/Kamchatka - (GMT+12:00) Moscow+09 - Petropavlovsk-Kamchatskiy", value: "Asia/Kamchatka" },
      { label: "Pacific/Auckland - (GMT+13:00) Auckland", value: "Pacific/Auckland" },
      { label: "Pacific/Fiji - (GMT+13:00) Fiji", value: "Pacific/Fiji" },
      { label: "Pacific/Funafuti - (GMT+12:00) Funafuti", value: "Pacific/Funafuti" },
      { label: "Pacific/Kwajalein - (GMT+12:00) Kwajalein", value: "Pacific/Kwajalein" },
      { label: "Pacific/Majuro - (GMT+12:00) Majuro", value: "Pacific/Majuro" },
      { label: "Pacific/Nauru - (GMT+12:00) Nauru", value: "Pacific/Nauru" },
      { label: "Pacific/Tarawa - (GMT+12:00) Tarawa", value: "Pacific/Tarawa" },
      { label: "Pacific/Wake - (GMT+12:00) Wake", value: "Pacific/Wake" },
      { label: "Pacific/Wallis - (GMT+12:00) Wallis", value: "Pacific/Wallis" },
      { label: "Pacific/Apia - (GMT+14:00) Apia", value: "Pacific/Apia" },
      { label: "Pacific/Enderbury - (GMT+13:00) Enderbury", value: "Pacific/Enderbury" },
      { label: "Pacific/Fakaofo - (GMT+13:00) Fakaofo", value: "Pacific/Fakaofo" },
      { label: "Pacific/Tongatapu - (GMT+13:00) Tongatapu", value: "Pacific/Tongatapu" },
      { label: "Pacific/Kiritimati - (GMT+14:00) Kiritimati", value: "Pacific/Kiritimati" },
    ];
  };
}

export function parseImgUrl(pathName) {
  try {
    if (pathName.indexOf("http") > -1) {
      return pathName;
    } else {
      pathName = "contains\\/" + pathName;
      return BASE_URL + pathName;
    }
  } catch (e) {
    window.gs.toast("Error in Video URL , Please input a valid Url", { position: "bottom-right", type: window.gs.toast.TYPE.FAILED });
  }
}

export function getUser() {
  return localStorage.getItem("user") || "";
}

export function dateParser(dateTime) {
  if (!dateTime) {
    return "";
  }
  return moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
}

export function getCountryList() {
  return [
    { label: "Afghanistan - AF", value: "Afghanistan - AF" },
    { label: "Åland Islands - AX", value: "Åland Islands - AX" },
    { label: "Albania - AL", value: "Albania - AL" },
    { label: "Algeria - DZ", value: "Algeria - DZ" },
    { label: "American Samoa - AS", value: "American Samoa - AS" },
    { label: "AndorrA - AD", value: "AndorrA - AD" },
    { label: "Angola - AO", value: "Angola - AO" },
    { label: "Anguilla - AI", value: "Anguilla - AI" },
    { label: "Antarctica - AQ", value: "Antarctica - AQ" },
    { label: "Antigua and Barbuda - AG", value: "Antigua and Barbuda - AG" },
    { label: "Argentina - AR", value: "Argentina - AR" },
    { label: "Armenia - AM", value: "Armenia - AM" },
    { label: "Aruba - AW", value: "Aruba - AW" },
    { label: "Australia - AU", value: "Australia - AU" },
    { label: "Austria - AT", value: "Austria - AT" },
    { label: "Azerbaijan - AZ", value: "Azerbaijan - AZ" },
    { label: "Bahamas - BS", value: "Bahamas - BS" },
    { label: "Bahrain - BH", value: "Bahrain - BH" },
    { label: "Bangladesh - BD", value: "Bangladesh - BD" },
    { label: "Barbados - BB", value: "Barbados - BB" },
    { label: "Belarus - BY", value: "Belarus - BY" },
    { label: "Belgium - BE", value: "Belgium - BE" },
    { label: "Belize - BZ", value: "Belize - BZ" },
    { label: "Benin - BJ", value: "Benin - BJ" },
    { label: "Bermuda - BM", value: "Bermuda - BM" },
    { label: "Bhutan - BT", value: "Bhutan - BT" },
    { label: "Bolivia - BO", value: "Bolivia - BO" },
    { label: "Bosnia and Herzegovina - BA", value: "Bosnia and Herzegovina - BA" },
    { label: "Botswana - BW", value: "Botswana - BW" },
    { label: "Bouvet Island - BV", value: "Bouvet Island - BV" },
    { label: "Brazil - BR", value: "Brazil - BR" },
    { label: "British Indian Ocean Territory - IO", value: "British Indian Ocean Territory - IO" },
    { label: "Brunei Darussalam - BN", value: "Brunei Darussalam - BN" },
    { label: "Bulgaria - BG", value: "Bulgaria - BG" },
    { label: "Burkina Faso - BF", value: "Burkina Faso - BF" },
    { label: "Burundi - BI", value: "Burundi - BI" },
    { label: "Cambodia - KH", value: "Cambodia - KH" },
    { label: "Cameroon - CM", value: "Cameroon - CM" },
    { label: "Canada - CA", value: "Canada - CA" },
    { label: "Cape Verde - CV", value: "Cape Verde - CV" },
    { label: "Cayman Islands - KY", value: "Cayman Islands - KY" },
    { label: "Central African Republic - CF", value: "Central African Republic - CF" },
    { label: "Chad - TD", value: "Chad - TD" },
    { label: "Chile - CL", value: "Chile - CL" },
    { label: "China - CN", value: "China - CN" },
    { label: "Christmas Island - CX", value: "Christmas Island - CX" },
    { label: "Cocos (Keeling) Islands - CC", value: "Cocos (Keeling) Islands - CC" },
    { label: "Colombia - CO", value: "Colombia - CO" },
    { label: "Comoros - KM", value: "Comoros - KM" },
    { label: "Congo - CG", value: "Congo - CG" },
    { label: "Congo, The Democratic Republic of the - CD", value: "Congo, The Democratic Republic of the - CD" },
    { label: "Cook Islands - CK", value: "Cook Islands - CK" },
    { label: "Costa Rica - CR", value: "Costa Rica - CR" },
    { label: "Cote D'Ivoire - CI", value: "Cote D'Ivoire - CI" },
    { label: "Croatia - HR", value: "Croatia - HR" },
    { label: "Cuba - CU", value: "Cuba - CU" },
    { label: "Cyprus - CY", value: "Cyprus - CY" },
    { label: "Czech Republic - CZ", value: "Czech Republic - CZ" },
    { label: "Denmark - DK", value: "Denmark - DK" },
    { label: "Djibouti - DJ", value: "Djibouti - DJ" },
    { label: "Dominica - DM", value: "Dominica - DM" },
    { label: "Dominican Republic - DO", value: "Dominican Republic - DO" },
    { label: "Ecuador - EC", value: "Ecuador - EC" },
    { label: "Egypt - EG", value: "Egypt - EG" },
    { label: "El Salvador - SV", value: "El Salvador - SV" },
    { label: "Equatorial Guinea - GQ", value: "Equatorial Guinea - GQ" },
    { label: "Eritrea - ER", value: "Eritrea - ER" },
    { label: "Estonia - EE", value: "Estonia - EE" },
    { label: "Ethiopia - ET", value: "Ethiopia - ET" },
    { label: "Falkland Islands (Malvinas) - FK", value: "Falkland Islands (Malvinas) - FK" },
    { label: "Faroe Islands - FO", value: "Faroe Islands - FO" },
    { label: "Fiji - FJ", value: "Fiji - FJ" },
    { label: "Finland - FI", value: "Finland - FI" },
    { label: "France - FR", value: "France - FR" },
    { label: "French Guiana - GF", value: "French Guiana - GF" },
    { label: "French Polynesia - PF", value: "French Polynesia - PF" },
    { label: "French Southern Territories - TF", value: "French Southern Territories - TF" },
    { label: "Gabon - GA", value: "Gabon - GA" },
    { label: "Gambia - GM", value: "Gambia - GM" },
    { label: "Georgia - GE", value: "Georgia - GE" },
    { label: "Germany - DE", value: "Germany - DE" },
    { label: "Ghana - GH", value: "Ghana - GH" },
    { label: "Gibraltar - GI", value: "Gibraltar - GI" },
    { label: "Greece - GR", value: "Greece - GR" },
    { label: "Greenland - GL", value: "Greenland - GL" },
    { label: "Grenada - GD", value: "Grenada - GD" },
    { label: "Guadeloupe - GP", value: "Guadeloupe - GP" },
    { label: "Guam - GU", value: "Guam - GU" },
    { label: "Guatemala - GT", value: "Guatemala - GT" },
    { label: "Guernsey - GG", value: "Guernsey - GG" },
    { label: "Guinea - GN", value: "Guinea - GN" },
    { label: "Guinea-Bissau - GW", value: "Guinea-Bissau - GW" },
    { label: "Guyana - GY", value: "Guyana - GY" },
    { label: "Haiti - HT", value: "Haiti - HT" },
    { label: "Heard Island and Mcdonald Islands - HM", value: "Heard Island and Mcdonald Islands - HM" },
    { label: "Holy See (Vatican City State) - VA", value: "Holy See (Vatican City State) - VA" },
    { label: "Honduras - HN", value: "Honduras - HN" },
    { label: "Hong Kong - HK", value: "Hong Kong - HK" },
    { label: "Hungary - HU", value: "Hungary - HU" },
    { label: "Iceland - IS", value: "Iceland - IS" },
    { label: "India - IN", value: "India - IN" },
    { label: "Indonesia - ID", value: "Indonesia - ID" },
    { label: "Iran, Islamic Republic Of - IR", value: "Iran, Islamic Republic Of - IR" },
    { label: "Iraq - IQ", value: "Iraq - IQ" },
    { label: "Ireland - IE", value: "Ireland - IE" },
    { label: "Isle of Man - IM", value: "Isle of Man - IM" },
    { label: "Israel - IL", value: "Israel - IL" },
    { label: "Italy - IT", value: "Italy - IT" },
    { label: "Jamaica - JM", value: "Jamaica - JM" },
    { label: "Japan - JP", value: "Japan - JP" },
    { label: "Jersey - JE", value: "Jersey - JE" },
    { label: "Jordan - JO", value: "Jordan - JO" },
    { label: "Kazakhstan - KZ", value: "Kazakhstan - KZ" },
    { label: "Kenya - KE", value: "Kenya - KE" },
    { label: "Kiribati - KI", value: "Kiribati - KI" },
    { label: "Korea, Democratic People'S Republic of - KP", value: "Korea, Democratic People'S Republic of - KP" },
    { label: "Korea, Republic of - KR", value: "Korea, Republic of - KR" },
    { label: "Kuwait - KW", value: "Kuwait - KW" },
    { label: "Kyrgyzstan - KG", value: "Kyrgyzstan - KG" },
    { label: "Lao People'S Democratic Republic - LA", value: "Lao People'S Democratic Republic - LA" },
    { label: "Latvia - LV", value: "Latvia - LV" },
    { label: "Lebanon - LB", value: "Lebanon - LB" },
    { label: "Lesotho - LS", value: "Lesotho - LS" },
    { label: "Liberia - LR", value: "Liberia - LR" },
    { label: "Libyan Arab Jamahiriya - LY", value: "Libyan Arab Jamahiriya - LY" },
    { label: "Liechtenstein - LI", value: "Liechtenstein - LI" },
    { label: "Lithuania - LT", value: "Lithuania - LT" },
    { label: "Luxembourg - LU", value: "Luxembourg - LU" },
    { label: "Macao - MO", value: "Macao - MO" },
    { label: "Macedonia, The Former Yugoslav Republic of - MK", value: "Macedonia, The Former Yugoslav Republic of - MK" },
    { label: "Madagascar - MG", value: "Madagascar - MG" },
    { label: "Malawi - MW", value: "Malawi - MW" },
    { label: "Malaysia - MY", value: "Malaysia - MY" },
    { label: "Maldives - MV", value: "Maldives - MV" },
    { label: "Mali - ML", value: "Mali - ML" },
    { label: "Malta - MT", value: "Malta - MT" },
    { label: "Marshall Islands - MH", value: "Marshall Islands - MH" },
    { label: "Martinique - MQ", value: "Martinique - MQ" },
    { label: "Mauritania - MR", value: "Mauritania - MR" },
    { label: "Mauritius - MU", value: "Mauritius - MU" },
    { label: "Mayotte - YT", value: "Mayotte - YT" },
    { label: "Mexico - MX", value: "Mexico - MX" },
    { label: "Micronesia, Federated States of - FM", value: "Micronesia, Federated States of - FM" },
    { label: "Moldova, Republic of - MD", value: "Moldova, Republic of - MD" },
    { label: "Monaco - MC", value: "Monaco - MC" },
    { label: "Mongolia - MN", value: "Mongolia - MN" },
    { label: "Montserrat - MS", value: "Montserrat - MS" },
    { label: "Morocco - MA", value: "Morocco - MA" },
    { label: "Mozambique - MZ", value: "Mozambique - MZ" },
    { label: "Myanmar - MM", value: "Myanmar - MM" },
    { label: "Namibia - NA", value: "Namibia - NA" },
    { label: "Nauru - NR", value: "Nauru - NR" },
    { label: "Nepal - NP", value: "Nepal - NP" },
    { label: "Netherlands - NL", value: "Netherlands - NL" },
    { label: "Netherlands Antilles - AN", value: "Netherlands Antilles - AN" },
    { label: "New Caledonia - NC", value: "New Caledonia - NC" },
    { label: "New Zealand - NZ", value: "New Zealand - NZ" },
    { label: "Nicaragua - NI", value: "Nicaragua - NI" },
    { label: "Niger - NE", value: "Niger - NE" },
    { label: "Nigeria - NG", value: "Nigeria - NG" },
    { label: "Niue - NU", value: "Niue - NU" },
    { label: "Norfolk Island - NF", value: "Norfolk Island - NF" },
    { label: "Northern Mariana Islands - MP", value: "Northern Mariana Islands - MP" },
    { label: "Norway - NO", value: "Norway - NO" },
    { label: "Oman - OM", value: "Oman - OM" },
    { label: "Pakistan - PK", value: "Pakistan - PK" },
    { label: "Palau - PW", value: "Palau - PW" },
    { label: "Palestinian Territory, Occupied - PS", value: "Palestinian Territory, Occupied - PS" },
    { label: "Panama - PA", value: "Panama - PA" },
    { label: "Papua New Guinea - PG", value: "Papua New Guinea - PG" },
    { label: "Paraguay - PY", value: "Paraguay - PY" },
    { label: "Peru - PE", value: "Peru - PE" },
    { label: "Philippines - PH", value: "Philippines - PH" },
    { label: "Pitcairn - PN", value: "Pitcairn - PN" },
    { label: "Poland - PL", value: "Poland - PL" },
    { label: "Portugal - PT", value: "Portugal - PT" },
    { label: "Puerto Rico - PR", value: "Puerto Rico - PR" },
    { label: "Qatar - QA", value: "Qatar - QA" },
    { label: "Reunion - RE", value: "Reunion - RE" },
    { label: "Romania - RO", value: "Romania - RO" },
    { label: "Russian Federation - RU", value: "Russian Federation - RU" },
    { label: "RWANDA - RW", value: "RWANDA - RW" },
    { label: "Saint Helena - SH", value: "Saint Helena - SH" },
    { label: "Saint Kitts and Nevis - KN", value: "Saint Kitts and Nevis - KN" },
    { label: "Saint Lucia - LC", value: "Saint Lucia - LC" },
    { label: "Saint Pierre and Miquelon - PM", value: "Saint Pierre and Miquelon - PM" },
    { label: "Saint Vincent and the Grenadines - VC", value: "Saint Vincent and the Grenadines - VC" },
    { label: "Samoa - WS", value: "Samoa - WS" },
    { label: "San Marino - SM", value: "San Marino - SM" },
    { label: "Sao Tome and Principe - ST", value: "Sao Tome and Principe - ST" },
    { label: "Saudi Arabia - SA", value: "Saudi Arabia - SA" },
    { label: "Senegal - SN", value: "Senegal - SN" },
    { label: "Serbia and Montenegro - CS", value: "Serbia and Montenegro - CS" },
    { label: "Seychelles - SC", value: "Seychelles - SC" },
    { label: "Sierra Leone - SL", value: "Sierra Leone - SL" },
    { label: "Singapore - SG", value: "Singapore - SG" },
    { label: "Slovakia - SK", value: "Slovakia - SK" },
    { label: "Slovenia - SI", value: "Slovenia - SI" },
    { label: "Solomon Islands - SB", value: "Solomon Islands - SB" },
    { label: "Somalia - SO", value: "Somalia - SO" },
    { label: "South Africa - ZA", value: "South Africa - ZA" },
    { label: "South Georgia and the South Sandwich Islands - GS", value: "South Georgia and the South Sandwich Islands - GS" },
    { label: "Spain - ES", value: "Spain - ES" },
    { label: "Sri Lanka - LK", value: "Sri Lanka - LK" },
    { label: "Sudan - SD", value: "Sudan - SD" },
    { label: "Surilabel - SR", value: "Surilabel - SR" },
    { label: "Svalbard and Jan Mayen - SJ", value: "Svalbard and Jan Mayen - SJ" },
    { label: "Swaziland - SZ", value: "Swaziland - SZ" },
    { label: "Sweden - SE", value: "Sweden - SE" },
    { label: "Switzerland - CH", value: "Switzerland - CH" },
    { label: "Syrian Arab Republic - SY", value: "Syrian Arab Republic - SY" },
    { label: "Taiwan, Province of China - TW", value: "Taiwan, Province of China - TW" },
    { label: "Tajikistan - TJ", value: "Tajikistan - TJ" },
    { label: "Tanzania, United Republic of - TZ", value: "Tanzania, United Republic of - TZ" },
    { label: "Thailand - TH", value: "Thailand - TH" },
    { label: "Timor-Leste - TL", value: "Timor-Leste - TL" },
    { label: "Togo - TG", value: "Togo - TG" },
    { label: "Tokelau - TK", value: "Tokelau - TK" },
    { label: "Tonga - TO", value: "Tonga - TO" },
    { label: "Trinidad and Tobago - TT", value: "Trinidad and Tobago - TT" },
    { label: "Tunisia - TN", value: "Tunisia - TN" },
    { label: "Turkey - TR", value: "Turkey - TR" },
    { label: "Turkmenistan - TM", value: "Turkmenistan - TM" },
    { label: "Turks and Caicos Islands - TC", value: "Turks and Caicos Islands - TC" },
    { label: "Tuvalu - TV", value: "Tuvalu - TV" },
    { label: "Uganda - UG", value: "Uganda - UG" },
    { label: "Ukraine - UA", value: "Ukraine - UA" },
    { label: "United Arab Emirates - AE", value: "United Arab Emirates - AE" },
    { label: "United Kingdom - GB", value: "United Kingdom - GB" },
    { label: "United States - US", value: "United States - US" },
    { label: "United States Minor Outlying Islands - UM", value: "United States Minor Outlying Islands - UM" },
    { label: "Uruguay - UY", value: "Uruguay - UY" },
    { label: "Uzbekistan - UZ", value: "Uzbekistan - UZ" },
    { label: "Vanuatu - VU", value: "Vanuatu - VU" },
    { label: "Venezuela - VE", value: "Venezuela - VE" },
    { label: "Viet Nam - VN", value: "Viet Nam - VN" },
    { label: "Virgin Islands, British - VG", value: "Virgin Islands, British - VG" },
    { label: "Virgin Islands, U.S. - VI", value: "Virgin Islands, U.S. - VI" },
    { label: "Wallis and Futuna - WF", value: "Wallis and Futuna - WF" },
    { label: "Western Sahara - EH", value: "Western Sahara - EH" },
    { label: "Yemen - YE", value: "Yemen - YE" },
    { label: "Zambia - ZM", value: "Zambia - ZM" },
    { label: "Zimbabwe - ZW", value: "Zimbabwe - ZW" },
  ];
}

export function youtubeUrlParse(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

export function vimeoUrlParse(url) {
  var regExp = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
  var match = url.match(regExp);
  return match ? match[3] : false;
}

export function getcolor(element, key) {
  let color = "#fff";
  element.forEach((value) => {
    if (value.name === key) {
      color = value.color;
    }
  });
  return color;
}

export function generateFile(fileName = "index.html", content = "Hello World") {
  var element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
  element.setAttribute("download", fileName);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export function getChartData(data) {
  // var sorted = [];
  // var values = [];
  // for(var k in data){
  //   console.log(k)
  //   sorted.push(k);
  //     // values.push(data.countCustomer[k])
  // }
  const sorted = data.dates.sort((a, b) => new moment(a).format("YYYYMMDD") - new moment(b).format("YYYYMMDD"));
  const options = {
    chart: {
      height: 350,
      type: "area",
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "date",
      categories: sorted,
    },
    colors: ["#A398F5"],
    markers: {
      size: 0,
      colors: ["#FFA41B"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
  };
  const series = [
    {
      name: "",
      data: data.dots,
    },
  ];

  return { options, series };
}

export const GenerateCVS = function (JSONData, ReportTitle, ShowLabel) {
  var arrData = typeof JSONData !== "object" ? JSON.parse(JSONData) : JSONData;
  var CSV = "";
  CSV += ReportTitle + "\r\n\n";
  if (ShowLabel) {
    var row = "";
    for (var index in arrData[0]) {
      row += index + ",";
    }
    row = row.slice(0, -1);
    CSV += row + "\r\n";
  }
  for (var i = 0; i < arrData.length; i++) {
    var row = "";
    for (var index in arrData[i]) {
      row += '"' + arrData[i][index] + '",';
    }
    row.slice(0, row.length - 1);
    CSV += row + "\r\n";
  }

  if (CSV == "") {
    alert("Invalid data");
    return;
  }

  var fileName = "Converzee_";
  fileName += ReportTitle.replace(/ /g, "_");
  var uri = "data:text/csv;charset=utf-8," + escape(CSV);
  var link = document.createElement("a");
  link.href = uri;
  link.style = "visibility:hidden";
  link.download = fileName + ".csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
