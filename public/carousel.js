let track = document.querySelector('.carouselTrack');
let slides = Array.from(track.children);
let nextButton = document.querySelector('.carouselButtonRight');
let prevButton = document.querySelector('.carouselButtonLeft');
let dotsNav = document.querySelector('.carouselNav');
let dots = Array.from(dotsNav.children);

let slideWidth = slides[0].getBoundingClientRect().width;

//arrange the images next to each other
slides.forEach(function (slide, index) {
  slide.style.left = slideWidth * index + 'px';
});

let moveToSlide = function (track, currentSlide, targetSlide) {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('currentSlide');
  targetSlide.classList.add('currentSlide');
};

let updateDots = function (currentDot, targetDot) {
  currentDot.classList.remove('currentSlide');
  targetDot.classList.add('currentSlide');
};

let hideShowNav = function (slides, prevButton, nextButton, targetIndex) {
  if (targetIndex === 0) {
    prevButton.classList.add('isHidden');
    nextButton.classList.remove('isHidden');
  } else if (targetIndex === slides.length - 1) {
    nextButton.classList.add('isHidden');
    prevButton.classList.remove('isHidden');
  } else {
    prevButton.classList.remove('isHidden');
    nextButton.classList.remove('isHidden');
  }
};

//move to left image when left button is clicked
prevButton.addEventListener('click', function () {
  let currentSlide = track.querySelector('.currentSlide');
  let prevSlide = currentSlide.previousElementSibling;
  let currentDot = dotsNav.querySelector('.currentSlide');
  let prevDot = currentDot.previousElementSibling;
  let prevIndex = slides.findIndex(slide => slide ===  prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowNav(slides, prevButton, nextButton, prevIndex);
});

//move to right image when right button is clicked
nextButton.addEventListener('click', function () {
  let currentSlide = track.querySelector('.currentSlide');
  let nextSlide = currentSlide.nextElementSibling;
  let currentDot = dotsNav.querySelector('.currentSlide');
  let nextDot = currentDot.nextElementSibling;
  let nextIndex = slides.findIndex(slide => slide ===  nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowNav(slides, prevButton, nextButton, nextIndex);
});

//move to image when nav indicator is clicked
dotsNav.addEventListener('click', function (e) {
  let targetDot = e.target.closest('button');

  console.log(targetDot);

  if (!targetDot) {
    return;
  }

  let currentSlide = track.querySelector('.currentSlide');
  let currentDot = dotsNav.querySelector('.currentSlide');
  let targetIndex = dots.findIndex(dot => dot === targetDot);
  let targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowNav(slides, prevButton, nextButton, targetIndex);
});
