import type { RplFlight, SimBriefFlight } from "../types.ts";

const PROP_ONLY_AIRCRAFTS = ["C208", "E110"];

function getSimbriefAircraftFromRplFlight(
	flight: RplFlight,
): SimBriefFlight["acft"] {
	if (PROP_ONLY_AIRCRAFTS.includes(flight.aircraftIcaoCode)) {
		return "Prop only";
	}
	if (flight.cruisingLevel > 245) {
		return "Jet only";
	}
	return "Any";
}

export function rplToSimbriefFlight(rplFlight: RplFlight): SimBriefFlight {
	return {
		dept: rplFlight.departureIcao,
		dest: rplFlight.arrivalIcao,
		acft: getSimbriefAircraftFromRplFlight(rplFlight),
		route: rplFlight.route,
		notes: "",
	};
}
