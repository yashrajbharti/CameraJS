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
    drawOnCanvasAndSavePhoto(facingModeButton.dataset.facingMode === "front");
  });
};

const drawOnCanvasAndSavePhoto = async (isMirrored = false) => {
  const video = document.getElementById("stream");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.translate(canvas.width, 0);
  if (isMirrored) {
    context.scale(-1, 1);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  }
  try {
    const imageDataUrl = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = imageDataUrl;
    link.download = `photo_${new Date().toUTCString()}.jpg`;
    link.click();
  } catch (error) {
    console.error("Error capturing photo:", error);
  }
};
