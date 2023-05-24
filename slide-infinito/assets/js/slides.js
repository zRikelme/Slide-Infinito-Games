'use strict'

const slideWrapper = document.querySelector('[data-slide="wrapper"]');
const slideList = document.querySelector('[data-slide="list"]');
const navPreviousButton = document.querySelector('[data-slide="nav-previous-button"]');
const navNextButton = document.querySelector('[data-slide="nav-next-button"]');
const controlsWrapper = document.querySelector('[data-slide="controls-wrapper"]');
const slideItems = document.querySelectorAll('[data-slide="item"]');
const controlsButtons = document.querySelectorAll('[data-slide="control-button"]');


function onMouseDown(event) {
  const slideItem = event.currentTarget;
  console.log(event.clientX)
  console.log('apertei o botao do mouse')
  slideItem.addEventListener('mousemove', onMouseMove);
}

function onMouseMove(event) { 
  const slideItem = event.currentTarget;
  console.log('movimentei o mouse em cima do elemento')
}

function onMouseUp(event) {
  const slideItem = event.currentTarget;
  slideItem.removeEventListener('mousemove', onMouseMove);
    console.log('soltei o botao do mouse')
}

slideItems.forEach((slideItem, index) => {
  slideItem.addEventListener('dragstart', function(event) {
    event.preventDefault();
  });

  slideItem.addEventListener('mousedown', onMouseDown)
  slideItem.addEventListener('mouseup', onMouseUp) 
})
