import React, { forwardRef } from 'react';
import cn from '@/lib/cn';
import {
	isTemplateArgumentPrimitive,
	StyleableElementType,
	UnknownProps,
	TemplateArgument,
	TemplateResolver,
	Component,
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

export const createStyledComponentFactory =
	<Type extends StyleableElementType>(type: Type) =>
	<CustomProps extends UnknownProps = undefined>(
		classes: TemplateStringsArray,
		...args: TemplateArgument<React.ComponentProps<Type> & CustomProps>[]
	) =>
		forwardRef<Type, React.ComponentProps<Type> & CustomProps>(
			(props, ref) => {
				const { className: externalClasses, ...other } = props;
				const parsedClasses = resolveTemplate(props, classes, ...args);

				return React.createElement(type, {
					className: cn(parsedClasses, externalClasses),
					ref,
					...other,
				});
			}
		) as Component<React.ComponentProps<Type>>;
