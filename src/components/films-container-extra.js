import {NAME_EXTRA_BLOCK} from "../const";

const createExtraBlockMarkup = (name) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${name}</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};

const createFilmsContainerExtraTemplate = () => {
  const extraBlockMarkup = NAME_EXTRA_BLOCK.map((name) => createExtraBlockMarkup(name)).join(`\n`);
  return `${extraBlockMarkup}`;
};

export {createFilmsContainerExtraTemplate};
