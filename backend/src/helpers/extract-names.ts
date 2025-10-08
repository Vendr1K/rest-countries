export const extractNames = (collections = [] as { name: string }[]) => {
  return collections.map((el) => el.name);
};
