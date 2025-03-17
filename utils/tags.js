const html = (strings, ...values) => String.raw({ raw: strings }, ...values);
const css = (strings, ...values) => String.raw({ raw: strings }, ...values);
export {
  css,
  html
};
