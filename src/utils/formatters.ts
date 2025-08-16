export const formatters = {
  threeDecimal: (num: number): number => Number(num.toFixed(3)),
  sixDecimal: (num: number): number => Number(num.toFixed(6)),
};

export const displayResults = (results: any): void => {
  console.log("\n=== Results ===");
  Object.entries(results).forEach(([key, value]) => {
    const formattedValue = typeof value === 'number' ? value.toFixed(3) : value;
    console.log(`${key}: ${formattedValue}`);
  });
};