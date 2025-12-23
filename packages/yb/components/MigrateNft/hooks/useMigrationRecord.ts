import {useCallback, useEffect, useState} from 'react';

const MIGRATION_STORAGE_KEY = 'yb-migration-completed';

export type MigrationRecord = {
	address: string;
	amount: string;
	timestamp: number;
};

function getMigrationRecord(address: string): MigrationRecord | null {
	if (typeof window === 'undefined') return null;
	try {
		const stored = localStorage.getItem(MIGRATION_STORAGE_KEY);
		if (!stored) return null;
		const record = JSON.parse(stored) as MigrationRecord;
		if (record.address.toLowerCase() === address.toLowerCase()) {
			return record;
		}
	} catch {
		// ignore
	}
	return null;
}

function setMigrationRecord(address: string, amount: string): MigrationRecord {
	const record: MigrationRecord = {
		address,
		amount,
		timestamp: Date.now()
	};
	if (typeof window !== 'undefined') {
		localStorage.setItem(MIGRATION_STORAGE_KEY, JSON.stringify(record));
	}
	return record;
}

export function useMigrationRecord(address?: string) {
	const [record, setRecord] = useState<MigrationRecord | null>(null);

	useEffect(() => {
		if (address) {
			const existing = getMigrationRecord(address);
			setRecord(existing);
		} else {
			setRecord(null);
		}
	}, [address]);

	const saveMigration = useCallback(
		(amount: string) => {
			if (!address) return;
			const newRecord = setMigrationRecord(address, amount);
			setRecord(newRecord);
		},
		[address]
	);

	return {record, saveMigration};
}
