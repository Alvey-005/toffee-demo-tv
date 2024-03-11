import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { DataContext } from "../../providers/DataProvider";
import { formatTime, getTimePercentage } from "../../lib/helper";
const Video = () => {
  const { data, setData } = DataContext();
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [icon, setIcon] = useState("");
  const [showBar, setShowBar] = useState(false);

  const showIcon = (iconUrl) => {
    setIcon(iconUrl);
    setShowBar(true);
    setTimeout(() => {
      setIcon("");
      setShowBar(false);
    }, 300);
  };
  let player;
  useEffect(() => {
    player = videojs("player", {
      controls: false,
      autoplay: true,
      responsive: true,
    });

    player.src({
      fluid: true,
      src: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      type: "application/x-mpegURL",
    });
    player.on("timeupdate", function () {
      setCurrentTime(player.currentTime());
    });
    player.on("loadedmetadata", function () {
      const videoDuration = player.duration();
      setDuration(videoDuration);
    });
    player.on("useractive", function () {
      setShowBar(true);
    });
    player.on("userinactive", function () {
      setShowBar(false);
    });
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          showIcon("./svg/backward.svg");
          player.currentTime(player.currentTime() - 10);
          break;
        case "ArrowRight":
          showIcon("./svg/forward.svg");
          player.currentTime(player.currentTime() + 10);
          break;
        case "ArrowUp":
          showIcon("./svg/volume-up.svg");
          player.volume(player.volume() + 0.1);
          break;
        case "ArrowDown":
          showIcon("./svg/volume-down.svg");
          player.volume(player.volume() - 0.1);
          break;
        case "Escape":
          setData({ ...data, location: "movie" });
          player.dispose();
          break;
        case "Enter":
          if (!player.paused()) {
            setShowBar(true);
            setIcon("./svg/pause.svg");
            player.pause();
          } else {
            showIcon("./svg/play.svg");
            player.play();
          }
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div>
      <video
        ref={videoPlayer}
        id="player"
        style={{
          width: "100%",
          height: window.innerHeight,
        }}
        className="video-js vjs-big-play-centered"
      />
      {true && (
        <div className="progress absolute bottom-0 flex w-full items-center p-16">
          <div id="time" className="px-4 py-0 text-2xl text-white">
            {formatTime(currentTime)}
          </div>
          <div className="bar h-6 w-full overflow-hidden rounded-[50px] bg-[rgba(255,255,255,0.4)]">
            <div
              id="played"
              className={`relative  h-6 max-w-full bg-white`}
              style={{
                width: getTimePercentage(currentTime, duration) + "%",
              }}
            ></div>
          </div>
          <div id="total" className="px-4 py-0 text-2xl text-white">
            {formatTime(duration - currentTime)}
          </div>
        </div>
      )}
      <div
        id="osd-icon"
        className="icon-status opacity-1 absolute inset-0 m-auto h-[10vw] w-[8vw]"
      >
        <div className="icon h-[10vw] w-[8vw]">
          <img src={icon} />
        </div>
      </div>
    </div>
  );
};

export default Video;
