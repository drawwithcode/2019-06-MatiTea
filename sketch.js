const container = document.getElementById('container')

// dogActive = false when popup appears
let dogActive = true;


// desktop background
const configDesktop = function(p) {
  let cane;

  p.setup = function () {
    cane = p.select('.cane')
  }

  p.draw = function() {
    if (dogActive == true) {
      let y = p.map(p.mouseY, 0, p.height, (p.height / 3) * 2, p.height);
      cane.position(p.windowWidth - p.windowWidth / 3, y + (p.height));
    }
  }
}

const desktop = new p5(configDesktop);


// popup function constructor
function Popup(_width, _height, _x, _y, _title, _text) {
  const _this = this;

  this.x = _x;
  this.y = _y;
  this.width = _width;
  this.height = _height;

  let popup;
  let nav;
  let body;
  let bodyParagraph;
  let bodyButton;
  let soundError;

  let changePositionTimeout;
  
  let config = function(p) {
    p.preload = function() {
      soundError = p.loadSound('assets/error.mp3');
    }

    p.setup = function() {
      soundError.play();

      // create popup container
      popup = p.createDiv();
      popup.addClass("popup");
      popup.position(_this.x, _this.y);

      // create popup nav
      nav = p.createDiv(_title);
      nav.addClass("nav");
      nav.parent(popup);

      // create popup body
      body = p.createDiv();
      body.addClass("body");
      body.parent(popup);
      body.mouseOver(function() {
        clearTimeout(changePositionTimeout);

        changePositionTimeout = setTimeout(function() {
          popup.position(p.random() * (p.windowWidth - _this.width), p.random() * (p.windowHeight - _this.height));
        }, 200);
      })
      
      // create body paragraph
      bodyParagraph = p.createElement('p', _text);
      bodyParagraph.parent(body);

      // create popup button
      bodyButton = p.createButton('Clicca qui');
      bodyButton.parent(body);
      bodyButton.mousePressed(function() {
        // hide popup
        popup.addClass("hidden");

        window.open("https://www.youtube.com/watch?v=OnM-qnpZTgU", "_blank");

        dogActive = true;

        clearTimeout(changePositionTimeout);

        // show popup again after 2/4 sec
        setTimeout(function() {
          soundError.play();

          popup.position(p.random() * (p.windowWidth - _this.width), p.random() * (p.windowHeight - _this.height));
          popup.removeClass("hidden");
          
          dogActive = false;
        }, 2000 + (3 * p.random() * 1000));
      })

      dogActive = false;
    }
  }

  new p5(config);
}

// show popup after 5 sec
setTimeout(function() {
  new Popup(420, 263, 50, 50, 'Metodo testato funzionante al 100%', 'SCOPRI COME FARE 1000 EURO AL GIORNO SU INTERNET');
}, 5000);
