import React from 'react';
import intrinsicTags from '../intrinsicTags';

export type IntrinsicTag = (typeof intrinsicTags)[number];

export type UnknownProps = Record<string, unknown> | object | undefined;

export type PropsWithClassName = { className?: string } & UnknownProps;

export type Component<Props extends UnknownProps = undefined> = (
	props: Props
) => React.JSX.Element;
