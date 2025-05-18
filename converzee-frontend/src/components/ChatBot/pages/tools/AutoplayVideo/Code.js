import React, { Component } from "react";
import DropDown from "../../../comman/DropDown";
import { Info } from "../../../comman/Info";
import ToolUtil, { getCodeOptions } from "../../../../utils/ToolUtil";
export default class Code extends Component {
  options = getCodeOptions();
  state = {
    include: this.props.include,
    exclude: (ToolUtil.isUpgrade1 && window.isAdvancedOpt) ? this.props.exclude : [],
  };

  onDropDownChange1 = (e, index) => {
    if (!index) index = 0;
    this.state.include[index].type = e;
  };

  onDropDownChange2 = (e, index) => {
    if (!index) index = 0;
    this.state.exclude[index].type = e;
  };

  componentWillUnmount() {
    const cases = this.props.cases || 1;
    this.props.onChange(this.state);
  }

  onItemChange1 = (index, e) => {
    this.state.include[index].url = e.target.value;
    this.setState({ include: this.state.include });
    this.props.onChange(this.state);
  };

  onItemChange2 = (index, e) => {
    this.state.exclude[index].url = e.target.value;
    this.setState({ exclude: this.state.exclude });
    this.props.onChange(this.state);
  };

  onAddClick = (typ) => {
    const cases = this.props.case || 1;
    const { include, exclude } = this.state;
    if (typ === 1) {
      include.push({ type: "contains", url: "" });
      this.setState({ include });
    } else {
      exclude.push({ type: "contains", url: "" });
      this.setState({ exclude });
    }
    this.props.onChange(this.state);
  };

  onRemoveClick = (typ, index) => {
    const cases = this.props.case || 1;
    const include = this.state.include || [{ type: "contains", url: "" }];
    const exclude = this.state.exclude || [{ type: "contains", url: "" }];
    if (typ === 1) {
      include.splice(index, 1);
      this.setState({ include });
    } else {
      exclude.splice(index, 1);
      this.setState({ exclude });
    }
    this.props.onChange(this.state);
  };

  renderInClude = (item, index) => {
    const { include } = this.state;
    return (
      <React.Fragment key={index}>
        <div className="col-4">
          <DropDown options={this.options} index={index} onChange={this.onDropDownChange1} value={item.type} className="dropdown-style" style={{ width: "" }} />
        </div>
        <div className="col-8">
          <TextInput index={index} typeN={1} onAddClick={this.onAddClick} onRemoveClick={this.onRemoveClick} size={include.length} onChange={this.onItemChange1} value={item.url} />
        </div>
      </React.Fragment>
    );
  };

  renderExclude = (item, index) => {
    const { exclude } = this.state;
    return (
      <React.Fragment key={index}>
        <div className="col-4">
          <DropDown options={this.options} index={index} onChange={this.onDropDownChange2} value={item.type} className="dropdown-style" style={{ width: "" }} />
        </div>
        <div className="col-8">
          <TextInput index={index} typeN={2} onAddClick={this.onAddClick} onRemoveClick={this.onRemoveClick} size={exclude.length} onChange={this.onItemChange2} value={item.url} />
        </div>
      </React.Fragment>
    );
  };

  render() {
    const include = this.state.include || [{ type: "contains", url: "" }];
    const exclude = this.state.exclude || [{ type: "contains", url: "" }];
    return (
      <div>
        <div className="label-text">
          URL Settings*
          <Info text="Enter url for tigger Campaigen" />
        </div>
        <div className="container">
          <div className="label-text">Include</div>
          <div className="row">{include.map(this.renderInClude)}</div>
          <div className="w-100"></div>
          <div className="label-text">Exclude</div>
          {exclude.length ? (
            <div className="row">
              {exclude.map(this.renderExclude)}
              <div className="w-100"></div>
            </div>
          ) : (
            <div>You Need to Upgrade</div>
          )}
        </div>
      </div>
    );
  }
}

const TextInput = (props) => {
  return (
    <div className="code-input-block ">
      <input type="text" value={props.value ? props.value : ""} className="form-control" onChange={(e) => props.onChange(props.index, e)} />
      <div className="code-plusIcon">
        {props.size - 1 === props.index ? (
          <i onClick={() => props.onAddClick(props.typeN)} className="fa fa-plus-circle" aria-hidden="true" />
        ) : (
          <i onClick={() => props.onRemoveClick(props.typeN, props.index)} className="fa fa-minus-circle" aria-hidden="true" />
        )}
      </div>
    </div>
  );
};
