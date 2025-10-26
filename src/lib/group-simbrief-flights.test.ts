import assert from "node:assert";
import { it } from "node:test";
import type { SimBriefFlight } from "../types.ts";
import { groupSimbriefFlights } from "./group-simbrief-flights.ts";

it("if there two flights one jet only and one prop only, it should group them together in Any", () => {
	const flights = [
		{
			dept: "SBRF",
			dest: "SBBV",
			acft: "Jet only",
			route: "DCT REC DCT BVI DCT",
			notes: "",
		},
		{
			dept: "SBRF",
			dest: "SBBV",
			acft: "Prop only",
			route: "DCT REC DCT BVI DCT",
			notes: "",
		},
	] satisfies SimBriefFlight[];

	const grouped = groupSimbriefFlights(flights);
	assert.equal(grouped.length, 1);
	assert.equal(grouped[0]?.acft, "Any");
});
