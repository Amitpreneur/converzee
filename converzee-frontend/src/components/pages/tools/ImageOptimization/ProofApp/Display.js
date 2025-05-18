import React, { Component } from "react";
/* import Util from "../../../Util";
import Switch1 from "../../../comman/Switch"; */
import { getPath } from "../../../../actions/URLs";
export default class Icons extends Component {
  state = { 
    duration : this.props.toolData.duration,
    position : this.props.toolData.position
  } 
 
  changeValue = (e) => {
    const { cases } = this.props;
    this.setState({[e.target.name]: e.target.value}, () => {
      this.props.onChange( cases, this.state );
    })
  }

  render() {
    const { duration, position } = this.state;
    return (
      <div className="video_icons_list">
        <div className="form-element">
          <div className="label-text">Display Duration</div>
          <input className="form-control" type="number" name="duration" value={duration} onChange={this.changeValue}/>
        </div>
        <div className="form-element">
          <div className="label-text">Display Position</div>
          <select className="form-control" name="position" value={position} onChange={this.changeValue}>
            <option value="bottomLeft">Bottom Left</option>
            <option value="bottomRight">Bottom Right</option>
          </select>
        </div>

        {/* <div className="proofapp_preview">
          <div className="proofapp_preview_box">
            <img class="proof_close" src="http://d257yxqteot439.cloudfront.net/static/templateclub/exitbg/1/Close.png"/>
            <div className="proofapp_preview_logo">R</div>
            <div className="proofapp_preview_text">
              <h2>Rahul Thakur Just Signed Up</h2>
              <p className="proofapp_place">From India <span>(10 min ago)</span></p>
              <p className="proofapp_by">By Converzee</p>
            </div>
          </div>
          <div className="proofapp_preview_box">
            <img class="proof_close" src="http://d257yxqteot439.cloudfront.net/static/templateclub/exitbg/1/Close.png"/>
            <div className="proofapp_preview_logo">S</div>
            <div className="proofapp_preview_text">
              <h2>Sarika Singh Just Purchased</h2>
              <p className="proofapp_place">From India <span>(20 min ago)</span></p>
              <p className="proofapp_by">By Converzee</p>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}
// Icon-awesome-check-circle