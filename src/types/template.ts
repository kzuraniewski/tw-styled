export type TemplateArgumentPrimitive = string | false | undefined;

export const isTemplateArgumentPrimitive = (
	value: unknown
): value is TemplateArgumentPrimitive => {
	if (typeof value === 'boolean' && value === true) return false;

	return (['string', 'undefined'] as unknown[]).includes(
		typeof value
	);
};

export type TempalteArgumentFunction<Context> = (
	context: Context
) => TemplateArgumentPrimitive;

export type TemplateArgument<Context> =
	| TempalteArgumentFunction<Context>
	| TemplateArgumentPrimitive;

export type TemplateResolver = <Context>(
	context: Context,
	classes: TemplateStringsArray,
	...args: TemplateArgument<Context>[]
) => string;
