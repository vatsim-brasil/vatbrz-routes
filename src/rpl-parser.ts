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

export const PROP_ONLY_AIRCRAFTS = ["C208", "AT76", "E110"];
export const JET_ONLY_AIRCRAFTS = [
	"B734",
	"B737",
	"B38M",
	"B738",
	"B789",
	"A319",
	"A320",
	"A321",
	"A20N",
	"A21N",
	"E195",
	"E295",
];

export function rplToSimbriefFlight(rplFlight: RplFlight) {
	return {
		dept: rplFlight.departureIcao,
		dest: rplFlight.arrivalIcao,
		acft: PROP_ONLY_AIRCRAFTS.includes(rplFlight.aircraftType)
			? "Prop only"
			: JET_ONLY_AIRCRAFTS.includes(rplFlight.aircraftType)
				? "Jet only"
				: "Any",
		route: rplFlight.route,
		notes: "",
	} as const;
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
