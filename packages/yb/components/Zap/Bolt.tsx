import {cn} from '--lib/tools/tailwind';
import {useCallback, useMemo} from 'react';
import {BsFillLightningFill} from 'react-icons/bs';
import {useParameters} from './Parameters';

export default function Bolt() {
	const {theme, reverse} = useParameters();

	const enabled = useMemo(() => {
		return !theme || theme === 'default';
	}, [theme]);

	const cursor = useMemo(() => {
		if (enabled) return 'cursor-pointer';
		return '';
	}, [enabled]);

	const bg = useMemo(() => {
		return '';
	}, [theme]);

	const fill = useMemo(() => {
		return 'fill-deeper-primary';
	}, [theme]);

	const divHover = useMemo(() => {
		if (enabled) return '';
		return '';
	}, [enabled]);

	const iconHover = useMemo(() => {
		if (enabled) return 'group-hover:fill-light-primary';
		return '';
	}, [enabled]);

	const onClick = useCallback(() => {
		if (enabled) reverse();
	}, [enabled, reverse]);

	return (
		<div
			onClick={onClick}
			className={cn(
				`group
    p-1 border-8 border-deeper-primary
    bg-input-bg rounded-xl pointer-events-auto`,
				bg,
				cursor,
				divHover
			)}>
			<BsFillLightningFill
				size={24}
				className={cn(fill, iconHover)}
			/>
		</div>
	);
}
