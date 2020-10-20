export const isNullOrUndefined = (value: any) => value === null || value === undefined;
export const isDefined = (value: any) => !isNullOrUndefined(value);