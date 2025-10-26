import { readFile } from "node:fs/promises";
import { rplFlightSchema } from "../types.ts";

export async function fetchRplFlightData(filePath: string) {
	const payload = await readFile(filePath, "utf-8").then(JSON.parse);
	return rplFlightSchema.array().parse(payload);
}
