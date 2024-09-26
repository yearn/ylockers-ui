import {fTokens} from '--lib/tools/format';
import Link from 'next/link';
import {useBalance} from './useBalance';
import Withdraw from './Withdraw';

export default function LegacyStakerBanner() {
	const balance = useBalance();
	if (balance === 0n) return <></>;
	return (
		<div className="w-full bg-yellow-200 text-black text-center p-2 z-20">
			<b>⚠️ Warning: </b>Your wallet has balance of {fTokens(balance, 18)} yPRISMA in the deprecated yPRISMA
			staker.
			<Withdraw className="mt-2" />
			Use the above button to withdraw + claim pending rewards so that you can begin your migration!
			<Link
				className="underline"
				href="https://blog.yearn.fi/ybs-yprisma-launch"
				target="_blank">
				Read more.
			</Link>
		</div>
	);
}
