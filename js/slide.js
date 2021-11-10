export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    // define a posição inicial do mouse dentro de uma propriedade
    this.dist = {finalPosition: 0, startX: 0, movement: 0}
  }

  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0,0)`;
  }

  // calcula a diferença entre o ponto inicial de clique
  // e o ponto da movimentação
  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
    return this.dist.finalPosition - this.dist.movement;
  }

  // inicia o evento de mousemove e define a posição inicial do clique na página
  onStart(event) {
    let movetype;
    if (event.type === 'mousedown') {
    event.preventDefault();
    this.dist.startX = event.clientX;
    movetype = 'mousemove';
    } else {
    this.dist.startX = event.changedTouches[0].clientX;
    movetype = 'touchmove';
    }
    this.wrapper.addEventListener(movetype, this.onMove);
  }

  // define a posição final do mouse na página
  onMove(event) {
    const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  // remove o evento de movimentação do mouse após o clique up
  onEnd() {
    const moveType = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(moveType, this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }

  // adiciona os eventos de clique down para iniciar a movimentação
  // e clique up para finalizar a movimentação
  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchend', this.onEnd);
  }

  // redefine a referência this dos eventos
  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  // Slides Config

  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = element.offsetLeft;
      return { position, element }
    });
  }

  slideIndexNav(index) {
    const last = this.slideArray.length -1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index, 
      next: index === last ? undefined : index + 1,
    }
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(this.slideArray[index].position);
    this.slideIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
  }

  // inicia o código
  init() {
    this.bindEvents();
    this.addSlideEvents();
    this.slidesConfig();
    return this;
  }
}