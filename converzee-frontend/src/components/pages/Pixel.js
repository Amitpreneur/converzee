import React, { Component } from "react";
import { GET_PIXEL } from "../../actions/URLs";
import RequestHandler from "../../actions/RequestHandler";
import { Info } from "../comman/Info";
export default class Pixel extends Component {
  state = {
    pixel: "",
  };
  componentDidMount() {
    window.gs.navTitle("Pixel");
    RequestHandler.PostRequest(GET_PIXEL, {}, (res, err) => {
      if (res) {
        const pixel = res.data.pixel;
        if (pixel) {
          this.setState({ pixel });
        }
      }
    });
  }

  render() {
    const { pixel } = this.state;
    return (
      <div className="container cz_domain_box">
        <div className="row" style={{ paddingTop: "35px" }}>
          <div className="col-12">
            <center>
              <div style={{ width: "80%", textAlign: "left" }}>
                <div style={{ fontSize: "20px", paddingLeft: "33px" }}>
                  <strong>Pixel</strong>
                </div>
              </div>
            </center>
          </div>
          <div className="col">
            <center>
              <div className="create-center-main" style={{ marginTop: "2%" }}>
                <div>
                  <center>
                    <div style={{ width: "60%", padding: "20px" }}>
                      <div className="col-auto">
                        {/* <div className="label-text">Pixel</div> */}
                        <div className="input-group mb-2">
                          <input type="text" className="form-control" autoComplete="off" id="scriptToCopy" name="pixel" value={pixel} onChange={e => console.log(e)}/>
                          <div className="input-group-postpend">
                            <span className="input-group-text" onClick={copyScript} style={{ cursor: "pointer" }}>
                              <i className="fa fa-copy" />
                            </span>
                          </div>
                          <Info text="Paste this code to your code's footer section of webpage to use the tool." />
                        </div>
                      </div>
                    </div>
                  </center>
                </div>
              </div>
            </center>
          </div>
          <div className="col-12">
            <center>
              <div style={{ width: "80%", textAlign: "left", paddingTop: "10px" }}>
                <div style={{ paddingLeft: "33px" }}>
                  <p style={{ color: "gray" }}>Copy this code to you header/footer of webpage to use the tool</p>
                </div>
                <div style={{ paddingLeft: "33px" }}>
                  <p style={{ color: "gray" }}>once this steps your setup is complete to run the tool</p>
                </div>
              </div>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

function copyScript() {
  var copyText = document.getElementById("scriptToCopy");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  window.gs.toast("Copied", { position: "top-center", type: window.gs.toast.TYPE.INFO });
}
