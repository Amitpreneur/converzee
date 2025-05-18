const request = require("request");
const MailChimpUtil = new Object();
MailChimpUtil.TestConfig = (uid, apiKey = "") => {
  const region = apiKey.split("-").length === 2 ? apiKey.split("-")[1] : "";
  var options = {
    method: "POST",
    url: "https://" + region + ".api.mailchimp.com/3.0/lists/" + uid + "/members/",
    headers: {
      user: "630a2f370d08099abf462e58cd347767-us4",
      Authorization: "Basic " + new Buffer.alloc(5000, "any:" + apiKey).toString("base64"),
      "Content-Type": "application/json",
    },
    body: "",
  };
  return new Promise((resolve, reject) => {
    try {
      request(options, function (error, response) {
        if (error) resolve(null);
        try {
          resolve(JSON.parse(response.body));
        } catch (e) {
          resolve(null);
        }
      });
    } catch (e) {
      resolve(null);
    }
  });
};

module.exports = MailChimpUtil;
