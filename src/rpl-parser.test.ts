import assert from "node:assert";
import { describe, it } from "node:test";
import { rplToSimbriefFlight } from "./rpl-parser.ts";

describe("rplToSimbriefFlight", () => {
	it("should convert RplFlight to SimBriefFlight", () => {
		const result = rplToSimbriefFlight({
			departureIcao: "SBRF",
			arrivalIcao: "SBBV",
			route: "DCT REC DCT BVI DCT",
			cruisingLevel: 390,
		});

		assert.equal(result.dept, "SBRF");
		assert.equal(result.dest, "SBBV");
		assert.equal(result.route, "DCT REC DCT BVI DCT");
		assert.equal(result.acft, "Any");
	});

	it("if the route is above FL245 it should be printed on notes", () => {
		const result = rplToSimbriefFlight({
			departureIcao: "SBRF",
			arrivalIcao: "SBBV",
			route: "DCT REC DCT BVI DCT",
			cruisingLevel: 350,
		});
		assert.equal(result.notes, "(ABOVE F245)");
	});

	it("if the route is below FL245 it should be printed on notes", () => {
		const result = rplToSimbriefFlight({
			departureIcao: "SBRF",
			arrivalIcao: "SBBV",
			route: "DCT REC DCT BVI DCT",
			cruisingLevel: 145,
		});
		assert.equal(result.notes, "(AT OR BLW F245)");
	});
});
