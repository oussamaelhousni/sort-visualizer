import { motion } from "framer-motion";
import { cn } from "../lib";
import { BarInterface } from "../types";

const ArrayVisualizer = ({ array }: { array: BarInterface[] }) => {
  return (
    <div className="border-t grow py-8 flex overflow-hidden">
      <div className="container  flex-grow flex items-end gap-[1px]">
        {array.map((bar: BarInterface) => (
          <Bar bar={bar} arraySize={array.length} key={bar.id} />
        ))}
      </div>
    </div>
  );
};

const Bar = ({ bar, arraySize }: { bar: BarInterface; arraySize: number }) => {
  return (
    <motion.div
      key={bar.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        height: bar.value + `%`,
        width: 100 / arraySize + "%",
      }}
      className={cn("bg-green-500 transition-all", {
        "bg-white !-translate-y-4 ": bar.isChoosed,
        "animate-blink": bar.isBlinking,
        "bg-neutral-950 border border-neutral-800": bar.isWhole,
      })}
    ></motion.div>
  );
};

export default ArrayVisualizer;
