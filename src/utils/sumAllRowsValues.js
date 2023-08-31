export default function sumAllRowsValues(data) {
  let solution = [];

  data.forEach((arr) => {
    let suma = 0;
    arr.forEach((value) => {
      suma += value;
    });
    solution.push(suma);
  });

  return solution;
}
