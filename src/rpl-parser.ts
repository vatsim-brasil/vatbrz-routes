import z from "zod";
import {
	rplFlightSchema,
	type RplFlight,
	type SimBriefFlight,
} from "./types.ts";
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function fetchRplFlightData() {
	const payload = await readFile(
		path.resolve("./data/rpl-source.json"),
		"utf-8",
	).then(JSON.parse);
	return rplFlightSchema.array().parse(payload);
}

export function rplToSimbriefFlight(rplFlight: RplFlight) {
	return {
		dept: rplFlight.departureIcao,
		dest: rplFlight.arrivalIcao,
		acft: "Any",
		route: rplFlight.route,
		notes: rplFlight.cruisingLevel > 245 ? "(ABOVE F245)" : "(AT OR BLW F245)",
	};
}

export function groupSimbriefFlights(flights: SimBriefFlight[]) {
	const flightsMap = new Map(
		flights.map((flight) => {
			const key = `${flight.dept}-${flight.dest}-${flight.acft}-${flight.route}-${flight.notes}`;
			return [key, flight];
		}),
	);

	return Array.from(flightsMap.values());
}

const flights = await fetchRplFlightData();
const items = groupSimbriefFlights(flights.map(rplToSimbriefFlight));
console.log(JSON.stringify(items, null, 2));
