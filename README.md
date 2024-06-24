# yLockers Frontend Monorepo

## Live

- yPrisma, https://yprisma.yearn.fi

- yCrv, https://ycrv.yearn.fi

## About

- https://docs.yearn.finance/getting-started/products/ylockers/overview

## LFG

First install bun, https://bun.sh/docs/installation

```bash
git clone git@github.com:MarcoWorms/ylockers-ui.git

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

### packages/lib integration
- Add `"lib": "0.1.0"` to the new project's package.json dependencies.
- Add `../lib/components/**/*.{js,ts,jsx,tsx,mdx}` to the `content` array in the project's `tailwind.config.js`.

## Deployment

Push to `main` branch to deploy a new version. Pull requests have independent preview links created when open.

## Support

- Reach https://discord.gg/yearn at #support channel if you have any issues using the live URL.

## Dev notes

### wagmi, viem, react-query
Because wagmi, viem, and react-query change often, the versions are frozen. Keep these versions in sync across all packages.
