(document => {
  const burger = document.getElementsByClassName('navbar-burger')[0];
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-active');
  });
})(document);
