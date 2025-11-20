import Image from 'next/image';

export default function Background({className}: {className?: string}) {
	return <div className="fixed w-full h-screen bg-gradient-to-b from-[#262626] to-[#1B1B1B]" />;
}
