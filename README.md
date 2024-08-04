# yLockers Frontend Monorepo

## Live

- yPrisma, https://yprisma.yearn.fi

- yCrv, https://ycrv.yearn.fi

## About

- https://docs.yearn.finance/getting-started/products/ylockers/overview

## LFG

Install bun, https://bun.sh/docs/installation

```bash
git clone git@github.com:yearn/ylockers-ui.git

cd ylockers-ui

cp .env.example .env

# configure .env

bun i

bun dev:{assetName}
```

## How to add a new locker frontend


### setup
```bash
bunx create-next-app@14.1.3 packages/{assetName}
cd {assetName}
bun add {TODO}
cd ..
# add dev:{assetName} script to packages.json
bun dev:{assetName}
```
{maybe les write a copy paste script for this instead}

### packages/--lib integration
- Add `"--lib": "0.1.0"` to the new project's package.json dependencies.
- Add `../--lib/components/**/*.{js,ts,jsx,tsx,mdx}` to the `content` array in the project's `tailwind.config.js`.

### tailwind
import libConfig from "--lib/tailwind.config"
import { deepMerge } from "--lib/tools/object"
...
config.theme = deepMerge(libConfig.theme, config.theme);
export default config;


## Deployment

Push to `main` branch to deploy a new version. Pull requests have independent preview links created when open.

## Support

- Reach https://discord.gg/yearn at #support channel if you have any issues using the live URL.

## Dev notes

### wagmi, viem, react-query
Because wagmi, viem, and react-query change often, the version numbers are fixed in package.json. It's great to keep these dependencies upgraded, but make sure versions are the same across all packages.
