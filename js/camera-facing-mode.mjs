import { streamWebCamVideo } from "./stream.mjs";

export const changeFacingMode = () => {
  let isFrontCamera = false;
  const facingModeButton = document.querySelector(".switch-camera-facing-mode");
  facingModeButton.addEventListener("click", () => {
    facingModeButton.querySelector(".rotate").classList.add("rotating");
    streamWebCamVideo(isFrontCamera);
    isFrontCamera != isFrontCamera;
    setTimeout(() => {
      facingModeButton.querySelector(".rotate").classList.remove("rotating");
    }, 1500);
  });
};
