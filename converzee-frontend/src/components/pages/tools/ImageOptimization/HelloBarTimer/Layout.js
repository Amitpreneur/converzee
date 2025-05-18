import React, { Component } from "react";
import { LayoutSelector } from "../../../layout/LayoutSelector";
export default class Layout extends Component {
  state = {
    layout: this.props.layout,
  };
  templates = ["asset/template/hbt1.PNG", "asset/template/hbt2.PNG", "asset/template/hbt3.PNG"];
  componentWillUnmount() {
    const { cases } = this.props;
    this.props.onChange(cases, this.state.layout);
  }

  onLayoutClick = (layout) => {
    const { cases } = this.props;
    this.setState({ layout }, () => {
      this.props.onChange(cases, this.state.layout);
    });
  };

  render() {
    const { layout } = this.state;
    return <LayoutSelector onLayoutSelect={this.onLayoutClick} selected={layout} items={this.templates} />;
  }
}
