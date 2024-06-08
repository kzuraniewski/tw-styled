import {
	Component,
	IntrinsicTag,
	UnknownProps,
	UnknownPropsWithClassName,
} from './react';
import { TemplateArgument } from './template';

export type StyleableComponent = Component<UnknownPropsWithClassName>;

export type StyleableElementType = StyleableComponent | IntrinsicTag;

export type StyledComponentFactory<Type extends StyleableElementType> = <
	CustomProps extends UnknownProps = object
>(
	classes: TemplateStringsArray,
	...args: TemplateArgument<React.ComponentProps<Type> & CustomProps>[]
) => Component<React.ComponentProps<Type> & CustomProps>;

// prettier-ignore
export type TwFunction =
	<Type extends StyleableElementType>
	(type: Type) =>
		StyledComponentFactory<Type>;

export type TwProperties = {
	[Tag in IntrinsicTag]: StyledComponentFactory<Tag>;
};

export type Tw = TwFunction & TwProperties;
