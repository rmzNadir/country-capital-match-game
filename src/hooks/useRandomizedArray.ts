import shuffle from "lodash/shuffle";

export const useRandomizedArray = <T>(array: T[]): T[] => {
  // these eslint rules are misfiring here, the return type for shuffle is valid
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return shuffle(array);
};
