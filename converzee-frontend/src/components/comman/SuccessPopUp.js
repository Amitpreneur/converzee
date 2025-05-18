import React from "react";
const SuccessPopup = props => {
  return (
    <div className="popup">
      <div className="popup_inner">
        <div className="popUpMainContainer">
          <div className="popUpTitlebar">
            <div onClick={() => props.closePopup()} className="popupCloseButton">
              <i className="fa fa-close" />
            </div>
          </div>
          <div className="main-campaing">
            <center>
              <h5>Campaing has been Successfully Added</h5>
              <div>
                <i className="fa fa-check" style={{ fontSize: "20px" }}></i>
              </div>
              <button className="btn btn-xs btn-danger" onClick={() => props.closePopup()}>
                Close
              </button>
            </center>
          </div>
          <div className="popUpbottomBar">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
