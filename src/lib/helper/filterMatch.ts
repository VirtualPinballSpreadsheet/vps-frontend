// ---------------------------------------------------------------------------
// Match predicates for the chip filters (features, author, manufacturer,
// theme), shared by the SearchStore filter pipeline and the tests.
//
// Each filter selects from a list of values. Two modes:
//
//   include (default) - the result must mention ALL selected values
//                       (this is the long-standing behaviour)
//   exclude (negate)  - the result must mention NONE of the selected values
//
// For a single selected value, exclude is the strict negation of include.
// For several, exclude is the intuitive "none of these" rather than the
// literal De Morgan negation of "all", which would keep partial matches.
// ---------------------------------------------------------------------------

// The values a candidate "mentions". For authors with firstOnly set, only
// the first author of the chain counts — that is the author who did the
// latest work; the rest are the chain of past authors the file is based on.
const mentionedValues = (candidates: string[] | undefined, firstOnly: boolean): string[] => {
	if (!candidates) return [];
	return firstOnly ? candidates.slice(0, 1) : candidates;
};

// Match a multi-value filter against a candidate's value list.
export const matchList = (
	candidates: string[] | undefined,
	values: string[],
	negate: boolean,
	firstOnly = false
): boolean => {
	const mentioned = mentionedValues(candidates, firstOnly);
	return negate
		? !values.some((v) => mentioned.includes(v))
		: values.every((v) => mentioned.includes(v));
};

// Match a filter against a candidate that has exactly one value (manufacturer).
export const matchSingle = (
	candidate: string | undefined,
	values: string[],
	negate: boolean
): boolean => {
	return negate ? !values.includes(candidate ?? '') : values.includes(candidate ?? '');
};

// Match the features filter against a table. Table format counts as a
// feature (e.g. "VPX", "VPM"), matching the long-standing behaviour.
export const matchTableFeatures = (
	table: { features?: string[]; tableFormat?: string },
	values: string[],
	negate: boolean
): boolean => {
	const candidates = [...(table.features ?? [])];
	if (table.tableFormat) candidates.push(table.tableFormat);
	return matchList(candidates, values, negate);
};
