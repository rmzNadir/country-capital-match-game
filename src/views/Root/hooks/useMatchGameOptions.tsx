import { type MatchGameProps } from "../components/MatchGame";

export interface Option {
  value: string;
  pair: string;
}

export const useMatchGameOptions = (data: MatchGameProps["data"]): Option[] => {
  return Object.entries(data).reduce<Option[]>(
    (options, [country, capital]) => {
      options.push({ value: country, pair: capital });
      options.push({ value: capital, pair: country });
      return options;
    },
    []
  );
};
