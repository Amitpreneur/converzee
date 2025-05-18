const awsSDK = require("aws-sdk");
const fs = require("fs");
const uploadFile = function (filename, fileDirectoryPath, folder = "temp") {
  awsSDK.config.update({ accessKeyId: process.env.S3_ACCESS_KEY_ID, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY });
  const s3 = new awsSDK.S3();
  return new Promise(function (resolve, reject) {
    fs.readFile(fileDirectoryPath.toString(), function (err, data) {
      if (err) {
        reject(err);
      }
      s3.putObject(
        {
          Bucket: "" + process.env.S3_BUCKET_NAME,
          Key: `${folder}/${filename}`,
          Body: data,
          ACL: "public-read",
        },
        function (err, data) {
          if (err) reject(err);
          // fs.unlinkSync(fileDirectoryPath);
          resolve(`${filename}`);
        }
      );
    });
  });
};

module.exports = uploadFile;
