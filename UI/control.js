function onlyOne(checkbox) {
    const checkboxes = document.getElementsByName('check');
    checkboxes.forEach((item) => {
        if (item != checkbox) item.checked = false;

    });
}