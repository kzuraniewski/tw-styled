import {
	Component,
	IntrinsicTag,
	UnknownProps,
	PropsWithClassName,
} from './react';
import { TemplateArgument } from './template';

/**
 * A component that accepts `className` prop
 */
export type StyleableComponent = Component<PropsWithClassName>;

/**
 * An element type that is accepts `className` prop
 */
export type StyleableElementType = StyleableComponent | IntrinsicTag;

// .div<...>``
export type ComponentFactoryWithoutDefault<Type extends StyleableElementType> =
	<CustomProps extends UnknownProps = object>(
		classes: TemplateStringsArray,
		...args: TemplateArgument<React.ComponentProps<Type> & CustomProps>[]
	) => Component<React.ComponentProps<Type> & CustomProps>;

// .props<...>(...)``
// prettier-ignore
export type PropsFunction<Type extends StyleableElementType> =
	<CustomProps extends UnknownProps = object>
	(defaultProps: CustomProps & React.ComponentProps<Type>) =>
	(
		classes: TemplateStringsArray,
		...args: TemplateArgument<React.ComponentProps<Type> & CustomProps>[]
	) => Component<React.ComponentProps<Type> & CustomProps>;

// div`` or div.props(...)``
export type ComponentFactoryObject<Type extends StyleableElementType> =
	ComponentFactoryWithoutDefault<Type> & {
		/**
		 * Apply default props to the component
		 *
		 * @example
		 * type FieldProps = { variant: 'normal' | 'full' };
		 *
		 * const Field = tw.input.props<FieldProps>({
		 *     type: 'text',
		 *     variant: 'normal',
		 * })`rounded-sm border-1`;
		 */
		props: PropsFunction<Type>;
	};

// tw(...)
// prettier-ignore
export type TwFunction =
	<Type extends StyleableElementType>
	(type: Type) =>
		ComponentFactoryObject<Type>;

// tw[...]
export type TwProperties = {
	[Tag in IntrinsicTag]: ComponentFactoryObject<Tag>;
};

// tw(...) or tw[...]
export type Tw = TwFunction & TwProperties;
