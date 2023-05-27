'use strict'

const slideWrapper = document.querySelector('[data-slide="wrapper"]');
const slideList = document.querySelector('[data-slide="list"]');
const navPreviousButton = document.querySelector('[data-slide="nav-previous-button"]');
const navNextButton = document.querySelector('[data-slide="nav-next-button"]');
const controlsWrapper = document.querySelector('[data-slide="controls-wrapper"]');
const slideItems = document.querySelectorAll('[data-slide="item"]');

const state = {
   startPoint: 0,
   savedPosition: 0,
   currentPoint: 0,
   movement: 0,
   currentSlideIndex: 0,
}

function translateSlide(position) {
  state.savedPosition = position;
  slideList.style.transform = `translateX(${position}px)`
}

function getCenterPosition({ index }) {
  const slideItem = slideItems[index]
  const slideWidth = slideItem.clientWidth
  const windowWidth = document.body.clientWidth
  const margin = (windowWidth - slideWidth) / 2
  const position = margin - (index * slideWidth)
  return position
}

function setVisibleSlide({ index }) {
  const position = getCenterPosition({ index })
  state.currentSlideIndex = index
  translateSlide(position)
}

function nextSlide() {
  setVisibleSlide({ index: state.currentSlideIndex + 1 })
}

function previousSlide() {
  setVisibleSlide({ index: state.currentSlideIndex - 1 })
}

function createControlButtons() {
  slideItems.forEach(function() {
    const controlButton = document.createElement('button');
    controlButton.classList.add('slide-control-button')
    controlButton.classList.add('fas')
    controlButton.classList.add('fa-circle')
    controlButton.dataset.slide = 'control-button'
    
    controlsWrapper.append(controlButton)
  })
}

function onMouseDown(event, index) {
  const slideItem = event.currentTarget;
  state.startPoint = event.clientX;
  state.currentPoint = state.startPoint - state.savedPosition;
  state. currentSlideIndex = index;
  console.log(state.currentSlideIndex)
  slideItem.addEventListener('mousemove', onMouseMove);
}

function onMouseMove(event) { 
  state.movement = event.clientX - state.startPoint;
  const position = event.clientX - state.currentPoint;
  translateSlide(position)
}

function onMouseUp(event) {
  const slideItem = event.currentTarget;
  const slideWidth = slideItem.clientWidth
  console.log(slideWidth)

  if(state.movement < -150) {
    nextSlide()
  }

  else if(state.movement > 150) {
    previousSlide()
  }

  else {
    setVisibleSlide({ index: state.currentSlideIndex})
  }

  slideItem.removeEventListener('mousemove', onMouseMove);
}

function onControlButtonClick(event, index, controlsButtons) {
  const controlButton = event.currentTarget
  controlsButtons.forEach((controlButtonItem) => {
    controlButtonItem.classList.remove('active');
  })
  controlButton.classList.add('active')
  setVisibleSlide({ event, index })
}

function setListeners() {
  const controlsButtons = document.querySelectorAll('[data-slide="control-button"]');

  controlsButtons.forEach((controlButton, index) => {
    controlButton.addEventListener('click', function(event) {
      onControlButtonClick(event, index, controlsButtons);
    })
  })

  slideItems.forEach((slideItem, index) => {
    slideItem.addEventListener('dragstart', function(event) {
      event.preventDefault();
    });
  
    slideItem.addEventListener('mousedown', function(event) {
      onMouseDown(event, index)
    })
    slideItem.addEventListener('mouseup', onMouseUp) 
  })
  
  navNextButton.addEventListener('click', nextSlide)
  navPreviousButton.addEventListener('click', previousSlide)
}

function initSlider() {
  createControlButtons();
  setListeners();
  setVisibleSlide({ index: 0 });
}

initSlider();

