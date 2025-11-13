'use client';

import useData from '../hooks/useData';
import InputExecute from '../components/InputExecute';
import abis from '../abis';
import {TEnv} from '../tools/envType';

const abi = {
	yPrisma: abis.yPrisma,
	yYB: abis.yYB
};

export default function Mint({
	yDaemon,
	env,
	className,
	contract = 'yPrisma'
}: {
	yDaemon: string;
	env: TEnv;
	className?: string;
	contract?: 'yPrisma' | 'yYB';
}) {
	const {data} = useData(yDaemon, env);

	const functionName = {
		yPrisma: 'mint',
		yYB: 'lock'
	}[contract];

	return (
		<InputExecute
			className={className}
			yDaemon={yDaemon}
			env={env}
			task={{
				verb: 'mint',
				token: data.asset,
				needsApproval: true,
				parameters: {
					address: env.lockerToken,
					abi: abi[contract],
					functionName,
					args: (amount: bigint) => [amount, data.account]
				}
			}}
		/>
	);
}
