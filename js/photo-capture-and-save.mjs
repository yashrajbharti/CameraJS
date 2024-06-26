import { addFiltersToPhoto } from "./apply-filters.mjs";

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
    }, 500);
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
  // Check for filters
  if (video.dataset.lens === "monochrome") context.filter = "grayscale(1)";
  if (video.dataset.lens.startsWith("gradient"))
    context.filter = "saturate(0.1)";

  const flashElement = document.createElement("div");
  flashElement.style.position = "fixed";
  flashElement.style.top = "0";
  flashElement.style.left = "0";
  flashElement.style.width = "100%";
  flashElement.style.height = "calc(100vh - 220px)";
  flashElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  document.body.appendChild(flashElement);
  setTimeout(() => {
    flashElement.remove();
  }, 200);
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Apply gradient filters
  addFiltersToPhoto(video.dataset.lens, context, canvas.width, canvas.height);

  try {
    const imageDataUrl = canvas.toDataURL("image/png", 0.9);
    const link = document.createElement("a");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "");
    link.href = imageDataUrl;
    link.download = `photo_${timestamp}.png`;
    link.click();
  } catch (error) {
    console.error("Error capturing photo:", error);
  }
};
