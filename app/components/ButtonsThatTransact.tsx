import { useContractWrite, useWaitForTransactionReceipt } from 'wagmi';
import { yPRISMA_ADDRESS, YEARN_BOOSTED_STAKER_ADDRESS } from './constants';
import YearnBoostedStakerABI from '../abis/YearnBoostedStaker.json';
import ERC20ABI from '../abis/ERC20.json';
import ethers from 'ethers';

// Approval function
const ApproveYPRISMA = () => {
  const { data, write } = useContractWrite({
    address: yPRISMA_ADDRESS,
    abi: ERC20ABI,
    functionName: 'approve',
    args: [YEARN_BOOSTED_STAKER_ADDRESS, ethers.constants.MaxUint256],
  });

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: data?.hash,
  });

  return (
    <Button disabled={!write || isLoading} onClick={() => write()}>
      {isLoading ? 'Approving...' : 'Approve yPRISMA'}
    </Button>
  );
};

// Deposit function
const DepositYPRISMA = (amount) => {
  const { data, write } = useContractWrite({
    address: YEARN_BOOSTED_STAKER_ADDRESS,
    abi: YearnBoostedStakerABI,
    functionName: 'deposit',
    args: [amount],
  });

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: data?.hash,
  });

  return (
    <Button disabled={!write || isLoading} onClick={() => write()}>
      {isLoading ? 'Depositing...' : 'Deposit yPRISMA'}
    </Button>
  );
};

// Withdraw function
const WithdrawYPRISMA = (amount) => {
  const { data, write } = useContractWrite({
    address: YEARN_BOOSTED_STAKER_ADDRESS,
    abi: YearnBoostedStakerABI,
    functionName: 'withdraw',
    args: [amount, userAddress],
  });

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: data?.hash,
  });

  return (
    <Button disabled={!write || isLoading} onClick={() => write()}>
      {isLoading ? 'Withdrawing...' : 'Withdraw yPRISMA'}
    </Button>
  );
};