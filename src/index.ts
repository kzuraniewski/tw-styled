import intrinsicTags from './intrinsicTags';
import { createFactoryOfType } from './util';
import { StyleableElementType, Tw } from './types';

/**
 * Utility function that can be called with an element type as an argument to extend from.
 * Use tag properties to build elements from html tags.
 *
 * @example
 * // styling an html element
 * const Card = tw.div`
 * 	radius-2
 * 	p-4
 * 	mx-2
 * 	my-3
 * `;
 *
 * @example
 * // styling a component
 * const StyledButton = tw(Button)`
 * 	mx-auto
 * 	mt-3
 * `;
 *
 * @example
 * // conditional styles and custom props
 * type BlockProps = { bordered?: boolean };
 *
 * const Block = tw.div<BlockProps>`
 * 	w-3
 * 	h-3
 * 	${p => p.bordered && 'border-1'}
 * `;
 *
 * @example
 * // default props
 * type TextFieldProps = { variant?: 'outlined' | 'underlined' };
 *
 * const TextField = tw.input.props<TextFieldProps>({
 * 	type: 'text',
 * 	variant: 'outlined',
 * })`
 * 	w-full
 * 	rounded-md
 *
 * 	${p => p.variant === 'outlined' && 'border-1 ...'}
 * 	...
 * `;
 */
// prettier-ignore
const tw = (
	<Type extends StyleableElementType>
	(type: Type) => createFactoryOfType(type)
) as Tw;

intrinsicTags.forEach((tag) => {
	tw[tag] = createFactoryOfType(tag);
});

export default tw;

export * from './types';

// FIXME: Invalid type inference for generic components
// FIXME: Fix code highlight when prop type applied in VSCode
