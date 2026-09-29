// R5 QA stub: emulate a real touch device's media queries (hover:none + pointer:coarse)
(() => {
  const orig = window.matchMedia.bind(window);
  const fake = (q, matches) => ({
    matches,
    media: q,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {
      return false;
    },
  });
  window.matchMedia = (q) => {
    if (q === "(hover: none)" || q === "(pointer: coarse)") return fake(q, true);
    if (q === "(hover: hover)" || q === "(pointer: fine)") return fake(q, false);
    return orig(q);
  };
})();
