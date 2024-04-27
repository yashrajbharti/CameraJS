export const streamWebCamVideo = (isFrontCamera = true) => {
  const video = document.getElementById("stream");
  const constraints = {
    video: {
      facingMode: isFrontCamera ? "user" : "environment", // Toggle between front and rear cameras
    },
  };
  isFrontCamera && video.classList.add("flip");
  !isFrontCamera && video.classList.remove("flip");
  window.navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      video.srcObject = stream;
      video.onloadedmetadata = (e) => {
        video.play();
      };
    })
    .catch((e) => {
      console.error(e);
    });
};
