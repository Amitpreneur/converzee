import * as React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import ToolUtil from "../../utils/ToolUtil";
export default class DropDown extends React.Component {
  static propTypes = {
    classes: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
    disable: PropTypes.bool,
    value: PropTypes.string,
    index: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    classes: "form-control form-control-sm",
    value: "",
    options: [],
    disable: false,
    style: { width: "min-content" },
  };

  onChange = (e) => {
    if (this.props.index) {
      this.props.onChange(e.target.value, this.props.index);
    } else {
      this.props.onChange(e.target.value);
    }
  };

  renderOptions = (option, i) => {
    return (
      <option key={i} selected={this.props.value === option.value ? true : false} disabled={option.disable} value={option.value}>
        {option.label}
      </option>
    );
  };

  render() {
    const { classes, style, options, onChange, disable, selected, index } = this.props;
    return (
      <select disabled={disable} onChange={this.onChange} style={style} className={classes}>
        {options.map(this.renderOptions)}
      </select>
    );
  }
}

export class ToolSelectorDropDown extends React.PureComponent {
  OTO1 = [
    { tid: 1, selected: false, text: "Tab Messaging" },
    { tid: 2, selected: false, text: "Urgency Timer" },
    { tid: 5, selected: false, text: "Video Popup" },
    { tid: 6, selected: false, text: "Central Timer" },
    { tid: 7, selected: false, text: "Geo Redirection" },
    { tid: 3, selected: false, text: "HELLO BAR" },
    { tid: 4, selected: false, text: "Image Popup" },
    { tid: 9, selected: false, text: "Exit Intent" },
    { tid: 10, selected: false, text: "Mobile Vibrator" },
    { tid: 13, selected: false, text: "Dynamic Elements" },
    { tid: 14, selected: false, text: "Offer iframe" },
    { tid: 15, selected: false, text: "Back Button redirection" },
    { tid: 17, selected: false, text: "HELLO BAR + Timer" },
    { tid: 24, selected: false, text: "Autoplay Video" }
  ];
  // OTO2 = [
  //   { tid: 18, selected: false, text: "Run campaign on third party site" },
  //   { tid: 19, selected: false, text: "Optin forms" },
  // ];
  // OTO3 = [];
  isOTO1All = false;
  isOTO2All = false;
  isOTO3All = false;
  selected = new Set();
  state = {
    open: false,
  };
  openToolBox = () => {
    const { open } = this.state;
    this.setState({ open: !open }, () => {
      if (this.state.open) {
        document.addEventListener("click", this.onSelectionDone);
      }
    });
  };

  onSelectionDone = (e) => {
    let isInsideClick = false;
    e.path.forEach((ele) => {
      if (ele.className === "toolSelectorDropDown") isInsideClick = true;
    });
    if (!isInsideClick) {
      document.removeEventListener("click", this.onSelectionDone);
      this.setState({ open: false });
    }
  };

  onChange = (item) => {
    const { selected } = this;
    if (selected.has(item)) {
      selected.delete(item);
    } else {
      selected.add(item);
    }
    this.props.onChange(Array.from(selected));
    this.forceUpdate();
  };

  onlySetItem = (item, isAdd) => {
    const { selected } = this;
    if (!isAdd) {
      selected.delete(item);
    } else {
      selected.add(item);
    }
  };

  onFrontEndSelectAll = () => {
    this.isOTO1All = !this.isOTO1All;
    this.OTO1.forEach((e) => {
      e.selected = this.isOTO1All;
      this.onlySetItem(e.tid, this.isOTO1All);
    });
    this.props.onChange(Array.from(this.selected));
    this.forceUpdate();
  };
  onFrontEndSelect = (item, i, isTrue) => {
    this.OTO1[i]["selected"] = !isTrue;
    this.onChange(item);
  };
  onOTO2All = () => {
    this.isOTO2All = !this.isOTO2All;
    this.OTO2.forEach((e) => {
      e.selected = this.isOTO2All;
      this.onlySetItem(e.tid, this.isOTO2All);
    });
    this.props.onChange(Array.from(this.selected));
    this.forceUpdate();
  };
  onOTO2Select = (item, i, isTrue) => {
    this.OTO2[i]["selected"] = !isTrue;
    this.onChange(item);
  };
  onOTO3All = () => {
    this.isOTO3All = !this.isOTO3All;
    this.OTO3.forEach((e) => {
      e.selected = this.isOTO3All;
      this.onlySetItem(e.tid, this.isOTO3All);
    });
    this.props.onChange(Array.from(this.selected));
    this.forceUpdate();
  };
  onOTO3Select = (item, i, isTrue) => {
    this.OTO3[i]["selected"] = !isTrue;
    this.onChange(item);
  };
  render() {
    const { isOTO1All, isOTO2All, isOTO3All, selected } = this;
    const { open } = this.state;
    return (
      <div className="toolSelectorDropDown" name="ToolSelector">
        <ElementSelected selected={selected} elementClick={this.openToolBox} />
        {open ? (
          <div className="dropdown-menu mck_dropdown-menu">
            <div className={isOTO1All ? "dropdown-menu-title tool_menuItem_selected" : "dropdown-menu-title"} onClick={this.onFrontEndSelectAll}>
              Front End
            </div>
            {this.OTO1.map((e, i) => (
              <OptionItem key={i} index={i} text={e.text} selected={e.selected} tid={e.tid} onChange={this.onFrontEndSelect} />
            ))}
            {/* <div className={isOTO2All ? "dropdown-menu-title tool_menuItem_selected" : "dropdown-menu-title"} onClick={this.onOTO2All}>
              OTO2
            </div>
            {this.OTO2.map((e, i) => (
              <OptionItem key={i} index={i} text={e.text} selected={e.selected} tid={e.tid} onChange={this.onOTO2Select} />
            ))}
            <div className={isOTO3All ? "dropdown-menu-title tool_menuItem_selected" : "dropdown-menu-title"} onClick={this.onOTO3All}>
              OTO3
            </div> */}
          </div>
        ) : null}
      </div>
    );
  }
}

const OptionItem = (props) => {
  return (
    <div className={props.selected ? "tool_menuItem tool_menuItem_selected" : "tool_menuItem"} onClick={() => props.onChange(props.tid, props.index, props.selected)}>
      {props.text}
      <span>
        <i className="fa fa-check" />
      </span>
    </div>
  );
};

const ElementSelected = (props) => {
  const selected = props.selected ? Array.from(props.selected) : [];
  return (
    <button onFocus={props.elementClick} className="toolDropdownItem" style={{ width: "100%" }}>
      <div
        className="ant-select-selection
            ant-select-selection--multiple"
      >
        <ul>
          {selected.map((e, i) => (
            <InnerItem key={i} tid={e} />
          ))}
        </ul>
      </div>
    </button>
  );
};

const InnerItem = function (props) {
  return <li className="ant-select-selection__choice">{ToolUtil.getTool(props.tid)}</li>;
};
