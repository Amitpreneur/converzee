import React, { Component } from "react";
import { ToolLayout, ButtonsGroup } from "../../layout/ToolLayout";
import Datetime from "react-datetime";
import moment from "moment";
import { ReponsiveImage } from "../../comman/PreviewAble";
import Style from "../../subpages/create/Style";
import { SketchPicker } from "react-color";
import { BONUS_CREATE } from "../../../utils/Routes";

export default class EmailTimer extends Component {
  state = {
    date: new Date(),
    color: "",
    size: 14,
    preview: true,
  };
  componentDidMount() {
    window.gs.navTitle("Email Timer");
  }
  onDropDownChange2 = (value) => {
    const newValu = value.format("YYYY-MM-DD HH:mm:ss");
    this.setState({ date: newValu });
  };
  onColorChange = (color) => {
    this.setState({ color: color.rgb });
  };
  changeFont = (e) => {
    this.setState({ size: e.target.value });
  };

  renderMain = () => {
    const { date, color, size } = this.state;
    let inputProps = {
      placeholder: "Select Date & Time",
      autoComplete: "off",
      readOnly: true
    };

    return (
      <div className="">
        <div className="form-element">
          <div className="label-text">Time*</div>
          <Datetime inputProps={inputProps} defaultValue={moment(date)} onChange={this.onDropDownChange2} />
        </div>
        <div className="form-element">
          <div className="label-text">Font Size*</div>
          <input type="text" name="cpCode" className="form-control" value={size} onChange={this.changeFont} />
        </div>
        <div className="form-element">
          <div className="label-text">Font Color*</div>
          <SketchPicker defaultValue="#452135" color={color} onChangeComplete={this.onColorChange} />
        </div>
      </div>
    );
  };

  onClickSave = () => {
    let script = "";
    const { date, color, size } = this.state;
    let newColor = `${color.r},${color.g},${color.b}`;
    let newtime = date.replace(" ", "+");
    let url = `https://spiety.com/emailTimer/gif.php?time=${newtime}&width=640&height=110&boxColor=8B2860&font=BebasNeue&fontColor=${newColor}&fontSize=${size}&xOffset=155&yOffset=70&labelOffsets=1.4,5,8,11`;
    script = "<img src='" + url + "' />";
    window.gs.setScript(script, true);
  };

  togglePreview = () => {
    this.setState({ preview: !this.state.preview }, () => {
      setTimeout(() => {
        this.setState({ preview: !this.state.preview });
      }, 1000);
    });
  };

  renderRight = () => {
    const { date, color, size, preview } = this.state;
    if (!preview) return "";
    let newColor = color !=="" ? `${color.r},${color.g},${color.b}`: `0,0,0` ;
    let newtime = (date == "") ? date.replace(" ", "+") : moment(date).format("YYYY-MM-DD HH:mm:ss").replace(" ", "+");
    let url = `https://spiety.com/emailTimer/gif.php?time=${newtime}&width=640&height=110&boxColor=8B2860&font=BebasNeue&fontColor=${newColor}&fontSize=${size}&xOffset=155&yOffset=70&labelOffsets=1.4,5,8,11`;
    return <img style={{ height: "auto", width: "100%", paddingTop: "51px" }} src={url} />;
  };

  back = () => {
    this.props.history.push(BONUS_CREATE);
  };

  render() {
    return (
      <ToolLayout>
        <div className="row">
          <div className="col-10 toolItem">
            <div className="row">
              <div className="col-md-6">{this.renderMain()}</div>
              <div className="col-md-6 mt-2">{this.renderRight()}</div>
              {/* <ButtonsGroup backUrl={this.back} preview={this.togglePreview} save={this.onClickSave} /> */}
              <ButtonsGroup backUrl={this.back} save={this.onClickSave} />
            </div>
          </div>
          <div className="col-1 sideBarButtomPanel">{/* <SideBar layout={this.state.toolData.layout} activeTab={this.state.activeTab} onChangeActive={this.onChangeActive} /> */}</div>
        </div>
      </ToolLayout>
    );
  }
}
