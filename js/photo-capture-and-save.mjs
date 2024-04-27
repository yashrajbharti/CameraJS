export const capturePhoto = () => {
  const photoButton = document.querySelector(".capture-button");
  photoButton.addEventListener("click", () => {
    const isVideoMode = document.querySelector(
      ".switch-camera-video-photo-mode input[type='checkbox']"
    ).checked;
    if (isVideoMode) return;
    const facingModeButton = document.querySelector(
      ".switch-camera-facing-mode"
    );
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
  const scaleFactor = 2;
  canvas.width = video.videoWidth * scaleFactor;
  canvas.height = video.videoHeight * scaleFactor;
  if (isMirrored) {
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
  }
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  try {
    const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9);
    const link = document.createElement("a");
    link.href = imageDataUrl;
    link.download = `photo_${new Date().toUTCString()}.jpg`;
    link.click();
  } catch (error) {
    console.error("Error capturing photo:", error);
  }
};
