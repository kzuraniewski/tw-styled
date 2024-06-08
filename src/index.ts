import intrinsicTags from '@/intrinsicTags';
import { createFactoryOfType } from '@/util';
import { StyleableElementType, Tw } from '@/types';

// prettier-ignore
const tw = (
	<Type extends StyleableElementType>
	(type: Type) => createFactoryOfType(type)
) as Tw;

intrinsicTags.forEach((tag) => {
	tw[tag] = createFactoryOfType(tag);
});

export default tw;

// FIXME: Invalid type inference for generic components
// FIXME: Fix code highlight when prop type applied in VSCode
