import { nanoid } from "nanoid";

const generateUniqueCode = () => {
  return nanoid(10); // Generates a unique code of length 10
};

export { generateUniqueCode };
