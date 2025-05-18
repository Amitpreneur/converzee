import React, { Component } from "react";
import Switch1 from "../../../comman/Switch";
export default class Sound extends Component {
  state = {
    Sound: this.props.SOUND,
  };

  onChange = (Sound) => {
    this.setState({ Sound });
    this.props.onChange(4, this.state.Sound);
  };

  componentWillUnmount() {
    this.props.onChange(4, this.state.Sound);
  }

  render() {
    const { Sound } = this.state;
    return (
      <div>
        <div className="form-element" onClick={() => this.onChange(!Sound)}>
          {Sound ? <i class="fa fa-volume-up"></i> : <i class="fa fa-volume-mute"></i>}
        </div>
        <Info text="Click Icon to enable or disable sound" />
      </div>
    );
  }
}
