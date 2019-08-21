let CLOUDS = (function() {
  let stability = 8;
  let temp = 5;
  let moisture = 2;
  console.log(`${stability} | ${temp} | ${stability}`);
  //  let stability = 33; // more about the condenseness of parts /  less drastic /  less weighted / goes down if higher than 75
  //  let temp = -33; // more drastic / weighted
  //  let moist = 33; // less drastic /  less weighted / goes down if higher than 75
  let parts = [];
  const cvs = {
    element: document.getElementById('clouds'),
    initialize: function() {
      this.width = window.innerWidth;
      this.height = 450;
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `450px`;
      document.body.appendChild(this.element);
    },
  };

  let xlow = 45;
  let xhigh = 45;
  let ylow = 0 - temp;
  let yhigh = 0 - temp;

  let Part = {
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

      /*
            jQuery(newPart.element).css({
              width: `${newPart.radius}px`,
              height: `${newPart.radius}px`,
              backgroundColor: `hsl(${newPart.color},100%, ${newPart.light}%)`,
              left: `${newPart.x}px`,
              top: `${newPart.y}px`,
            });
            */

      newPart.element.classList.add('particle');
      newPart.element.classList.add('remove');
      cvs.element.appendChild(newPart.element);

      return newPart;
    },
  };
  const rndmRng = (h, l) => Math.random() * (h - l) + l;

  /**   */
  function newPart() {
    while (parts.length < 100) {
      parts.push(Part.create());
    }
    darken();
  }

  function darken() {
    elements = document.getElementsByClassName('particle');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor=`rgba(111,111,111,0.${moisture})`;
    }
}
  /*
    let timeout = false;
    window.addEventListener('resize', function() {
      clearTimeout(timeout);
      timeout = setTimeout(doneResizing, 800);
    });

    function doneResizing() {
      circles = [];
      count = 0;
      const selectTag = document.getElementsByClassName('circle');
      while (selectTag[0]) {
        selectTag[0].parentNode.removeChild(selectTag[0]);
      }
      cvs.initialize();
      newPartle();
    }
    */

  const removeElements = (elms) => elms.forEach(el => el.remove());

  document.getElementById('generate').addEventListener('click', function(e) {
    e.preventDefault();
    parts = [];
    xlow = 45;
    xhigh = 45;
    ylow = 0 - temp;
    yhigh = 0 - temp;
    removeElements( document.querySelectorAll('.remove'));
    stability = Math.abs(document.getElementById('stable').value - 15);
    temp = Math.abs(document.getElementById('temp').value - 10);
    moisture = document.getElementById('moisture').value;
console.log(`${stability} | ${temp} | ${stability}`);
    cvs.initialize();
    newPart();
  });

  cvs.initialize();
  newPart();

})();
