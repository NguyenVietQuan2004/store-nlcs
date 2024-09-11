import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formattedPrice = (price: number) => {
  return formatter.format(price);
};

export const createUniqueArray = (length: number) => {
  if (100 - 1 + 1 < length) {
    throw new Error("Range is too small to generate unique values");
  }

  const set = new Set();
  while (set.size < length) {
    const randomNumber = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    set.add(randomNumber);
  }
  return Array.from(set);
};

export const generateRandomCode = () => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 7; i++) {
    // Đổi 6 thành 7 để tạo chuỗi dài 7 ký tự
    const randomIndex = Math.floor(Math.random() * charset.length);
    code += charset[randomIndex];
  }
  return code;
};

export const createArrayByOrder = (length: number) => {
  const array = [];
  for (let i = 1; i <= length; i++) {
    array.push(i);
  }
  return array;
};
