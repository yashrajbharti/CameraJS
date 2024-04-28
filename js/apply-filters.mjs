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

const applyLensFilter = (value) => {};
