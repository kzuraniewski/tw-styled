import React from 'react';
import cn from '@/lib/cn';
import {
	isTemplateArgumentPrimitive,
	StyleableElementType,
	TemplateResolver,
	StyledComponentFactory,
} from '@/types';

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
) => {
	const factory: StyledComponentFactory<Type> =
		(classes, ...args) =>
		(props) => {
			const { className: externalClasses, ...other } = props;
			const parsedClasses = resolveTemplate(props, classes, ...args);

			return React.createElement(type, {
				className: cn(parsedClasses, externalClasses),
				...other,
			});
		};

	return factory;
};
