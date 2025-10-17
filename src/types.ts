import z from "zod";

export const rplFlightSchema = z.object({
	departureIcao: z.string(),
	cruisingLevel: z.number(),
	route: z.string(),
	arrivalIcao: z.string(),
});

export type RplFlight = z.infer<typeof rplFlightSchema>;

export type SimBriefFlight = {
	dept: string;
	dest: string;
	acft: string;
	route: string;
	notes: string;
};
