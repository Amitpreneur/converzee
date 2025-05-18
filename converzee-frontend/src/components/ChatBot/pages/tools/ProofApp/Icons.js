import React, { Component } from "react";
/* import Util from "../../../Util";
import Switch1 from "../../../comman/Switch"; */
import { getPath } from "../../../../actions/URLs";
export default class Icons extends Component {
  state = {
    icons : [
      {
        image : "/asset/play_icon.gif"
      },
      {
        image : "/asset/play_icon2.gif"
      },
      {
        image : "/asset/play_icon3.gif"
      },
      {
        image : "/asset/play_icon4.gif"
      },
      {
        image : "/asset/play_icon5.gif"
      },
    ],
    selectedIcon: 0
  } 

  selectIcon = (e, index) => {
    const { icons } = this.state;

    let getElem = document.getElementsByClassName("play_icons");
    icons.map((el, i) => {
      if(i === index) {
        getElem[i].childNodes[0].classList.add("Icon-awesome-check-circle");
        this.setState({selectedIcon : el.image})
        this.props.onChange(3, el.image)
      } else {
        getElem[i].childNodes[0].classList.remove("Icon-awesome-check-circle")
      }
    });
  }
 
  render() {
    const { icons, selectedIcon } = this.state;
    return (
      <div className="video_icons_list">
        <h1>Video Play Icons</h1>
        <ul>
        {/* <li><div class="play_icons"><span class="Icon-awesome-check-circle"><i class="fa fa-check-circle"></i></span><img src="/asset/play_icon.gif"/></div></li> */}
          {icons.map((icon, index) => {
            return <li key={index} onClick={(e) => this.selectIcon(e, index)}><div class="play_icons" data-label={index}><span class={selectedIcon === index ? "Icon-awesome-check-circle":""}><i class="fa fa-check-circle"></i></span><img src={getPath(icon.image)}/></div></li>
          })}
        </ul>
      </div>
    );
  }
}
// Icon-awesome-check-circle