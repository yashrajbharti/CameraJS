import { streamWebCamVideo } from "./stream.mjs";

export const changeFacingMode = () => {
  const facingModeButton = document.querySelector(".switch-camera-facing-mode");
  facingModeButton.addEventListener("click", () => {
    facingModeButton.querySelector(".rotate").classList.add("rotating");
    streamWebCamVideo();
    setTimeout(() => {
      facingModeButton.querySelector(".rotate").classList.remove("rotating");
    }, 1500);
  });
};
