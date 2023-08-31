export default function calculateData(rows, cols) {
  let data = [];
  rows.forEach((row) => {
    let newRow = [];
    cols.forEach((col) => {
      let value = row / col;
      newRow.push(value);
    });
    data.push(newRow);
  });

  return data;
}
