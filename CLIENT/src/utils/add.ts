export const add = (...args: number[]): number => args.reduce((acc, curr) => acc + curr, 0);
