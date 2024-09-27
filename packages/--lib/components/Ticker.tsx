'use client';

import {fNumber, fUSD} from '../tools/format';
import {usePeg} from '../hooks/usePeg';
import usePrices from '../hooks/usePrices';
import {useMemo} from 'react';
import {TEnv} from '../tools/envType';

function Price({name, price, className}: {name: string; price: string; className?: string}) {
	return (
		<div
			className={`
    flex items-center gap-3
    ${className}
  `}>
			<div className="font-thin">{name}</div>
			<div className="font-mono opacity-90">{price}</div>
		</div>
	);
}

export default function Ticker({yDaemon, env}: {yDaemon: string; env: TEnv}) {
	const {data: prices} = usePrices(yDaemon, env, [env.baseToken, env.lockerToken]);
	const peg = usePeg(env);

	const pegDisplay = useMemo(() => {
		if (peg === 0) return '-.---:1';
		return `${fNumber(peg, {fixed: 3})}:1`;
	}, [peg]);

	return (
		<div
			className={`
    absolute z-[100] top-[82px] sm:top-0 left-0 w-full sm:h-[70px]
    px-5 sm:px-0
    flex items-center justify-end sm:justify-center
    pointer-events-none
    `}>
			<div
				className={`
      flex flex-col items-end justify-end gap-3 text-sm
      sm:flex-row sm:items-center sm:justify-center sm:gap-8 sm:text-base`}>
				<Price
					name={env.lockerTokenName}
					price={fUSD(prices[env.lockerToken], {fixed: 3})}
				/>
				<Price
					name={env.baseTokenName}
					price={fUSD(prices[env.baseToken] ?? 0, {fixed: 3})}
				/>
				<Price
					name="PEG"
					price={pegDisplay}
				/>
			</div>
		</div>
	);
}
