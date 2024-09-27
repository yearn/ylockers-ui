'use client';

import useData, {TokenSchema} from '../hooks/useData';
import InputExecute from '--lib/components/InputExecute';
import abis from '../abis';
import {TEnv} from '../tools/envType';

export default function Unstake({yDaemon, env, className}: {yDaemon: string; env: TEnv; className?: string}) {
	const {data} = useData(yDaemon, env);
	return (
		<InputExecute
			className={className}
			yDaemon={yDaemon}
			env={env}
			task={{
				verb: 'unstake',
				token: TokenSchema.parse(data.staker),
				needsApproval: false,
				parameters: {
					address: env.boostedStaker,
					abi: abis.YearnBoostedStaker,
					functionName: 'unstake',
					args: (amount: bigint) => [amount, data.account]
				}
			}}
		/>
	);
}
