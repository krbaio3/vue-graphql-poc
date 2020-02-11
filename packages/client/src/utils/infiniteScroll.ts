window.onscroll = () => {
  // eslint-disable-next-line max-len
  const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
  if (bottomOfWindow) {
    // Do something, anything!
    console.log('entra');
  }
};
