export function deepMerge<T extends Record<string, any>>(target: T | undefined, source: Partial<T> | undefined): T {
	// If both are undefined, return an empty object
	if (target === undefined && source === undefined) {
		return {} as T;
	}
	// If target is undefined, return source (or empty object if source is also undefined)
	if (target === undefined) {
		return (source ?? {}) as T;
	}
	// If source is undefined, return target
	if (source === undefined) {
		return target;
	}

	const output = {...target};

	for (const key in source) {
		if (source.hasOwnProperty(key)) {
			if (isObject(source[key]) && isObject(output[key])) {
				output[key] = deepMerge(
					output[key] as Record<string, any>,
					source[key] as Record<string, any>
				) as T[Extract<keyof T, string>];
			} else {
				output[key] = source[key] as T[Extract<keyof T, string>];
			}
		}
	}

	return output;
}

export function isObject(item: unknown): item is Record<string, any> {
	return typeof item === 'object' && item !== null && !Array.isArray(item);
}
