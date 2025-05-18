import React, { Component } from "react";
import SideBar from "./SideBar";
import { ButtonsGroup, ToolLayout } from "../layout/ToolLayout";
import { ReponsiveImage } from "../comman/PreviewAble";
import SideImage from "./SideImage";
import Text from "./Text";
import ImageUp from "./Image";
import Style from "./Style";
import { generateFile } from "../Util";
import { createBonusContent } from "../../utils/ToolUtil";
import { getPath } from "../../actions/URLs";
import { BONUS_CREATE } from "../../utils/Routes";

const bonusPageGen = {
  activeTab: 1,
  TEXT: { url: "", footer: "", title: "" },
  logo: "",
  sideImage: "",
  STYLE: {
    selected: 0,
    elements: [{ name: "bgColor", text: "Background Color", color: "#000" }],
  },
};
export default class BonusPage extends Component {
  state = bonusPageGen;
  componentDidMount() {
    window.gs.navTitle("Bonus Page Gen");
  }
  onChangeActive = (tabIndex) => {
    const { activeTab } = this.state;
    if (activeTab !== tabIndex) {
      this.setState({ activeTab: tabIndex });
    }
  };
  onUpdate = (index, data) => {
    switch (index) {
      case 1:
        this.setState({ TEXT: data });
        break;
      case 2:
        this.setState({ logo: data });
        break;
      case 3:
        this.setState({ sideImage: data });
        break;
      case 4:
        this.setState({ STYLE: data });
        break;
      default:
        break;
    }
  };
  renderMain = () => {
    const { activeTab, TEXT, logo, sideImage, STYLE } = this.state;
    let component = null;
    switch (activeTab) {
      case 1:
        component = <Text {...TEXT} onChange={this.onUpdate} />;
        break;
      case 2:
        component = <ImageUp image={logo} onChange={this.onUpdate} />;
        break;
      case 3:
        component = <SideImage image={sideImage} onChange={this.onUpdate} />;
        break;
      case 4:
        component = <Style {...STYLE} cases={4} onChange={this.onUpdate} />;
        break;
      default:
        break;
    }
    return component;
  };

  onClickSave = () => {
    const { TEXT, logo, sideImage, STYLE } = this.state;
    const bg = STYLE.elements[0].color;
    const { url, footer, title } = TEXT;
    generateFile("index.html", createBonusContent(title, url, logo, sideImage, bg, footer, logo));
    window.gs.setScript('<a id="MCK_BUYBUTTON">....</a>');
    setTimeout(() => {
      this.props.history.push("/");
    }, 2000);
  };

  renderRight = () => {
    const { activeTab, logo, sideImage } = this.state;
    if (activeTab === 2 && logo != "") return <ReponsiveImage isImg={true} url={logo} />;
    if (activeTab === 3 && sideImage != "") return <ReponsiveImage isImg={true} url={sideImage} />;
    return <ReponsiveImage isAs={true} url={"asset/mobilevab.png"} />;
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
              <ButtonsGroup backUrl={this.back} download={this.onClickSave} />
            </div>
          </div>
          <div className="col-1 sideBarButtomPanel">
            <SideBar activeTab={this.state.activeTab} onChangeActive={this.onChangeActive} />
          </div>
        </div>
      </ToolLayout>
    );
  }
}
