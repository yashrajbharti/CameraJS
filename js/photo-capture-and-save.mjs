export const capturePhoto = () => {
  const photoButton = document.querySelector(".capture-button");
  photoButton.addEventListener("click", () => {
    const isVideoMode = document.querySelector(
      ".switch-camera-video-photo-mode input[type='checkbox']"
    ).checked;
    if (isVideoMode) return;
    photoButton.classList.add("click");
    setTimeout(() => {
      photoButton.classList.remove("click");
    }, 200);
  });
};
