function calculateSum(numbers) {
  let total = 0;
  for (let num of numbers) {
    total += num;
  }
  return total;
}

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = calculateSum(data);
console.log("Sum:", result);
