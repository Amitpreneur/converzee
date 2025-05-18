import React, { Component } from "react";
export default class Layout extends Component {
  state = {
    sound: this.props.layout,
  };

  componentWillUnmount() {
    this.props.onChange(4, this.state);
  }

  onLayoutClick = (layout) => {
    this.setState({ layout });
    this.props.onChange(4, this.state);
  };

  render() {
    const { layout } = this.state;
    return (
      <div>
        <center>
          <div style={{ width: "80%", padding: "20px" }}>
            <div class="container">
              <div class="row">
                <div class="col">
                  <div className="layout-item">
                    <img src={window.rPath + "asset/Layout1.svg"} />
                    <input type="radio" checked={layout === 1 ? "checked" : ""} name="layout" onChange={() => this.onLayoutClick(1)} />
                  </div>
                </div>
                <div class="col">
                  <div className="layout-item">
                    <img src={window.rPath + "asset/Layout2.svg"} />
                    <input type="radio" checked={layout === 2 ? "checked" : ""} name="layout" onChange={() => this.onLayoutClick(2)} />
                  </div>
                </div>
                <div class="w-100"></div>
                <div class="col">
                  <div className="layout-item">
                    <img src={window.rPath + "asset/Layout3.svg"} />
                    <input type="radio" checked={layout === 3 ? "checked" : ""} name="layout" onChange={() => this.onLayoutClick(3)} />
                  </div>
                </div>
                <div class="col">
                  <div className="layout-item">
                    <img src={window.rPath + "asset/Layout4.svg"} />
                    <input type="radio" checked={layout === 4 ? "checked" : false} name="layout" onChange={() => this.onLayoutClick(4)} />
                  </div>
                </div>
                <div class="w-100"></div>
                <div class="col">
                  <div className="layout-item">
                    <img src={window.rPath + "asset/Layout5.svg"} />
                    <input type="radio" checked={layout === 5 ? "checked" : false} name="layout" onChange={() => this.onLayoutClick(5)} />
                  </div>
                </div>
                <div class="col">
                  <div className="layout-item">
                    <img src={window.rPath + "asset/Layout6.svg"} />
                    <input type="radio" checked={layout === 6 ? "checked" : false} name="layout" onChange={() => this.onLayoutClick(6)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </center>
      </div>
    );
  }
}
