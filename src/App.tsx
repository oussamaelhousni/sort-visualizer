import { useEffect, useMemo, useState } from "react";
import { Background, Header, ArrayVisualizer } from "./components";
import { useDebounce } from "./hooks";
import { generateRandomArray, delay } from "./lib";
import { BarInterface } from "./types";
import { EXECUTION_STATE } from "./constants";

function App() {
  const [array, setArray] = useState<BarInterface[]>([]);
  const [arraySize, setArraySize] = useState(5);
  const [algorithm, setAlgorithm] = useState("bubbleSort");
  const [sortingSpeed, setSortingSpeed] = useState(5);
  const [isSorting, setIsSorting] = useState(false);
  const debouncedArraySize = useDebounce(arraySize, 150);

  const DELAY = useMemo(() => {
    return 1000 + ((sortingSpeed - 1) * (1 - 1000)) / (100 - 1);
  }, [sortingSpeed]);

  useEffect(() => {
    setArray(generateRandomArray(debouncedArraySize));
  }, [debouncedArraySize]);

  const swap = async (i: number, j: number) => {
    // 1 - choose
    setArray((prev) => {
      return prev.map((bar, index) => {
        if (index === i || index === j) {
          return { ...bar, isChoosed: true };
        }
        return bar;
      });
    });
    await delay(DELAY);

    // 2 - swap
    setArray((prev) => {
      const temp = [...prev];
      if (temp[i].value > temp[j].value) {
        const t = temp[i];
        temp[i] = temp[j];
        temp[j] = t;
      }
      return temp;
    });

    // 3 - stop choosing
    await delay(DELAY);
    setArray((prev) => {
      return prev.map((bar, index) => {
        if (index === i || index === j) {
          return { ...bar, isChoosed: false };
        }
        return bar;
      });
    });
  };

  // make the whole array blinks
  const blinkArray = async () => {
    setArray((prev) => {
      return prev.map((bar) => {
        return { ...bar, isBlinking: true };
      });
    });

    await delay(5000);

    setArray((prev) => {
      return prev.map((bar) => {
        return { ...bar, isBlinking: false };
      });
    });
  };
  // swap two elements in an array
  const swaptwo = (arr: any[], i: number, j: number) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  const bubbleSort = async () => {
    const arr = [...array];
    let sorted;
    do {
      if (!EXECUTION_STATE.running) return;
      sorted = true;
      for (let i = 0; i < arr.length - 1; i++) {
        if (!EXECUTION_STATE.running) return;
        if (arr[i].value > arr[i + 1].value) {
          swaptwo(arr, i, i + 1);
          sorted = false;
        }
        await swap(i, i + 1);
        await delay(DELAY);
      }
    } while (!sorted);
    await blinkArray();
    setIsSorting(false);
  };

  const insertionSort = async () => {
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      if (!EXECUTION_STATE.running) return;
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (!EXECUTION_STATE.running) return;
        if (arr[minIndex].value > arr[j].value) {
          minIndex = j;
        }
      }

      swaptwo(arr, i, minIndex);
      await swap(i, minIndex);
      await delay(DELAY);
    }
    await blinkArray();
    setIsSorting(false);
  };

  const selectionSort = async () => {
    const arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      if (!EXECUTION_STATE.running) return;
      const whole = arr[i];
      // select i as a whole
      setArray((prev) => {
        const temp = [...prev];
        temp[i].isWhole = true;
        return temp;
      });

      await delay(DELAY);
      let j = i - 1;
      while (j >= 0 && arr[j].value > whole.value) {
        if (!EXECUTION_STATE.running) return;
        // select the element to be swapped with the whole
        setArray((prev) => {
          return prev.map((bar, index) => {
            if (index === j) {
              return { ...bar, isChoosed: true };
            }
            return bar;
          });
        });
        await delay(DELAY);
        // the whole should be swapped with the element
        setArray((prev) => {
          const temp = [...prev];
          temp[j + 1] = { ...temp[j], isWhole: false };
          temp[j] = { ...whole, isWhole: true };
          return temp;
        });
        // deselect the element
        setArray((prev) => {
          return prev.map((bar, index) => {
            if (index === j + 1) {
              return { ...bar, isChoosed: false };
            }
            return bar;
          });
        });

        await delay(DELAY);
        arr[j + 1] = arr[j];

        j--;
      }
      arr[j + 1] = whole;
      setArray((prev) => {
        return prev.map((bar, index) => {
          if (index === j + 1) {
            return { ...whole, isWhole: false };
          }
          return bar;
        });
      });
    }
    blinkArray();
    setIsSorting(false);
    console.log("slection sort completed");
  };

  const shuffleArray = () => {
    console.log("suffle");
    setArray([...array.sort(() => Math.random() - 0.5)]);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Background />
      <Header
        arraySize={arraySize}
        setArraySize={setArraySize}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        sortingSpeed={sortingSpeed}
        setSortingSpeed={setSortingSpeed}
        algorithms={{ bubbleSort, insertionSort, selectionSort }}
        isSorting={isSorting}
        setIsSorting={setIsSorting}
        shuffleArray={shuffleArray}
      />
      <ArrayVisualizer array={array} />
    </div>
  );
}

export default App;
