import {promises as fs} from 'fs';
import path from 'path';

async function main() {
	const BASE_TOKEN_NAME = process.argv[2];
	if (!BASE_TOKEN_NAME) {
		console.error('BASE_TOKEN_NAME argument is required');
		process.exit(1);
	}

	const sourceDir = path.join(__dirname, 'packages', 'prisma');
	const targetDir = path.join(__dirname, 'packages', BASE_TOKEN_NAME.toLowerCase());

	await fs.mkdir(targetDir, {recursive: true});
	await copyDir(sourceDir, targetDir);

	const envPath = path.join(targetDir, '.env');
	const envExamplePath = path.join(sourceDir, '.env.example');

	await fs.copyFile(envExamplePath, envPath);
	let envContent = await fs.readFile(envPath, 'utf8');

	envContent = envContent.replace(/PRISMA/g, BASE_TOKEN_NAME.toUpperCase());
	envContent = envContent.replace(/^NEXT_PUBLIC_LEGACY_STAKER.*\n?/gm, '');

	await fs.writeFile(envPath, envContent, 'utf8');

	const rootPackageJsonPath = path.join(__dirname, 'package.json');
	const rootPackageJson = JSON.parse(await fs.readFile(rootPackageJsonPath, 'utf8'));

	rootPackageJson.scripts = {
		...rootPackageJson.scripts,
		[`dev:${BASE_TOKEN_NAME}`]: `cd packages/${BASE_TOKEN_NAME} && NEXT_TELEMETRY_DISABLED=1 next dev`,
		[`build:${BASE_TOKEN_NAME}`]: `cd packages/${BASE_TOKEN_NAME} && next build`,
		[`lint:${BASE_TOKEN_NAME}`]: `cd packages/${BASE_TOKEN_NAME} && NEXT_TELEMETRY_DISABLED=1 next lint`,
		[`lint:fix:${BASE_TOKEN_NAME}`]: `cd packages/${BASE_TOKEN_NAME} && NEXT_TELEMETRY_DISABLED=1 next lint --fix`
	};

	await fs.writeFile(rootPackageJsonPath, JSON.stringify(rootPackageJson, null, 2), 'utf8');

	console.log(`👹 yLocker UI app ${BASE_TOKEN_NAME} created successfully`);
}

async function copyDir(src: string, dest: string) {
	const entries = await fs.readdir(src, {withFileTypes: true});
	await fs.mkdir(dest, {recursive: true});

	for (const entry of entries) {
		const srcPath = path.join(src, entry.name);
		const destPath = path.join(dest, entry.name);

		if (entry.isDirectory()) {
			await copyDir(srcPath, destPath);
		} else {
			await fs.copyFile(srcPath, destPath);
		}
	}
}

main().catch(err => {
	console.error(err);
	process.exit(1);
});
