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
    event.preventDefault();
    this.dist.startX = event.clientX;
    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  // define a posição final do mouse na página
  onMove(event) {
    const finalPosition = this.updatePosition(event.clientX)
    this.moveSlide(finalPosition);
  }

  // remove o evento de movimentação do mouse após o clique up
  onEnd() {
    this.wrapper.removeEventListener('mousemove', this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }

  // adiciona os eventos de clique down para iniciar a movimentação
  // e clique up para finalizar a movimentação
  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
  }

  // redefine a referência this dos eventos
  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  // inicia o código
  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}