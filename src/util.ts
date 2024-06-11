import React from 'react';
import cn from './lib/cn';
import {
	isTemplateArgumentPrimitive,
	StyleableElementType,
	TemplateResolver,
	ComponentFactoryObject,
	ComponentFactoryWithoutDefault,
	PropsFunction,
} from './types';

export const resolveTemplate: TemplateResolver = (
	context,
	templateStrings,
	...args
) => {
	return templateStrings
		.map((clazz, index) => {
			const argument = args[index];

			if (!argument) return clazz;
			if (isTemplateArgumentPrimitive(argument))
				return `${clazz} ${argument}`;

			return `${clazz} ${argument(context)}`;
		})
		.join(' ');
};

export const createFactoryOfType = <Type extends StyleableElementType>(
	type: Type
): ComponentFactoryObject<Type> => {
	const factoryWithoutDefault: ComponentFactoryWithoutDefault<Type> =
		(classes, ...args) =>
		(props) => {
			const { className: externalClasses, ...other } = props;
			const parsedClasses = resolveTemplate(props, classes, ...args);

			return React.createElement(type, {
				className: cn(parsedClasses, externalClasses),
				...other,
			});
		};

	const propsFunction: PropsFunction<Type> =
		(defaultProps) =>
		(classes, ...args) =>
		(props) => {
			const propsWithDefault = {
				...defaultProps,
				...props,
			};

			const parsedClasses = resolveTemplate(
				propsWithDefault,
				classes,
				...args
			);

			const { className: externalClasses, ...other } = propsWithDefault;
			return React.createElement(type, {
				className: cn(parsedClasses, externalClasses),
				...other,
			});
		};

	const factory = factoryWithoutDefault as ComponentFactoryObject<Type>;
	factory.props = propsFunction;

	return factory;
};
