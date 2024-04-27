export const streamWebCamVideo = () => {
  const video = document.getElementById("stream");
  window.navigator.mediaDevices
    .getUserMedia({ video: true })
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
