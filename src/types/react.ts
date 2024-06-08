import intrinsicTags from '@/intrinsicTags';

export type IntrinsicTag = (typeof intrinsicTags)[number];

export type UnknownProps = Record<string, unknown> | object | undefined;

export type UnknownPropsWithClassName = UnknownProps & { className?: string };

export type Component<Props extends UnknownProps = undefined> = (
	props: Props
) => JSX.Element;
