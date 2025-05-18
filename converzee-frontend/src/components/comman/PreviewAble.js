import React from "react";
import { youtubeUrlParse, vimeoUrlParse, parseImgUrl } from "../Util";
import { getPath } from "../../actions/URLs";

export const ReponsiveImage = function (props) {
  if (props.isImg) {
    return <RepoImage url={props.url} />;
  }
  if (props.isVideo) {
    return <VideoRepo url={props.url} />;
  }
  if (props.isAs) {
    return <RepoImage isAs={true} url={props.url} />;
  }
  return <img src="https://d257yxqteot439.cloudfront.net/static/contains/box.png" className="img-fluid" alt="Responsive image" />;
};

const RepoImage = function (props) {
  if (props.isAs) {
    return (
      <center>
        <img src={window.rPath + getPath(props.url)} className="img-fluid" alt="Responsive image" />
      </center>
    );
  } else if (props.url && props.url != "") {
    return (
      <center>
        <img src={parseImgUrl(props.url)} className="img-fluid" alt="Responsive image" />
      </center>
    );
  } else {
    return (
      <center>
        <img src="https://d257yxqteot439.cloudfront.net/static/contains/box.png" className="img-fluid" alt="Responsive image" />
      </center>
    );
  }
};

const VideoRepo = function (props) {
  if (isUrlVideo(props.url)) {
    const url = props.url;
    if (url.indexOf("vimeo") !== -1) {
      return <iframe width="100%" height="100%" frameBorder="0" allowFullScreen src={"https://player.vimeo.com/video/" + vimeoUrlParse(props.url)} frameBorder="0" auto></iframe>;
    } else {
      return (
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          src={"https://www.youtube.com/embed/" + youtubeUrlParse(props.url) + ""}
          frameBorder="0"
          allowfullscreen
          auto
        ></iframe>
      );
    }
  }
  return <img src="https://d257yxqteot439.cloudfront.net/static/contains/box.png" className="img-fluid" alt="Responsive image" />;
};

function isUrlVideo(url) {
  if (url.indexOf("youtube") !== -1 || url.indexOf("youtu") !== -1 || url.indexOf("vimeo") !== -1) {
    return true;
  }
  return false;
}
