import type { SimBriefFlight } from "../types.ts";

function makeFlightKey(flight: SimBriefFlight) {
	return `${flight.dept}-${flight.dest}-${flight.acft}-${flight.route}-${flight.notes}` as const;
}

export function groupSimbriefFlights(flights: SimBriefFlight[]) {
	const flightsMap = new Map(
		flights.map((flight) => [makeFlightKey(flight), flight]),
	);

	for (const [key, flight] of flightsMap.entries()) {
		if (flight.acft === "Any") {
			flightsMap.delete(makeFlightKey({ ...flight, acft: "Jet only" }));
			flightsMap.delete(makeFlightKey({ ...flight, acft: "Prop only" }));
		} else {
			const oppositeAcft =
				flight.acft === "Jet only" ? "Prop only" : "Jet only";
			const oppositeKey = makeFlightKey({ ...flight, acft: oppositeAcft });

			if (flightsMap.has(oppositeKey)) {
				flightsMap.delete(key);
				flightsMap.delete(oppositeKey);

				const newFlight = { ...flight, acft: "Any" } satisfies SimBriefFlight;
				flightsMap.set(makeFlightKey(newFlight), newFlight);
			}
		}
	}

	return Array.from(flightsMap.values());
}
