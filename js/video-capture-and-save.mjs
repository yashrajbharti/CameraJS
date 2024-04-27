export let mediaRecorder = null;
let chunks = [];
let isRecording = false;
const recordingIndicator = document.createElement("div");

export const captureVideo = () => {
  const videoButton = document.querySelector(".capture-button");
  videoButton.addEventListener("click", () => {
    const isVideoMode = document.querySelector(
      ".switch-camera-video-photo-mode input[type='checkbox']"
    ).checked;
    if (!isVideoMode) return;
    const facingModeButton = document.querySelector(
      ".switch-camera-facing-mode"
    );
    const isMirrored = facingModeButton.dataset.facingMode === "front";
    recordVideo(isMirrored);
  });
};

const recordVideo = async (isMirrored) => {
  const video = document.getElementById("stream");
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    return;
  }
  try {
    mediaRecorder = new MediaRecorder(video.srcObject);
    mediaRecorder.start();
    mediaRecorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };
    recordingIndicator.textContent = "Recording... Click to stop";
    recordingIndicator.style.position = "fixed";
    recordingIndicator.style.top = "10px";
    recordingIndicator.style.left = "10px";
    recordingIndicator.style.backgroundColor = "red";
    recordingIndicator.style.color = "white";
    recordingIndicator.style.padding = "5px";
    recordingIndicator.style.zIndex = "1";
    isRecording = true;
    document.body.appendChild(recordingIndicator);

    mediaRecorder.onstop = () => {
      saveRecordedVideo();
    };

    const toggle = document.querySelector(
      ".switch-camera-video-photo-mode input[type='checkbox']"
    );
    toggle.addEventListener("change", () => {
      if (mediaRecorder && mediaRecorder.state === "recording")
        mediaRecorder.stop();
    });
  } catch (e) {
    console.error(e);
  }
};

const saveRecordedVideo = () => {
  recordingIndicator.remove();
  isRecording = false;
  if (!chunks.length) {
    console.error("No recorded video data available.");
    return;
  }
  const blob = new Blob(chunks, { type: "video/mp4" });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "");
  const filename = `video_${timestamp}.mp4`;
  const videoUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = videoUrl;
  link.download = filename;
  link.click();
  chunks = [];
};
