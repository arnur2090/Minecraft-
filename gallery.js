document.querySelectorAll('.gallery-img').forEach(img => {
  img.addEventListener('click', () => {
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox').style.display = 'flex';
  });
});

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}
