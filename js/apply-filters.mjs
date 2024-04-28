export const applyFilters = () => {
  let filterControls = document.querySelector(".filters");
  let checkbox = document.getElementById("filter-toggle");
  document.body.addEventListener("click", (e) => {
    if (checkbox.checked === true) checkbox.checked = false;
  });
  filterControls.addEventListener("click", (e) => {
    e.stopPropagation();
    if (checkbox.checked === false) checkbox.checked = true;
  });
};
