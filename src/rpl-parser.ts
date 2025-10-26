import path from "node:path";
import { fetchRplFlightData } from "./lib/fetch-rpl-flight-data.ts";
import { groupSimbriefFlights } from "./lib/group-simbrief-flights.ts";
import { rplToSimbriefFlight } from "./lib/rpl-to-simbrief-flight.ts";

const rplInputFile = path.resolve("./data/rpl-source.json");
const flights = await fetchRplFlightData(rplInputFile);
const items = groupSimbriefFlights(flights.map(rplToSimbriefFlight));
console.log(JSON.stringify(items, null, 2));
