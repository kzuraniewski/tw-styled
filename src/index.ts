import intrinsicTags from '@/intrinsicTags';
import { Component, Tw, UnknownPropsWithClassName } from '@/types';
import { createFactoryOfType } from '@/util';

// prettier-ignore
const tw = (
	<C extends Component<UnknownPropsWithClassName>>
	(component: C) => createFactoryOfType(component)
) as Tw;

intrinsicTags.forEach((tag) => {
	tw[tag] = createFactoryOfType(tag);
});

export default tw;

// FIXME: Invalid type inference for generic components
// FIXME: Fix code highlight when prop type applied in VSCode
