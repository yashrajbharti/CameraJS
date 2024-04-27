export let mediaRecorder = null;
let chunks = [];
let startTime = null;
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
    recordVideo(isMirrored, facingModeButton);
  });
};

const recordVideo = async (isMirrored = false, facingModeButton) => {
  const video = document.getElementById("stream");
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    clearInterval(timerInterval);
    return;
  }
  try {
    mediaRecorder = new MediaRecorder(video.srcObject);
    startTime = Date.now(); // Start time for elapsed time calculation
    mediaRecorder.start();
    mediaRecorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    // Start recording indicator
    recordingIndicator.textContent = "00:00:00";
    recordingIndicator.classList.add("record");
    document.body.appendChild(recordingIndicator);

    // Update recording indicator at regular intervals
    const timerInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      recordingIndicator.textContent = formatTime(elapsedTime);
    }, 1000);

    mediaRecorder.onstop = () => {
      saveRecordedVideo();
      clearInterval(timerInterval);
    };

    const toggle = document.querySelector(
      ".switch-camera-video-photo-mode input[type='checkbox']"
    );
    toggle.addEventListener("change", () => {
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        clearInterval(timerInterval);
      }
    });

    facingModeButton.addEventListener("click", () => {
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        clearInterval(timerInterval);
      }
    });
  } catch (e) {
    console.error(e);
  }
};

const saveRecordedVideo = () => {
  recordingIndicator.remove();
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

// Helper function to format time in HH:mm:ss format
const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

// Helper function to pad single digit numbers with leading zero
const pad = (num) => {
  return num.toString().padStart(2, "0");
};
