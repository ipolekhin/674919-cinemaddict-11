export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterEnd`,
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const render = (container, component, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.AFTEREND:
      container.after(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

const replace = (parent, newElement, oldElement) => {
  parent.replaceChild(newElement, oldElement);
};

export {
  createElement,
  remove,
  render,
  replace,
};
