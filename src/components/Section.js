export default class Section {
  constructor({items, renderer}, elementsContainer) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = elementsContainer;
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });    
  }

  addItem(element) {
    this._container.prepend(element);
  }
}