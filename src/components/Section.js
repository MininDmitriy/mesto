export default class Section {
  constructor({renderer}, elementsContainer) {
    this._renderer = renderer;
    this._container = elementsContainer;
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });    
  }

  addItem(element) {
    this._container.prepend(element);
  }
}