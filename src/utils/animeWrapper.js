let animeInstance = null;

const createNoopAnimation = () => ({
  add: () => {},
  pause: () => {},
  play: () => {},
  restart: () => {},
  finished: Promise.resolve(),
});

import("animejs")
  .then((module) => {
    animeInstance = module.default || module;
  })
  .catch(() => {});

const animeWrapper = new Proxy(() => createNoopAnimation(), {
  get: (_ignoredTarget, prop) => {
    if (animeInstance && typeof animeInstance[prop] === "function") {
      return animeInstance[prop].bind(animeInstance);
    }

    if (animeInstance && animeInstance[prop]) {
      return animeInstance[prop];
    }

    return () => createNoopAnimation();
  },
  apply: () => createNoopAnimation(),
});

export default animeWrapper;
