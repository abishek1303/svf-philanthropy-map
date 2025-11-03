import { ContinentSheet } from "./Continent.sheet";

export type Workbook = Record<string, ContinentSheet[]>; // add other types as more sheets are added with | operator
