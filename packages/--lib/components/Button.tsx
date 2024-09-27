'use client';

import {cn} from '--lib/tools/tailwind';
import React, {forwardRef, ButtonHTMLAttributes, useMemo} from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	className?: string;
	theme?: 'default' | 'transparent' | 'onit';
	onClick?: () => void;
	noInput?: boolean;
};

const Button = forwardRef<HTMLButtonElement, Props>(({className, theme, onClick, children, noInput, ...props}, ref) => {
	const bg = useMemo(() => {
		if (noInput) return 'bg-yellow-100';
		if (theme === 'transparent') return 'bg-transparent';
		if (theme === 'onit') return 'bg-transparent hover:bg-light-primary';
		return 'bg-bright-primary hover:bg-light-primary';
	}, [theme, noInput]);

	const border = useMemo(() => {
		if (theme === 'transparent') return 'border-2 border-bright-primary hover:border-light-primary';
		if (theme === 'onit') return 'border-2 border-deeper-primary';
		return 'border-2 border-transparent';
	}, [theme]);

	const animate = useMemo(() => {
		if (theme === 'onit' && noInput) return 'rainbow-no-bg';
		if (theme === 'onit') return 'rainbow';
		return '';
	}, [theme, noInput]);

	return (
		<button
			onClick={onClick}
			ref={ref}
			{...props}
			className={cn(
				`
    px-12 py-2 font-bold rounded-lg
    disabled:bg-disabled-bg disabled:text-disabled-text
    whitespace-nowrap`,
				border,
				bg,
				animate,
				className
			)}>
			{children}
		</button>
	);
});

Button.displayName = 'Button';

export default Button;
