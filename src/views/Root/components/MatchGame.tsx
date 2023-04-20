import { type FC } from "react";

import { useRandomizedArray } from "@/hooks/useRandomizedArray";

import { useMatchGameOptions } from "../hooks";
import { Options } from "./Options";

export interface MatchGameProps {
  data: Record<string, string>;
}

// Just following the constraints of the excercise, otherwise I'd lift this to
// the root component and pass down the randomizedOptions as a prop
export const MatchGame: FC<MatchGameProps> = ({ data }) => {
  const options = useMatchGameOptions(data);
  const randomizedOptions = useRandomizedArray(options);

  return <Options options={randomizedOptions} />;
};
