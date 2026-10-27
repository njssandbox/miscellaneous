/**
 * To Run this: deno -A generateRandomData.ts {csv | json} {quantity of columns} {quantity of rows}
 * To compile to an executable file:
 *   for MAC: deno compile --allow-read --allow-write --output macRandomDataGenerator generateRandomData.ts
 *   for Windows: deno compile --target x86_64-pc-windows-msvc --output windowsRandomDataGenerator.exe generateRandomData.ts
 */

// cannot use "await" if it is not a module, so need an export statement
export {};

/******** TAKE USER INPUT *********/
let dataType: string | null = null;
while (dataType !== "json" && dataType !== "csv") {
  dataType = prompt("Enter a data type ('json' or 'csv'):");
  if (!dataType) {
    console.log("You must enter a value.");
  } else if (dataType !== "json" && dataType !== "csv") {
    console.log("Invalid type. Please enter 'json' or 'csv'.");
  }
}

let columnQuantityStr: string | null = null;
let columnQuantity: number = 0;
while (columnQuantity <= 0 || isNaN(columnQuantity)) {
  columnQuantityStr = prompt("Enter the number of columns (must be > 0):");
  columnQuantity = Number(columnQuantityStr);
  if (isNaN(columnQuantity) || columnQuantity <= 0) {
    console.log("Please enter a valid number > 0.");
  }
}

let rowQuantityStr: string | null = null;
let rowQuantity: number = 0;
while (rowQuantity <= 0 || isNaN(rowQuantity)) {
  rowQuantityStr = prompt("Enter the number of rows (must be > 0):");
  rowQuantity = Number(rowQuantityStr);
  if (isNaN(rowQuantity) || rowQuantity <= 0) {
    console.log("Please enter a valid number > 0.");
  }
}

/**********************************/

const BATCH_SIZE = 10_000;
const filePath = `./random-data-${rowQuantity}.${dataType}`;

let introMessage = `\nWriting ${rowQuantity} rows of data to ${filePath}`;
if (rowQuantity >= BATCH_SIZE) {
  introMessage += ` (in batches of ${BATCH_SIZE})`;
}
introMessage += "\n";
console.log(introMessage);

/**********************************/

if (dataType === "csv") {
  // Write header
  const header =
    Array.from({ length: columnQuantity }, (_, i) => `col_${i + 1}`).join(",") +
    "\n";
  await Deno.writeTextFile(filePath, header); // Overwrites if file exists

  // Write rows and append to file in BATCHES
  for (let rowIndex = 0; rowIndex < rowQuantity; rowIndex += BATCH_SIZE) {
    const upperLimit = Math.min(rowIndex + BATCH_SIZE, rowQuantity);
    let batch = "";

    for (let i = rowIndex; i < upperLimit; i++) {
      const row = Array.from({ length: columnQuantity }, () =>
        crypto.randomUUID()
      );
      batch += row.join(",") + "\n";
    }

    await Deno.writeTextFile(filePath, batch, { append: true });
    console.log(`Wrote rows ${rowIndex + 1}-${upperLimit}`);
  }

  console.log("✅ All data written successfully.");
} else if (dataType === "json") {
  // Start file with opening bracket of the JSON array
  await Deno.writeTextFile(filePath, "[\n");
  for (let rowIndex = 0; rowIndex < rowQuantity; rowIndex += BATCH_SIZE) {
    const upperLimit = Math.min(rowIndex + BATCH_SIZE, rowQuantity);
    const batchRows: string[] = [];

    for (let i = rowIndex; i < upperLimit; i++) {
      const row: Record<string, string> = {};
      for (let col = 0; col < columnQuantity; col++) {
        row[`col_${col + 1}`] = crypto.randomUUID();
      }
      batchRows.push(JSON.stringify(row));
    }

    const isLastBatch = upperLimit >= rowQuantity;
    const batchString = batchRows.join(",\n") + (isLastBatch ? "\n" : ",\n");

    await Deno.writeTextFile(filePath, batchString, { append: true });
    console.log(`Wrote rows ${rowIndex + 1}-${upperLimit}`);
  }

  // End file with closing bracket of the JSON array
  await Deno.writeTextFile(filePath, "]\n", { append: true });

  console.log("\n✅ All JSON data written successfully.");
}
