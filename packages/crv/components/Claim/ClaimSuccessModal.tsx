import type {FC} from 'react';
import {Modal} from '../Modal';
import Button from '--lib/components/Button';

interface Props {
	open: boolean;
	onClose: () => void;
}

export const ClaimSuccessModal: FC<Props> = ({open, onClose}) => {
	return (
		<Modal
			open={open}
			onClose={onClose}
			title=""
			maxWidth="max-w-sm"
			hasHeader={false}
			confetti={true}>
			<div className="p-6 text-center space-y-4">
				{/* Success Icon */}
				<div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
					<svg
						className="w-8 h-8 text-green-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>

				{/* Success Text */}
				<h3 className="text-xl font-semibold text-white mb-2">Claim Success!</h3>

				{/* Dismiss Button */}
				<Button
					onClick={onClose}
					className="bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-700 disabled:text-neutral-400 text-white w-full">
					Dismiss
				</Button>
			</div>
		</Modal>
	);
};
