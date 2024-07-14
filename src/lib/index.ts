import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";
import { BarInterface } from "../types";
import { v4 } from "uuid";
export const generateRandomArray = (size: number): BarInterface[] => {
  return Array.from({ length: size }, () => {
    return {
      value: Math.floor(Math.random() * 101),
      isChoosed: false,
      isWhole: false,
      isPivot: false,
      id: v4(),
      isBlinking: false,
    };
  });
};

export const delay = (d: number): Promise<null> => {
  return new Promise((resolve) => setTimeout(resolve, d));
};

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
