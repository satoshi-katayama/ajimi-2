window.onload = function () {
  document.querySelector('.add').addEventListener('click', clickHandler, false);
};

function clickHandler(e) {
  var img = document.createElement('a-collada-model');
  img.setAttribute('position', getRand() + ' 0  -10');
  img.setAttribute('src', '#legoman');
  img.setAttribute('rotation', '0 -90 0');
  img.setAttribute('scale', '1 1 1');
  img.addEventListener('click', clickHandler, false);

  var scene = document.querySelector('a-scene');
  scene.appendChild(img);
}

function getRand() {
  var max = 20;
  var min = -20;
  return ( Math.random() * ( ( max + 1 ) - min ) ) + min;
}
