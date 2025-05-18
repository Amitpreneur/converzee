import React, { Component } from "react";
import UrlInput from "../comman/UrlInput";
import { SideButton } from "../layout/ToolLayout";

export default class Text extends Component {
  state = {
    text: this.props.text,
    noThanks: this.props.noThanks,
    subTitle: this.props.subTitle,
    templateIndex: this.props.selected,
    items : this.props.items,
    showItems : []
  };

  componentDidMount() {
    this.addShowListItemsList();
  }

  onChange = (e) => {
    let value = e.target.value;
    this.setState({ text: value }, () => {
      this.props.onChange({ text: this.state.text });
    });
  };

  onChange1 = (e) => {
    let value = e.target.value;
    this.setState({ subTitle: value }, () => {
      this.props.onChange({ subTitle: this.state.subTitle });
    });
  };
  onChange2 = (e) => {
    let value = e.target.value;
    this.setState({ noThanks: value }, () => {
      this.props.onChange({ noThanks: this.state.noThanks });
    });
  };

  onTextChange = (value, index, field) => {
    let { items } = this.state;
    items[index][field] = value;
    this.setState({ items });
    this.props.onChange({ items });
  };

  addShowListItemsList = () => {
    const { templateIndex } = this.state;
    let index;
    if( templateIndex === 0 || templateIndex === 1 || templateIndex === 12 ) {
      index = [1, 12, 7, 3, 2];
      this.setState({ showItems: index})
    } else if( templateIndex === 2 || templateIndex === 3 || templateIndex === 11 ) {
      index = [7, 12, 11, 10, 5, 6];
      this.setState({ showItems: index})
    } else if( templateIndex === 4 || templateIndex === 6 ) {
      index = [12, 2, 3, 4, 7, 6];
      this.setState({ showItems: index})
    } else if( templateIndex === 5 || templateIndex === 9 || templateIndex === 10 ) {
      index = [4, 12, 11, 10, 7, 8, 3];
      this.setState({ showItems: index})
    } else if( templateIndex === 7 || templateIndex === 8 || templateIndex === 13 ) {
      index = [12, 7, 9, 2, 1];
      this.setState({ showItems: index})
    } else if( templateIndex === 14 ) {
      index = [2, 3, 4, 7, 6];
      this.setState({ showItems: index})
    } else if( templateIndex === 15 || templateIndex === 16) {
      index = [7, 1, 8, 12, 5];
      this.setState({ showItems: index})
    }
  }

  renderList = (item, index) => {
    const { showItems } = this.state;
    return (
      showItems.length ? showItems.map(el => { 
        return (el === item.index ?
        <div className="col-6" key={index}>
          <div className="cz_dynamic_element_box">
            <div className="form-element">
              <div className="label-text">{item.text} 
                <span class="sidebar-img">
                  <i class={item.icon}></i>
                </span>
              </div>
              <UrlInput type="text" isTab={false} className="form-control" onChange={(e) => this.onTextChange(e.target.value, index, "link")} value={item.link} />
            </div>
          </div>
        </div> : null )
      }) : null 
    )
  };

  render() {
    const { text, subTitle, noThanks, templateIndex, items } = this.state;
    return ( this.props.layout === 4 ? 
      <div className="row">{items.map(this.renderList)}</div>
      :
      <div>
        <div className="form-element">
          <div className="label-text">Text*</div>
          <input className="form-control" type="text" name="text" value={text} onChange={this.onChange} />
        </div>
          <React.Fragment>
          {(this.props.layout === 0 && templateIndex !== 2) || (this.props.layout === 1 && templateIndex !== 2) || this.props.layout === 2 || this.props.layout === 6 || this.props.layout === 5 || this.props.layout === 7 ? 
            <div className="form-element">
              <div className="label-text">Sub Title*</div>
              <input className="form-control" type="text" value={subTitle} name="subTitle" onChange={this.onChange1} />
            </div> : null
          }
          {(this.props.layout === 2 && (templateIndex === 7 || templateIndex === 8 || templateIndex === 9)) || (this.props.layout === 1 && templateIndex === 2) ?
            <div className="form-element">
              <div className="label-text">No Thanks*</div>
              <input className="form-control" type="text" value={noThanks} name="noThanks" onChange={this.onChange2} />
            </div> : null
          }
        </React.Fragment>
      </div>
    );
  }
}
