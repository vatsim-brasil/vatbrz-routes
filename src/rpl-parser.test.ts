import assert from "node:assert";
import { describe, it } from "node:test";
import { groupSimbriefFlights, rplToSimbriefFlight } from "./rpl-parser.ts";

describe("rplToSimbriefFlight", () => {
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
});

describe('groupSimbriefFlights', () => {
	it('if there two flights one jet only and one prop only, it should group them together in Any', () => {
		const flights = [
			{
				dept: 'SBRF',
				dest: 'SBBV',
				acft: 'Jet only',
				route: 'DCT REC DCT BVI DCT',
				notes: '',
			} as const,
			{
				dept: 'SBRF',
				dest: 'SBBV',
				acft: 'Prop only',
				route: 'DCT REC DCT BVI DCT',
				notes: '',
			} as const,
		];

		const grouped = groupSimbriefFlights(flights);
		assert.equal(grouped.length, 1);
		assert.equal(grouped[0]?.acft, 'Any');
	});
})