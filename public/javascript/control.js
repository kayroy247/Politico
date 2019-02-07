const checkboxes = document.getElementsByName('check');
const onlyOne = (checkbox) => {
  checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false;
  });
};
