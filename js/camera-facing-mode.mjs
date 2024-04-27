export const changeFacingMode = () => {
  const facingModeButton = document.querySelector(".switch-camera-facing-mode");
  facingModeButton.addEventListener("click", () => {
    facingModeButton.querySelector(".rotate").classList.add("rotating");
    toggleCamera();
    setTimeout(() => {
      facingModeButton.querySelector(".rotate").classList.remove("rotating");
    }, 3000);
  });
};

export const toggleCamera = async () => {
  const video = document.getElementById("stream");
  let isFrontCamera = true; // Variable to track camera direction

  const constraints = {
    video: {
      facingMode: isFrontCamera ? "user" : "environment", // Toggle between front and rear cameras
    },
  };

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    video.onloadedmetadata = (e) => {
      video.play();
    };
    isFrontCamera = !isFrontCamera; // Toggle camera direction
  } catch (error) {
    console.error("Error accessing camera:", error);
  }
};
