const animate = ({ timing, draw, duration }) => {
  const start = performance.now();

  const callback = (time) => {
    let timeFraction = (time - start) / duration;

    if (timeFraction > 1) {
      timeFraction = 1;
    }

    const progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(callback);
    }
  };

  requestAnimationFrame(callback);
};

// TODO: Expand to the scroll down fuctionality
export const scrollUpTo = (element, duration = 1000, padding = 80) => {
  const finishPosition = document.querySelector(element);

  if (!finishPosition) {
    return;
  }

  const { top } = finishPosition.getBoundingClientRect();
  const { pageYOffset } = window;

  const draw = (progress) => {
    if (window.pageYOffset > pageYOffset + top - padding) {
      window.scrollTo(0, pageYOffset - pageYOffset * progress);
    }
  };

  animate({
    draw,
    duration,
    timing: (timeFraction) => timeFraction,
  });
};
