import {
  NumberDictionary,
  uniqueNamesGenerator,
} from "npm:unique-names-generator";
import { randomGeneratorFromOptions } from "./rawRandomGenerator.ts";

const rowCount = 100;
const resultFileNameWithoutExtension = Deno.args[0];

function generateRandomData(index: number): {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  state: string;
  hobby: string;
} {
  return {
    id: index + 1,
    firstName: randomGeneratorFromOptions(["Noah", "Paulina", "Steve", "Han"]),
    lastName: uniqueNamesGenerator({
      dictionaries: [["Henson", "Jackson", "Anderson", "Johnson"]],
    }),
    age: Number(
      uniqueNamesGenerator({
        dictionaries: [NumberDictionary.generate({ min: 15, max: 100 })],
      }),
    ),
    city: uniqueNamesGenerator({
      dictionaries: [["Manassas", "Warrenton", "Haymarket", "Chantilly"]],
    }),
    state: uniqueNamesGenerator({
      dictionaries: [
        [
          "Alabama",
          "Alaska",
          "Arizona",
          "Arkansas",
          "California",
          "Colorado",
          "Connecticut",
          "Delaware",
          "Florida",
          "Georgia",
          "Hawaii",
          "Idaho",
          "Illinois",
          "Indiana",
          "Iowa",
          "Kansas",
          "Kentucky",
          "Louisiana",
          "Maine",
          "Maryland",
          "Massachusetts",
          "Michigan",
          "Minnesota",
          "Mississippi",
          "Missouri",
          "Montana",
          "Nebraska",
          "Nevada",
          "New Hampshire",
          "New Jersey",
          "New Mexico",
          "New York",
          "North Carolina",
          "North Dakota",
          "Ohio",
          "Oklahoma",
          "Oregon",
          "Pennsylvania",
          "Rhode Island",
          "South Carolina",
          "South Dakota",
          "Tennessee",
          "Texas",
          "Utah",
          "Vermont",
          "Virginia",
          "Washington",
          "West Virginia",
          "Wisconsin",
          "Wyoming",
        ],
      ],
    }),
    hobby: uniqueNamesGenerator({
      dictionaries: [["Woodworking", "Basketball", "Piano", "Knitting"]],
    }),
  };
}

function csvCell(value: unknown): string {
  const text =
    value == null
      ? ""
      : typeof value === "object"
        ? JSON.stringify(value)
        : String(value);

  return `"${text.replaceAll('"', '""')}"`;
}

const rows = [];
const csvLines: string[] = [];

for (let index = 0; index < rowCount; index++) {
  const row = generateRandomData(index);
  rows.push(row);

  if (index === 0) {
    csvLines.push(Object.keys(row).map(csvCell).join(","));
  }

  csvLines.push(Object.values(row).map(csvCell).join(","));
}

const filename = resultFileNameWithoutExtension ?? "results";
await Deno.writeTextFile(`./resultFiles/${filename}.json`, JSON.stringify(rows));
await Deno.writeTextFile(`./resultFiles/${filename}.csv`, csvLines.join("\r\n"));
