import {useParams} from 'next/navigation';

export function useTab() {
	const params = useParams();
	return params.tab as string;
}
