import React, { Component } from "react";
import { SketchPicker } from "react-color";
import { ColorSelector } from "../layout/LayoutSelector";
import Uploader from "../comman/Uploader";
import { Switch } from "antd";
export default class Style extends Component {
  state = {
    logo: this.props.logo,
    scale: this.props.scale
  };

  onUploadDone = (image) => {
    this.setState({ logo: image.image }, () => {
      this.props.onChange({ logo: this.state.logo });
    });
  };


  onReset = () => {
    this.setState({ logo: "" }, () => {
      this.props.onChange({ logo: this.state.logo });
    });
  };

  onChangeActive = (e) => {
    if(e.target.innerHTML === "1x") {
      this.setState({ scale: "1.1" }, () => {
        this.props.onChange({ scale: this.state.scale });
      })
    } else if(e.target.innerHTML === "2x") {
      this.setState({ scale: "1.2" }, () => {
        this.props.onChange({ scale: this.state.scale });
      })
    } else if(e.target.innerHTML === "3x") {
      this.setState({ scale: "1.3" }, () => {
        this.props.onChange({ scale: this.state.scale });
      })
    } else if(e.target.innerHTML === "4x") {
      this.setState({ scale: "1.4" }, () => {
        this.props.onChange({ scale: this.state.scale });
      })
    } else {
      this.setState({ scale: "1.5" }, () => {
        this.props.onChange({ scale: this.state.scale });
      })
    }

  }

  render() {
    const { scale } = this.state;
    const props = {
      onUploadDone: this.onUploadDone,
    };
    return (
      <div className="row ">
        <div className="col-12 ">
        {this.props.layout != 3 ?
          <Uploader {...props} onReset={this.onReset} />:null
        }
          {this.props.layout === 3 ?
          <div className="cz_timer_scale">
            <h3>Scale timer size</h3>
            <ul onClick={this.onChangeActive}>
              <li className={scale == "1.1" ? "active" : ""}>1x</li>
              <li className={scale == "1.2" ? "active" : ""}>2x</li>
              <li className={scale == "1.3" ? "active" : ""}>3x</li>
              <li className={scale == "1.4" ? "active" : ""}>4x</li>
              <li className={scale == "1.5" ? "active" : ""}>5x</li>
            </ul>
          </div>
          : null
          }
        </div>
        {/* ) : null} */}
      </div>
    );
  }
}
