function addClickOnBurger() {
  const burger = document.getElementsByClassName('navbar-burger')[0];
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-active');
  });
}

function addResizeOnWindow(handler) {
  window.addEventListener('resize', handler);
}

function addTriangleAboveHeroImage() {
  const { clientWidth } = document.body;
  const image = document.getElementById('hero-image');
  const triangle = {
    height: clientWidth / 6,
    width: clientWidth
  };
  const sheet = document.styleSheets[0];
  sheet.insertRule(
    `.hero-image {
        border-bottom: ${triangle.height}px solid #363636;
        border-right: ${triangle.width}px solid transparent;
        height: 0;
        position: absolute;
        top: ${image.height - triangle.height}px;
        width: 0;
    }`,
    sheet.cssRules.length
  );
}

(() => {
  addClickOnBurger();
  addResizeOnWindow(addTriangleAboveHeroImage);
  addTriangleAboveHeroImage();
})();
