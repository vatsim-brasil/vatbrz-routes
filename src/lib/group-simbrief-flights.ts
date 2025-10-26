import type { SimBriefFlight } from "../types.ts";

export function groupSimbriefFlights(flights: SimBriefFlight[]) {
	const flightsMap = new Map(
		flights.map((flight) => {
			const key = `${flight.dept}-${flight.dest}-${flight.acft}-${flight.route}-${flight.notes}`;
			return [key, flight];
		}),
	);

	for (const [key, flight] of flightsMap.entries()) {
		if (flight.acft === "Any") {
			continue;
		}

		const oppositeAcft = flight.acft === "Jet only" ? "Prop only" : "Jet only";
		const oppositeKey = `${flight.dept}-${flight.dest}-${oppositeAcft}-${flight.route}-${flight.notes}`;

		if (flightsMap.has(oppositeKey)) {
			flightsMap.delete(key);
			flightsMap.delete(oppositeKey);

			const newFlight: SimBriefFlight = {
				...flight,
				acft: "Any",
			};

			flightsMap.set(
				`${flight.dept}-${flight.dest}-Any-${flight.route}-${flight.notes}`,
				newFlight,
			);
		}
	}

	return Array.from(flightsMap.values());
}
