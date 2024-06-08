import {
	Component,
	IntrinsicTag,
	UnknownProps,
	UnknownPropsWithClassName,
} from './react';
import { TemplateArgument } from './template';

export type StyledComponentFactory<Props extends UnknownPropsWithClassName> = <
	CustomProps extends UnknownProps = object
>(
	classes: TemplateStringsArray,
	...args: TemplateArgument<Props & CustomProps>[]
) => Component<Props & CustomProps>;

export type StyleableComponent = Component<UnknownPropsWithClassName>;

export type StyleableElementType = StyleableComponent | IntrinsicTag;

// prettier-ignore
export type TwFunction =
	<Props extends UnknownPropsWithClassName>
	(component: Component<Props>) =>
		StyledComponentFactory<Props>;

export type TwProperties = {
	[K in IntrinsicTag]: StyledComponentFactory<JSX.IntrinsicElements[K]>;
};

export type Tw = TwFunction & TwProperties;
