import Image from 'next/image';

export default function Background({className}: {className?: string}) {
	return (
		<>
			<div className="fixed w-full shadow-lg z-10"></div>
			<div className="fixed w-full h-screen bg-gradient-to-r from-dark-primary to-deep-primary" />
			<Image
				className={`absolute left-[24%] w-[76%] ${className}`}
				src="/prisma-bg.svg"
				width={1600}
				height={682}
				alt=""
			/>
		</>
	);
}
