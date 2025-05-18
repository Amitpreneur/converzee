import React, { Component } from "react";
import Uploader from "../../../comman/Uploader";
import { parseImgUrl } from "../../../Util";
import Emoji from "../../../comman/Emoji";
import Switch1 from "../../../comman/Switch";
import { Info } from "../../../comman/Info";
export default class Favicon extends Component {
  state = { FAVICON: this.props.FAVICON, isImage: this.props.isImage, emoji: this.props.emoji, showEmojiSelecter: false };
  componentWillUnmount() {
    const { FAVICON, isImage, emoji } = this.state;
    this.props.onChange({ isImage, emoji, FAVICON });
  }
  onUploadDone = (FAVICONICON) => {
    this.setState({ FAVICON: FAVICONICON.image }, () => {
      const { FAVICON, isImage, emoji } = this.state;
      this.props.onChange({ isImage, emoji, FAVICON });
    });
  };
  onEmojiSelect = (emoji) => {
    this.setState({ emoji: emoji }, () => {
      const { FAVICON, isImage, emoji } = this.state;
      this.props.onChange({ isImage, emoji, FAVICON });
    });
  };
  render() {
    const props = {
      onUploadDone: this.onUploadDone,
    };
    const { FAVICON, emoji, isImage } = this.state;
    return (
      <div>
        <div className="row">
          <div
            className="col-5"
            style={{ textAlign: "end" }}
            onClick={() => {
              this.setState({ isImage: true });
            }}
          >
            <Info text="Select Image to upload as a favicon" />
            <div className="favicon-preview-main cz_fav_preview_box">
                <div className="favicon-preview">
                  {isImage ? (
                    <div>
                      {FAVICON && FAVICON !== null ? (
                        <div className="cz_fav_image">
                          <img className="preview-image" src={parseImgUrl(FAVICON)} />
                        </div>
                      ) : null} 
                    </div>
                  ) : (
                    <div className="cz_fav_emoji">
                      {emoji}
                    </div>
                  )}
                </div>
            </div>
            <div>
              <div className="uploadMain cz_uploader">
                <Uploader {...props} />
              </div>
            </div>
          </div>
          <div className="col-1 cz_or_bar">
            <div className="span-hr" />
            <div>OR</div>
            <div className="span-hr" />
          </div>
          <div
            className="col-5"
            onClick={() => {
              this.setState({ isImage: false });
            }}
          >
            <div className="cz_tab_emoji_box">
              <Emoji onSelectionDone={this.onEmojiSelect} />
            </div>
          </div>
          <Info text="Double click on Icon to select Emoji" />
        </div>
      </div>
    );
  }
}
