import assert from "node:assert";
import { it } from "node:test";
import { rplToSimbriefFlight } from "./rpl-to-simbrief-flight.ts";

it("should convert RplFlight to SimBriefFlight", () => {
	const result = rplToSimbriefFlight({
		departureIcao: "SBRF",
		arrivalIcao: "SBBV",
		route: "DCT REC DCT BVI DCT",
		aircraftIcaoCode: "B738",
	});

	assert.equal(result.dept, "SBRF");
	assert.equal(result.dest, "SBBV");
	assert.equal(result.route, "DCT REC DCT BVI DCT");
});

it("If the aircraft is prop only, it should set acft to 'Prop only'", () => {
	const result = rplToSimbriefFlight({
		departureIcao: "SBRF",
		arrivalIcao: "SBBV",
		route: "DCT REC DCT BVI DCT",
		aircraftIcaoCode: "C208",
	});
	assert.equal(result.acft, "Prop only");
});

it("If the aircraft is jet only, it should set acft to 'Jet only'", () => {
	const result = rplToSimbriefFlight({
		departureIcao: "SBRF",
		arrivalIcao: "SBBV",
		route: "DCT REC DCT BVI DCT",
		aircraftIcaoCode: "B738",
	});
	assert.equal(result.acft, "Jet only");
});
