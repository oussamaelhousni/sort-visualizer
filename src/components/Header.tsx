import { Select, Slider } from "antd";
import { useEffect } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { PiShuffleSimpleBold } from "react-icons/pi";
import { FaStopCircle } from "react-icons/fa";
import { EXECUTION_STATE } from "../constants";
import { cn } from "../lib";
const ALGORITHMS = [
  {
    value: "bubbleSort",
    label: "Bubble Sort",
  },
  {
    value: "selectionSort",
    label: "Selection Sort",
  },
  {
    value: "insertionSort",
    label: "Insertion Sort",
  },
];
const Header = ({
  arraySize,
  setArraySize,
  algorithm,
  setAlgorithm,
  sortingSpeed,
  setSortingSpeed,
  algorithms,
  isSorting,
  setIsSorting,
  shuffleArray,
}: {
  arraySize: number;
  setArraySize: (n: number) => void;
  algorithm: string;
  setAlgorithm: (algo: string) => void;
  sortingSpeed: number;
  setSortingSpeed: (speed: number) => void;
  algorithms: {
    [key: string]: (...args: any[]) => any;
  };
  isSorting: boolean;
  setIsSorting: (isSorting: boolean) => void;
  shuffleArray: () => void;
}) => {
  const handleChangeAlgorithm = (value: string) => {
    if (isSorting) return;
    setAlgorithm(value);
  };
  const handleChangeSortingSpeed = (value: number): void => {
    if (isSorting) return;
    setSortingSpeed(value);
  };
  const handleChangeArraySize = (value: number): void => {
    if (isSorting) return;
    setArraySize(value);
  };

  useEffect(() => {
    if (!EXECUTION_STATE.running) return;
    algorithms[algorithm]();
  }, [EXECUTION_STATE.running]);

  return (
    <div className="container py-4 flex justify-between items-center flex-col md:flex-row max-w-screen overflow-hidden">
      <div className="text-white font-semibold text-2xl text-nowrap">
        Sort Visualizer
      </div>
      <div className="flex gap-4 items-center flex-col md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-white text-nowrap">Size :</span>
            <Slider
              min={10}
              max={100}
              value={arraySize}
              onChange={handleChangeArraySize}
              className="w-16"
              disabled={false}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white text-nowrap">Speed :</span>
            <Slider
              min={0}
              max={100}
              value={sortingSpeed}
              onChange={handleChangeSortingSpeed}
              className="w-16"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white text-nowrap">Choose an Algorithm :</span>
          <Select
            className="min-w-32"
            onChange={handleChangeAlgorithm}
            value={algorithm}
            placeholder="Algorithm"
            options={ALGORITHMS}
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={shuffleArray}
            disabled={isSorting}
            className={cn({ "opacity-20": isSorting })}
          >
            <PiShuffleSimpleBold
              size={25}
              className="cursor-pointer text-white hover:text-blue-500 transition-colors"
            />
          </button>
          {isSorting && (
            <button
              disabled={!isSorting}
              onClick={() => {
                EXECUTION_STATE.running = false;
                setIsSorting(false);
              }}
            >
              <FaStopCircle
                size={25}
                className="cursor-pointer text-red-500 hover:text-red-800 transition-colors"
              />
            </button>
          )}

          {!isSorting && (
            <button
              disabled={isSorting}
              onClick={() => {
                EXECUTION_STATE.running = true;
                setIsSorting(true);
                console.log("cicked", EXECUTION_STATE.running);
              }}
            >
              <FaPlayCircle
                size={25}
                className="cursor-pointer text-green-500 hover:text-green-800 transition-colors"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
