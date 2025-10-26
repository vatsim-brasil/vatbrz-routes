import type { RplFlight, SimBriefFlight } from "../types.ts";

const PROP_ONLY_AIRCRAFTS = ["C208", "AT76", "E110"];
const JET_ONLY_AIRCRAFTS = [
	"B733",
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

function rplAircraftToSimbriefAircraft(acftCode: string): SimBriefFlight["acft"] {
	if (PROP_ONLY_AIRCRAFTS.includes(acftCode)) {
		return "Prop only";
	}
	if (JET_ONLY_AIRCRAFTS.includes(acftCode)) {
		return "Jet only";
	}
	return "Any";
}

export function rplToSimbriefFlight(rplFlight: RplFlight): SimBriefFlight {
	return {
		dept: rplFlight.departureIcao,
		dest: rplFlight.arrivalIcao,
		acft: rplAircraftToSimbriefAircraft(rplFlight.aircraftIcaoCode),
		route: rplFlight.route,
		notes: "",
	};
}
