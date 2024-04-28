export const applyFilters = () => {
  let filterControls = document.querySelector(".filters");
  let checkbox = document.getElementById("filter-toggle");

  document.body.addEventListener("click", (e) => {
    if (checkbox.checked === true) checkbox.checked = false;
  });
  filterControls.addEventListener("click", (e) => {
    e.stopPropagation();
    if (checkbox.checked === false) {
      checkbox.checked = true;
    } else {
      if (e.target.hasAttribute("name")) {
        applyLensFilter(e.target.value);
        // checkbox.checked = false;  this was for the no cancel button approach
      }
    }
  });
};

const applyLensFilter = (value) => {
  const video = document.getElementById("stream");
  video.dataset.lens = value;
  document.querySelector(".filterLens")?.remove();
  const filterElement = document.createElement("div");
  filterElement.classList.add("filterLens");
  filterElement.style.position = "fixed";
  filterElement.style.top = "0";
  filterElement.style.left = "0";
  filterElement.style.width = "100%";
  filterElement.style.height = "calc(100vh - 220px)";
  filterElement.classList.add(value);
  document.body.appendChild(filterElement);
};

export const addFiltersToPhoto = (value, ctx, width, height) => {
  if (value === "gradient1") {
    ctx.globalCompositeOperation = "destination-out";
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "rgba(255, 192, 203, 0.6)");
    gradient.addColorStop(1, "rgba(0, 0, 255, 1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
};
