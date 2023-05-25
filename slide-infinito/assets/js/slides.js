'use strict'

const slideWrapper = document.querySelector('[data-slide="wrapper"]');
const slideList = document.querySelector('[data-slide="list"]');
const navPreviousButton = document.querySelector('[data-slide="nav-previous-button"]');
const navNextButton = document.querySelector('[data-slide="nav-next-button"]');
const controlsWrapper = document.querySelector('[data-slide="controls-wrapper"]');
const slideItems = document.querySelectorAll('[data-slide="item"]');
const controlsButtons = document.querySelectorAll('[data-slide="control-button"]');
let startPoint = 0;
let savedPosition = 0;
let currentPoint = 0;

function onMouseDown(event) {
  const slideItem = event.currentTarget;
  startPoint = event.clientX;
  currentPoint = startPoint - savedPosition;
  console.log('ponto de partida', startPoint)
  slideItem.addEventListener('mousemove', onMouseMove);
}

function onMouseMove(event) { 
  const movement = event.clientX - startPoint;
  const position = event.clientX - currentPoint;
  console.log('pixel do mousemove', event.clientX, '-', 'ponto de partida', startPoint, '=', movement)
  slideList.style.transform = 'translateX('+position+'px)'
  savedPosition = position;
}

function onMouseUp(event) {
  const slideItem = event.currentTarget;
  slideItem.removeEventListener('mousemove', onMouseMove);
}

slideItems.forEach((slideItem, index) => {
  slideItem.addEventListener('dragstart', function(event) {
    event.preventDefault();
  });

  slideItem.addEventListener('mousedown', onMouseDown)
  slideItem.addEventListener('mouseup', onMouseUp) 
})
