import React, { useState } from "react";
import { Link } from "react-router-dom";
import introvideo from "../../assets/images/intro_video_bg.png";
import playicon from "../../assets/images/play_icon-big.png";
import Iframe from "react-iframe";


const Introvideo = () => {
  const [ytshow, setytshow] = useState(false);
  return (
    <div>
      <section className="row_am intro_video">
 
        <div className="container">

          <div className="yt_video">
            <div className="thumbnil">
              <img src={introvideo} alt="intro-img" />
              <Link
                to="#"
                className="popup-youtube play-button play_icon"
                data-url="#"
                data-toggle="modal"
                data-target="#myModal"
                title="CLICK to WATCH VIDEO"
              >
                <span className="play_btn">
                  <img
                    src={playicon}
                    alt="intro-img"
                    onClick={() => setytshow(true)}
                  />
                  <div className="waves-block">
                    <div className="waves wave-1" />
                    <div className="waves wave-2" />
                    <div className="waves wave-3" />
                  </div>
                </span>
                <span className="title_badge mb-1"> INTRO VIDEO </span>
                <span>The story and mission behind ourcompany. </span>
              </Link>
            </div>
          </div>
          {/* video section end */}
        </div>
        {/* container end */}
      </section>

      {ytshow && (
        <div
          className="modal fade youtube-video show"
          id="myModal"
          tabIndex={-1}
          style={{ display: "block", paddingRight: 17 }}
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <button
                id="close-video"
                type="button"
                className="button btn btn-default text-right"
                data-dismiss="modal"
              >
                <i
                  className="icofont-close-line-circled"
                  onClick={() => setytshow(false)}
                />
              </button>
              <div className="modal-body">
                <div id="video-container" className="video-container">
                  <Iframe
                    id="youtubevideo"
                    width={640}
                    height={360}
                    allowFullScreen=""
                    url="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  />
                </div>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Introvideo;
