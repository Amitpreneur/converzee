import React from "react";
// import { Upload, Icon, message } from "antd";
import { Upload, message, Button, Icon, Progress } from "antd";
import "antd/dist/antd.css";
import "./Uploader.css";
import { BASE_URL, IMAGE_UPLOAD_LINK, IMAGE_OPTI_UPLOAD } from "../../actions/URLs";
function vaildateFile(file) {
  if (file) {
    if (file.type.indexOf("image")) return false;
    return true;
  }
}
let progress = 0, pgShow = "none";
const Uploader = (prop) => {
  const props = {
    name: "photo",
    multiple: prop.multiple ? prop.multiple : false,
    action: BASE_URL + (prop.multiple ? IMAGE_OPTI_UPLOAD : IMAGE_UPLOAD_LINK),
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        prop.onUploadDone(info.fileList[info.fileList.length-1].response);
      } else {
        if(info.event) {
          progress = (info.event.type === "progress") ? info.event.percent : 0;
        }
      }

      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setTimeout(() => {
          pgShow = "none";
          progress = 0;
          document.querySelector(".ant-progress-text").innerHTML = "0%" ;
          document.querySelector(".ant-progress-text").setAttribute("title", "0%");
          document.querySelector(".ant-progress-show-info").style.display = "none";
        },1000);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload: (file) => {
      if (!vaildateFile(file)) {
        message.error(`${file.name} file failed. Select A valid Image to upload`);
      }
      pgShow = "block";
    },
  };

  return (
    <div className="row">
      <div className="col-10">
        <Upload {...props}>
          <div className="uploader-default">
            <center>
              <i className="fa fa-cloud-upload"></i>
              <div>Select File to Upload</div>
            </center>
          </div>
        </Upload>
        <Progress percent={progress} status="active" style={{ display: pgShow}}/>
      </div>
      <div className="col-2">
        {prop.onReset ? (
          <div className="row">
            <div className="pull-right">
              <button className="btn btn-sm btn-danger" style={{ position: "absolute", top: "0px", right: "8px" }} onClick={prop.onReset}>
                Reset
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Uploader;
