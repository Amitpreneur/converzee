import React, { Component } from "react";
// import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import "./Emoji.css";
export default class Emoji extends Component {
  emojisList = [
    "🔥",
    "💥",
    "😃",
    "🏵️",
    "💕",
    "❤️",
    "🎊",
    "🎉",
    "🏷️",
    "🧨",
    "💎",
    "📆",
    "🛎️",
    "🔔",
    "💍",
    "🚩",
    "☀️",
    "⌚",
    "👫",
    "🤞",
    "✨",
    "🌟",
    "🛑",
    "😈",
    "😇",
    "😎",
    "😄",
    "🚀",
    "💯",
    "💥",
    "✈️",
    "💲",
    "🤑",
    "💱",
    "📈",
    "💵"
  ];
  onDoubleClick = emojiObject => {
    this.props.onSelectionDone(emojiObject);
  };

  renderEmojiIcon = (icon, index) => {
    return (
      <div key={index+1}  className="col emoji-div" onDoubleClick={() => this.onDoubleClick(icon)}>
        {icon}
      </div>
    );
  };

  render() {
    return (
      <div>
        <div className="row emoji-main-div">{this.emojisList.map(this.renderEmojiIcon)}</div>
        {/* <Picker onEmojiClick={this.onDoubleClick} skinTone={SKIN_TONE_MEDIUM_DARK} /> */}
      </div>
    );
  }
}
