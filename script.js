const frameCount = 240; // total frames

const canvas = document.getElementById("frameCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* Generate frame path */
function getFrame(index) {
  return `frames/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;
}

const images = [];
let loadedImages = 0;

/* Preload images */
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = getFrame(i);

  img.onload = () => {
    loadedImages++;
    if (loadedImages === 1) {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  };

  images.push(img);
}

/* Smooth scroll animation */
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / maxScroll;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  const img = images[frameIndex];

  if (img) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
  }
});

/* Resize support */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
