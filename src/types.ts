import z from "zod";

export const rplFlightSchema = z.object({
	departureIcao: z.string(),
	cruisingLevel: z.number(),
	route: z.string(),
	arrivalIcao: z.string(),
	aircraftType: z.string(),
});

export type RplFlight = z.infer<typeof rplFlightSchema>;

export const simBriefFlightSchema = z.object({
	dept: z.string(),
	dest: z.string(),
	acft: z.enum(["Prop only", "Jet only", "Any"]),
	route: z.string(),
	notes: z.string(),
});

export type SimBriefFlight = z.infer<typeof simBriefFlightSchema>;
