import React, { Component } from "react";
import { SideButton } from "../layout/ToolLayout";
export default class SideBar extends Component {
  state = {
    showItems: [],
  };

  render() {
    const { activeTab, selected, layout } = this.props;
    const LAYOUT_IMG = activeTab === 1 ? "sideButton activeSideButton" : "sideButton";
    const TEXT_IMG = activeTab === 2 ? "sideButton activeSideButton" : "sideButton";
    const CTA_IMG = activeTab === 3 ? "sideButton activeSideButton" : "sideButton";
    const STYLE_IMG = activeTab === 4 ? "sideButton activeSideButton" : "sideButton";
    const TIG_IMG = activeTab === 5 ? "sideButton activeSideButton" : "sideButton";
    const TIME_IMG = activeTab === 6 ? "sideButton activeSideButton" : "sideButton";
    const RESPONDER_IMG = activeTab === 7 ? "sideButton activeSideButton" : "sideButton";

    let condition = (layout === 2 && (selected === 1 || selected === 3))

    return (
      <React.Fragment>
        <div onClick={() => this.props.onChangeActive(1)} className={LAYOUT_IMG}>
          <SideButton class={"fa fa-object-group"} text="Layout" />
        </div>
        {this.props.layout === 3 ? null : 
          <div onClick={() => this.props.onChangeActive(2)} className={TEXT_IMG}>
            <SideButton class={this.props.layout === 4 ? "fa fa-plus-square-o" : "fa fa-text-width"} text={this.props.layout === 4 ? "Icons" : "Text"} />
          </div>
        }
        {this.props.layout === 0 || this.props.layout === 4 || this.props.layout === 5 ? null : 
          ( !condition ? 
          <div onClick={() => this.props.onChangeActive(6)} className={TIME_IMG}>
            <SideButton class={"fa fa-clock-o"} text="Timer" />
          </div> : null
        )}
        {this.props.layout === 3 || this.props.layout === 4 ? null : 
          <div onClick={() => this.props.onChangeActive(3)} className={CTA_IMG}>
            <SideButton class={"fa fa-outdent"} text="CTA" />
          </div>
        }
        {this.props.layout === 4 ? null : 
          <div onClick={() => this.props.onChangeActive(4)} className={STYLE_IMG}>
            <SideButton class={"fa fa-paint-brush"} text="Style" />
          </div>
        }
        {this.props.layout === 5 || this.props.layout === 6 || this.props.layout === 7 ? 
          <div onClick={() => this.props.onChangeActive(7)} className={RESPONDER_IMG}>
            <SideButton class={"fa fa-envelope"} text="Auto responders" />
          </div> : null 
        }
        <div onClick={() => this.props.onChangeActive(5)} className={TIG_IMG}>
          <SideButton class={"fa fa-code"} text="Trigger" />
        </div>
      </React.Fragment>
    );
  }
}
