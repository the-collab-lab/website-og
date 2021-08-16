function init() {
  const canvas = document.querySelector('figure canvas');
  document.querySelector('button').addEventListener('click', (evt) => {
    const cannon = confetti.create(canvas, {
      disableForReducedMotion: true,
      resize: true,
    });
    cannon({
      angle: 45,
      origin: {
        x: 0,
      },
    });
  });
}
document.addEventListener('DOMContentLoaded', init);
