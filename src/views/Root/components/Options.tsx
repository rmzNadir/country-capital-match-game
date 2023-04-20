"use client";

import { useState, type FC, useRef } from "react";

import cn from "classnames";

import { type Option } from "../hooks/useMatchGameOptions";
import { Overlay } from "@/components";
import { useRouter } from "next/navigation";

export interface OptionsProps {
  options: Option[];
}

export const Options: FC<OptionsProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [errorCount, setErrorCount] = useState(0);
  const correctAnswersRef = useRef(new Set());
  const errorsRef = useRef(new Set());
  const router = useRouter();

  const isGameLost = errorCount >= 3;
  const isGameWon = correctAnswersRef.current.size === options.length;

  const handleGameReset = () => {
    correctAnswersRef.current.clear();
    errorsRef.current.clear();
    setErrorCount(0);
    setSelectedOption(null);
    router.refresh();
  };

  const handleOptionClick = (option: Option) => {
    if (!selectedOption) {
      errorsRef.current.clear();
      setSelectedOption(option);
      return;
    }

    if (selectedOption.value === option.value) {
      return;
    }

    if (selectedOption.pair !== option.value) {
      errorsRef.current.add(selectedOption.value);
      errorsRef.current.add(option.value);

      setErrorCount((errorCount) => errorCount + 1);
      setSelectedOption(null);
      return;
    }

    correctAnswersRef.current.add(selectedOption.value);
    correctAnswersRef.current.add(selectedOption.pair);
    setSelectedOption(null);
  };

  return (
    <Overlay
      isVisible={isGameLost || isGameWon}
      content={
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl">You {isGameLost ? "lost 😔" : "won ✨"}</h1>
          <button
            onClick={handleGameReset}
            className="border-white-500 text-white-700 rounded border bg-transparent px-4 py-2 font-semibold hover:border-transparent hover:bg-white hover:text-gray-700"
          >
            Try again
          </button>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-3 ">
        <h1 className="text-2xl">Try matching the capitals to its country!</h1>

        {/* 
            2.25rem === 3xl line height size. this allows us to prevent the
            UI from moving when the first error emoji appears
        */}
        <h2 className="min-h-[2.25rem] text-3xl">
          {Array.from({ length: errorCount }, () => "❌")}
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {options.map((option) => {
            // Given the simplicity of the component, I don't believe extracting
            // this logic to a separate component is worth it as we'd have to
            // pass down a lot of props / use context / state management library
            // and it would be harder to read / understand
            const { value } = option;

            const isDisabled =
              correctAnswersRef.current.has(value) ||
              selectedOption?.value === value ||
              isGameLost;

            const isNormalButton =
              selectedOption?.value !== value &&
              !errorsRef.current.has(value) &&
              !correctAnswersRef.current.has(value);

            const isSelectedButton = selectedOption?.value === value;

            const isSuccessButton = correctAnswersRef.current.has(value);

            const isErrorButton = errorsRef.current.has(value);

            return (
              <button
                key={value}
                className={cn(
                  "text-white-700 rounded border px-4 py-2 font-semibold hover:border-transparent",
                  {
                    "border-white-500 bg-transparent hover:bg-white hover:text-gray-700":
                      isNormalButton,
                    "border-[#1ec3e4] bg-[#1ec3e4] hover:bg-[#1ec3e4]":
                      isSelectedButton,
                    "border-[#0ade6d] bg-[#0ade6d] hover:bg-[#0ade6d]":
                      isSuccessButton,
                    "border-[#e41243] bg-[#e41243] hover:bg-[#e41243]":
                      isErrorButton,
                  }
                )}
                onClick={() => handleOptionClick(option)}
                disabled={isDisabled}
              >
                {value}
              </button>
            );
          })}
        </div>
      </div>
    </Overlay>
  );
};
