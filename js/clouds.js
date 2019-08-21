const CLOUDS = (function() {
  let stability = 33; // more about the condenseness of parts /  less drastic /  less weighted / goes down if higher than 75
  let temp = -33; // more drastic / weighted
  let moist = 33; // less drastic /  less weighted / goes down if higher than 75
  const parts = [];
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
  // let prevCloud =
  let topY = document.getElementById('init-cloud').getBoundingClientRect().top;
  let btmY =  document.getElementById('init-cloud').getBoundingClientRect().bottom;
  let rightX = document.getElementById('init-cloud').getBoundingClientRect().right;
  let leftX =  document.getElementById('init-cloud').getBoundingClientRect().left;
  let widthX = document.getElementById('init-cloud').getBoundingClientRect().width;
  let heightY =  document.getElementById('init-cloud').getBoundingClientRect().height;
  let xmain = 45;

  let xlow = 45;
  let xhigh = 45;
  let ylow = 0;
  let yhigh = 0;
console.log(`heightY:  ${heightY}`);
console.log(`widthX:  ${widthX}`);
  //console.log(`frame: ${frameY}`);
  const Part = {
    create: function() {
      const newPart = Object.create(this);
      newPart.x = rndmRng((xlow - 7), (xhigh + 7));

      if (newPart.x > xhigh) xhigh = newPart.x;
      if (newPart.x < xlow) xlow = newPart.x;
      // newPart.x = rndmRng((-100), (100));
      //(newPart.x >= 0) ? frameX += newPart.x: frameNegX += newPart.x;

      // calculating where 1st circle goes vertically
      //    newPart.y = rndmRng((cvs.height / 2), (cvs.height / 2) + temp - moist - stability );
      //  newPart.y = rndmRng((cvs.height / 2), (cvs.height / 2));
    //  newPart.y = rndmRng((heightY), (-heightY));
      newPart.y = rndmRng((ylow - 3), (yhigh + 3));
      if (newPart.y > yhigh) yhigh = newPart.y;
      if (newPart.y < ylow) ylow = newPart.y;
//(newPart.y >= midY) ? frameY += (heightY - newPart.x) : frameNegX += newPart.x;


  //console.log(`newPart.y CGK 1st CONDITIO- startY: ${startY} | newPart.y: ${newPart.y}`);

    //  (newPart.y >= startY) ? frameY += newPart.y : frameNegY += newPart.y;
      // (newPart.y >= startY) ? startY -= newPart.y : frameNegY += newPart.y;



      newPart.element = document.createElement('div');

    //  newPart.element.style.top = `${newPart.y}px`;
      //newPart.element.style.left = `${xPercent}%`;
      newPart.element.style.left = `${newPart.x}%`;
      newPart.element.style.marginTop = `${newPart.y}%`;
      //newPart.element.style.left = `${newPart.x}px`;
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
      cvs.element.appendChild(newPart.element);





      //console.log(`recheck width: ${frameX}`);

      //  frame = newPart.element.getBoundingClientRect().left;
      return newPart;
    },
    draw: function(c) {

    },
  };
  const partInit = (c) => requestAnimationFrame(() => c.draw(c));
  const rndmRng = (h, l) => Math.random() * (h - l) + l;
  // const rndmArrI = (a) => a[Math.floor(Math.random() * a.length)];

  /**   */
  function newPart() {
    while (parts.length < 100) {
      parts.push(Part.create());
      // count++;
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

  cvs.initialize();
  newPart();
})();
