let CLOUDS = (function() {
  let stability = 8;
  let temp = 5;
  let moisture = 3;
  let parts = [];

  const cvs = {
    element: document.getElementById('clouds'),
    initialize: function() {
      this.width = window.innerWidth;
      this.height = 250;
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `250px`;
      document.body.appendChild(this.element);
    },
  };

  let xlow = 45;
  let xhigh = 45;
  let ylow = 0 - temp;
  let yhigh = 0 - temp;

  const Part = {
    create: function() {
      const newPart = Object.create(this);

      newPart.x = rndmRng((xlow - stability), (xhigh + stability));
      if (newPart.x > xhigh) xhigh = newPart.x;
      if (newPart.x < xlow) xlow = newPart.x;

      newPart.y = rndmRng((ylow - 2.6 + (stability * .1)), (yhigh + 2.6 + (stability * .1)));
      if (newPart.y > yhigh) yhigh = newPart.y;
      if (newPart.y < ylow) ylow = newPart.y;

      newPart.element = document.createElement('div');

      newPart.element.style.left = `${newPart.x}%`;
      newPart.element.style.marginTop = `${newPart.y}%`;

      newPart.element.classList.add('particle');
      newPart.element.classList.add('remove');
      cvs.element.appendChild(newPart.element);

      return newPart;
    },
  };
  const rndmRng = (h, l) => Math.random() * (h - l) + l;

  /**  create particle  */
  function newPart() {
    while (parts.length < 100) {
      parts.push(Part.create());
    }
    darken();
  }

  /**  assign background to particles  */
  function darken() {
    const elements = document.getElementsByClassName('particle');
    for (let i = 0; i < elements.length; i++) {
      let light = Math.round(255 / (moisture / 2));
      light = rndmRng((light), (light - 50));
      elements[i].style.backgroundColor = `rgba(${light},${light},${light},0.${moisture})`;
    }
  }

  const removeElements = (elms) => elms.forEach((el) => el.remove());

  document.getElementById('generate').addEventListener('click', function(e) {
    e.preventDefault();
    parts = [];
    xlow = 45;
    xhigh = 45;
    ylow = 0 - temp;
    yhigh = 0 - temp;
    removeElements(document.querySelectorAll('.remove'));
    stability = Math.abs(document.getElementById('stable').value - 15);
    temp = Math.abs(document.getElementById('temp').value - 10);
    moisture = document.getElementById('moisture').value;
    cvs.initialize();
    newPart();
  });

  cvs.initialize();
  newPart();
})();
