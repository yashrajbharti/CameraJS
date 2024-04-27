export const streamWebCamVideo = () => {
  const video = document.getElementById("stream");
  let isFrontCamera = true; // Variable to track camera direction
  const constraints = {
    video: {
      facingMode: isFrontCamera ? "user" : "environment", // Toggle between front and rear cameras
    },
  };
  window.navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      video.srcObject = stream;
      video.onloadedmetadata = (e) => {
        video.play();
      };
      isFrontCamera = !isFrontCamera;
    })
    .catch((e) => {
      console.error(e);
    });
};
