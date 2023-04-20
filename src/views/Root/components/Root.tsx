import { COUNTRIES_AND_CAPITALS } from "../data";
import { MatchGame } from "./MatchGame";

export const Root = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-[#20002c] to-[#a688b1] text-white">
      <MatchGame data={COUNTRIES_AND_CAPITALS} />
    </main>
  );
};
