import Button from '--lib/components/Button';
import {cn} from '--lib/tools/tailwind';

export type StepStatus = 'completed' | 'active' | 'pending' | 'blocked';

export function StepIndicator({step, status}: {step: number; status: StepStatus}) {
	return (
		<div
			className={cn(
				'flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0 transition-colors',
				status === 'completed' && 'bg-green-500 text-white',
				status === 'active' && 'bg-bright-primary text-white',
				status === 'pending' && 'bg-neutral-600 text-neutral-400',
				status === 'blocked' && 'bg-charge-red/20 text-charge-red'
			)}>
			{status === 'completed' ? (
				<svg
					className="w-4 h-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={3}
						d="M5 13l4 4L19 7"
					/>
				</svg>
			) : (
				step
			)}
		</div>
	);
}

export function StepCard({
	step,
	status,
	title,
	description,
	disabled,
	isConfirming,
	onClick
}: {
	step: number;
	status: StepStatus;
	title: string;
	description?: string;
	disabled: boolean;
	isConfirming?: boolean;
	onClick: () => void;
}) {
	const buttonText = () => {
		if (status === 'completed') return 'Done';
		if (isConfirming) return 'Confirming...';
		return title;
	};

	return (
		<div
			className={cn(
				'flex-1 p-4 rounded-xl border transition-all flex flex-col',
				status === 'active' && 'bg-input-bg border-bright-primary',
				status === 'completed' && 'bg-black/20 border-green-500/30',
				status === 'pending' && 'bg-black/20 border-neutral-800',
				status === 'blocked' && 'bg-charge-red/5 border-charge-red/30'
			)}>
			<div className="flex items-start gap-3 mb-3 flex-1">
				<StepIndicator
					step={step}
					status={status}
				/>
				<div className="flex-1 min-w-0">
					<h3 className={cn('font-semibold', status === 'active' ? 'text-white' : 'text-neutral-500')}>
						{title}
					</h3>
					{description && (
						<p
							className={cn(
								'text-sm mt-1',
								status === 'active' ? 'text-neutral-300' : 'text-neutral-600'
							)}>
							{description}
						</p>
					)}
				</div>
			</div>
			<Button
				disabled={disabled || isConfirming}
				onClick={onClick}
				className={cn(
					'w-full py-2 mt-auto',
					status !== 'active' && '!bg-black/20 !text-neutral-600 border-transparent'
				)}>
				{buttonText()}
			</Button>
		</div>
	);
}
