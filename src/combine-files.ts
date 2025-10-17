import { readFile } from "node:fs/promises";
import { simBriefFlightSchema } from "./types.ts";

const date = process.argv[2];
if(!date) throw new Error('Date is required as first argument');

const rplFile = await readFile("data/rpl.json", "utf-8");
const rplFileContents = simBriefFlightSchema.array().parse(JSON.parse(rplFile));
console.log(JSON.stringify({ valid: date.toUpperCase(), data: [...rplFileContents] }, null, 2));
