export const cn = (classes: (string | undefined)[]) => {
  return classes.filter((item) => Boolean(item)).join(" ");
};
