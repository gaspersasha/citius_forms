export const preventBodyScroll = (condition) => {
  const html = document.querySelector('html');

  if (condition) {
    html.classList.add('prevent-scrolling');
  } else {
    html.classList.remove('prevent-scrolling');
  }
};
