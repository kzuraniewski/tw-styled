import intrinsicTags from '@/intrinsicTags';
import { Component, Tw, UnknownPropsWithClassName } from '@/types';
import { createStyledComponentFactory } from '@/util';

// prettier-ignore
const tw = (
	<C extends Component<UnknownPropsWithClassName>>
	(component: C) => createStyledComponentFactory(component)
) as Tw;

intrinsicTags.forEach((tag) => {
	tw[tag] = createStyledComponentFactory(tag);
});

export default tw;

// FIXME: Invalid type inference for generic components
// FIXME: Fix code highlight when prop type applied in VSCode
