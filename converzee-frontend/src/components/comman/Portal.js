//@flow
import React from "react";
import { PortalWithState, PortalFunctionParams } from "react-portal";
export default class Portal extends React.Component {
  portalId;
  static portalCounter = 0;
  constructor(props) {
    super(props);
    this.portalId = Portal.portalCounter++;
  }

  getChilder = params => {
    return params ? params.portal(this.props.children) : undefined;
  };

  onClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  onOpen = () => {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  };

  render() {
    //const { children } = this.props;
    return (
      <PortalWithState
        closeOnEsc={this.props.closeOnEsc}
        // closeOnOutsideClick={this.props.closeOnOutsideClick}
        onClose={this.onClose}
        onOpen={this.onOpen}
        defaultOpen={this.props.defaultOpen}
      >
        {this.getChilder}
      </PortalWithState>
    );
  }
}
