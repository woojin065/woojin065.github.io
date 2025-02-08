document.addEventListener('DOMContentLoaded', function () {
  let elements = document.querySelectorAll('.popup.img-link.preview-img');
  elements.forEach((el) => {
    el.style.display = 'none';
  });
});
