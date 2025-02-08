const observer = new MutationObserver(() => {
  console.log('MutationObserver 감지됨!'); // ✅ 실행 여부 확인
  let elements = document.querySelectorAll('.popup.img-link.preview-img');
  elements.forEach((el) => {
    el.style.setProperty('display', 'none', 'important');
  });
});

observer.observe(document.body, { childList: true, subtree: true });
