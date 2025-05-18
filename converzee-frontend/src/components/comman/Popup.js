import React, { useState, useCallback } from "react";
import "./Popup.css";
import { Modal, Result, Input, Button } from "antd";
import { TestAutoResponder } from "../../utils/ToolUtil";
import { Info } from "./Info";
export const Popup = function (children) {
  return (
    <div className="popup">
      <div className="popup_inner">{children}</div>
    </div>
  );
};

export const SuccessModel = function (props) {
  const isSuccess = props.isSuccess ? "success" : "warning";
  const msg = props.msg !== "" ? props.msg : isSuccess ? "Successfully" : "Error";
  return (
    <Modal title="Success" centered visible={props.visible} footer={[]}>
      <Result status={isSuccess} title={msg} subTitle={""} extra={[]} />
    </Modal>
  );
};

export const ErrorModel = function (props) {
  let subtitle = "";
  if (props.urlKeys) subtitle = <ErrorMsgUrl urlKeys={props.urlKeys} />;
  return (
    <Modal
      title="Error"
      centered
      visible={props.visible}
      footer={[
        <Button key="back" className="closeButton" onClick={window.gs.showErrorWithHtml}>
          Close
        </Button>,
      ]}
    >
      <Result status={"error"} title={props.error} subTitle={subtitle} extra={[]} />
    </Modal>
  );
};

export const CampaignNameInput = function (props) {
  const [camp, setCamp] = useState("");
  return (
    <Modal
      title="Campaign Name"
      visible={props.visible}
      className="campignNameModal"
      footer={[
        <Button
          key="back"
          className="cz_btn cz_light_btn"
          onClick={() => {
            setCamp("");
            props.Close();
          }}
        >
          Close
        </Button>,
        <Button
          key="submit"
          className="nextButton cz_btn"
          disabled={camp.length < 4}
          type="primary"
          onClick={() => {
            props.submit(camp);
            setCamp("");
          }}
        >
          Next
        </Button>,
      ]}
    >
      <div className="popup_input">
        <Input placeholder="Campaign Name" style={{ width: "90%" }} value={camp} onChange={(e) => setCamp(e.target.value)} />
        <Info text="Name should contain atleast 4 characters" />
      </div>
    </Modal>
  );
};

export const SayUpdate = function (props) {
  return (
    <Modal
      title="Upgread"
      visible={props.visible}
      className="campignNameModal"
      footer={[
        <Button key="back" className="closeButton" onClick={props.Close}>
          Close
        </Button>,
        props.hideButton ? null : (
          <Button
            key="submit"
            className="nextButton"
            onClick={() => {
              console.log(props.link);
              if (props.link != "") window.open(props.link, "_blank");
            }}
            type="primary"
          >
            Upgrade
          </Button>
        ),
      ]}
    >
      <div>{props.msg}</div>
    </Modal>
  );
};

export const AddAccount = function (props) {
  const [userName, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  return (
    <Modal
      title="Campaign Name"
      visible={props.visible}
      className="campignNameModal"
      footer={[
        <Button key="back" className="closeButton" onClick={props.Close}>
          Close
        </Button>,
        <Button key="submit" className="nextButton" disabled={email == null || userName == null} type="primary" onClick={() => props.submit(email, userName)}>
          Save
        </Button>,
      ]}
    >
      <div>
        <Input placeholder="User Name" value={userName} onChange={(e) => setUsername(e.target.value)} />
        <div style={{ height: "20px" }}></div>
        <Input placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
    </Modal>
  );
};

export const LockTool = (props) => {
  return (
    <div className="lock" style={props.style}>
      <div className="lock-div">
        {/* <a className="btn btn-sm lock-login-btn">Login</a> */}
        { !props.isLock ? <div className="lock_icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="19.25" height="22" viewBox="0 0 19.25 22">
            <path id="Icon_awesome-lock" data-name="Icon awesome-lock" d="M17.188,9.625H16.156V6.531a6.531,6.531,0,0,0-13.062,0V9.625H2.063A2.063,2.063,0,0,0,0,11.688v8.25A2.063,2.063,0,0,0,2.063,22H17.188a2.063,2.063,0,0,0,2.063-2.062v-8.25A2.063,2.063,0,0,0,17.188,9.625Zm-4.469,0H6.531V6.531a3.094,3.094,0,0,1,6.188,0Z" opacity="0.32"/>
          </svg>
        </div> :
        <div>
          <a 
            class="btn btn-sm lock-salespage-btn cz_btn"
            onClick={() => {
              !props.isLock ? 
              window.gs.sayUpdate("To be fair to our JV partners & affiliates, your Agency access will be unlocked 1 month after your purchase", true, "") : 
              window.open(props.preview, "_blank");
            }}
          >Preview</a>
          <a 
            class="btn btn-sm lock-salespage-btn cz_btn cz_download_agency" 
            href={props.path || "#"}
            target="_blank"
            download 
          >
            Download
          </a>
        </div>}
      </div>
    </div>
  );
};

export const CopyScript = function (props) {
  return (
    <Modal
      title="Copy code"
      visible={props.visible}
      className="campignNameModal"
      footer={[
        <Button key="back" className="closeButton" onClick={props.Close}>
          Close
        </Button>,
      ]}
    >
      <div className="main-campaing">
        <label>Script</label>
        <div className="input-group mb-3">
          <input type="text" className="form-control" id="scriptToCopy" value={props.script} />
          <div className="input-group-append">
            <span className="input-group-text" onClick={copyScript} style={{ cursor: "pointer" }}>
              <i className="fa fa-copy" />
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export const AutoResponderConfig = (props) => {
  const [region, setRegion] = useState(props.region);
  const [uid, setUid] = useState(props.uid);
  const [apiKey, setApiKey] = useState(props.apiKey);
  const [isTest, setIsTest] = useState(false);
  const checkTesting = useCallback(() => {
    TestAutoResponder(uid, apiKey, (isTrue) => {
      if (!isTrue) {
        props.Close();
      } else {
        setIsTest(isTrue);
      }
    });
  });
  return (
    <Modal
      title="Auto Responder Integration"
      visible={props.visible}
      className="campignNameModal"
      footer={[
        <Button key="back" className="closeButton" onClick={props.Close}>
          Close
        </Button>,
        isTest ? (
          <Button key="Save" className="nextButton" onClick={() => props.save(region, uid, apiKey)}>
            Save
          </Button>
        ) : (
          <Button key="Test" className="nextButton" onClick={checkTesting}>
            Test
          </Button>
        ),
      ]}
    >
      <div className="">
        <Input placeholder="Mail Chimp Instance" value={region} onChange={(e) => setRegion(e.target.value)} />
        <div style={{ height: "20px" }}></div>
        <Input placeholder="List Unique Id" value={uid} onChange={(e) => setUid(e.target.value)} />
        <div style={{ height: "20px" }}></div>
        <Input placeholder="Api Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
      </div>
    </Modal>
  );
};

function copyScript() {
  var copyText = document.getElementById("scriptToCopy");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

export const ErrorMsgUrl = (props) => {
  const items = Object.keys(props.urlKeys) || [];
  return (
    <div>
      {items.map((e, i) => (
        <ErrorItem _key={e} _item={props.urlKeys[e]} />
      ))}
    </div>
  );
};

const ErrorItem = function (p) {
  return (
    <React.Fragment>
      {p._key !== "url" ? (
        <div className="errorItems">
          <span>{p._key} : </span>&nbsp;&nbsp;&nbsp;
          {p._item}
        </div>
      ) : (
        <div className="errorItems">
          <span>{p._key} : </span>&nbsp;&nbsp;&nbsp;
          <a target="_blank" className="url" href={p._item}>
            {p._item}
          </a>
        </div>
      )}
    </React.Fragment>
  );
};

function fulllScreen() {
  const featuredimg = document.getElementById("videoPopUpItem");
  if (featuredimg.requestFullscreen) {
    featuredimg.requestFullscreen();
  }
}

export const VideoPopup = function (props) {
  return (
    <Modal
      width={800}
      title={props.name}
      visible={props.visible}
      className="videoPopupItem"
      footer={[
        <Button key="back" className="closeButton" onClick={props.Close}>
          Close
        </Button>,
        <Button key="fullScreen" onClick={fulllScreen}>
          FullScreen
        </Button>,
      ]}
    >
      <div className="embed-responsive embed-responsive-21by9">
        <iframe
          className="embed-responsive-item"
          src={"https://player.vimeo.com/video/" + props.url}
          width="800"
          height="500"
          frameborder="0"
          id="videoPopUpItem"
          title={props.name}
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
        ></iframe>
      </div>
    </Modal>
  );
};
