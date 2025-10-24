import {FC, PropsWithChildren, useEffect, useRef} from 'react';
import {useModal} from 'react-modal-hook';
import {emojisplosions} from 'emojisplosion';

interface Props {
	open: boolean;
	onClose: () => void;
	title: string;
	maxWidth?: string;
	hasHeader?: boolean;
	confetti?: boolean;
}

export const Modal: FC<PropsWithChildren<Props>> = ({
	open,
	onClose,
	title,
	maxWidth = 'max-w-md',
	children,
	hasHeader = true,
	confetti = false
}) => {
	const confettiTriggered = useRef(false);

	const [showModal, hideModal] = useModal(
		() => (
			<>
				{/* Backdrop with blur effect */}
				<div
					className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998] supports-[backdrop-filter]:bg-black/20"
					onClick={() => {
						hideModal();
						onClose();
					}}
					onKeyDown={e => {
						if (e.key === 'Escape') {
							hideModal();
							onClose();
						}
					}}
					role="button"
					tabIndex={0}
					aria-label="Close modal"
				/>

				{/* Modal */}
				<div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 pointer-events-none">
					<div
						className={`bg-black/70 rounded-2xl shadow-xl ${maxWidth} w-full max-h-[80vh] overflow-hidden pointer-events-auto`}
						role="dialog"
						aria-modal="true"
						aria-labelledby="modal-title"
						onClick={e => e.stopPropagation()}>
						{/* Header */}
						{hasHeader && (
							<div className="flex items-center justify-between p-6 border-b border-gray-200">
								<h2 id="modal-title" className="text-xl font-semibold text-gray-900">{title}</h2>
								<button
									type="button"
									onClick={() => {
										hideModal();
										onClose();
									}}
									className="text-gray-400 hover:text-gray-500 transition-colors cursor-pointer">
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						)}

						{/* Content */}
						{children}
					</div>
				</div>
			</>
		),
		[onClose, title, maxWidth, children, hasHeader]
	);

	useEffect(() => {
		if (open) {
			showModal();
			if (confetti && !confettiTriggered.current) {
				confettiTriggered.current = true;
				// Trigger confetti explosion
				const {cancel} = emojisplosions({
					emojis: ['🎉', '🎊', '✨'],
					emojiCount: 20,
					position: {
						x: window.innerWidth / 2,
						y: window.innerHeight / 2
					},
					physics: {
						gravity: 0.3
					}
				});
				// Clean up after 1.5 seconds
				setTimeout(cancel, 1500);
			}
		} else {
			hideModal();
			confettiTriggered.current = false;
		}
	}, [open, showModal, hideModal, confetti]);

	return null;
};
