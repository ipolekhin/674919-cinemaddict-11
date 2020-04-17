const createNavigationMarkup = ({name, count}, isFirstChild) => {
  return (
    `<a
      href="#${name}"
      class="main-navigation__item ${isFirstChild ? `main-navigation__item--active` : ``}">
      ${name}
      ${!isFirstChild ? `<span class="main-navigation__item-count">${count}</span>` : ``}
    </a>`
  );
};

const createNavigationTemplate = (navigations) => {
  const navigationStats = navigations.pop();
  const navigationMarkup = navigations.map((navigation, i) => createNavigationMarkup(navigation, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${navigationMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">${navigationStats.name}</a>
    </nav>`
  );
};

export {createNavigationTemplate};
