/**
 * pass in options and it will return one of them based on a Math.random() equal chance.
 * the return type (of the winner/result) comes directly from the options you pass in
 */
export function randomGeneratorFromOptions<T>(options: readonly T[]): T {
  if (options.length === 0) {
    throw new Error("Options cannot be empty");
  }

  const choice = options[Math.floor(Math.random() * options.length)];

  // Also catches an explicit `undefined` entry or a sparse array slot.
  if (choice === undefined) {
    throw new Error("Options must contain defined values");
  }

  return choice;
}

// Usage:
// const name = randomGeneratorFromOptions([
//   "Noah",
//   "Paulina",
//   "Steve",
//   "Hanneke",
//   "Russ",
//   "Tessa",
// ]);
// console.log(name);
