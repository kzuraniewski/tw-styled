import classNames, { ArgumentArray } from 'classnames';
import { twMerge } from 'tailwind-merge';

const cn = (...args: ArgumentArray) => twMerge(classNames(args));

export default cn;
