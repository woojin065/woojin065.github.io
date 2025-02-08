const observer = new MutationObserver(() => {
  let elements = document.querySelectorAll('.popup.img-link.preview-img');
  elements.forEach((el) => {
    el.style.display = 'none';
  });
});

observer.observe(document.body, { childList: true, subtree: true });
