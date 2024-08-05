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
bun i
bun dev:{BASE_TOKEN_NAME}
```

## How to add a new locker ui app
1 - Run the create app script passing in the name of the your locker's base token.
```bash
bun create-ylockers-ui-app.ts {BASE_TOKEN_NAME}
```
Your app will be initialized at `packages/{BASE_TOKEN_NAME}` and can be run with `bun dev:{BASE_TOKEN_NAME}`.

2 - Open your app's .env at `packages/{BASE_TOKEN_NAME}/.env` and configure with appropriate values. Copy those to `packages/{BASE_TOKEN_NAME}/.env.example` too.

3 - To update your app's background start with `packages/{BASE_TOKEN_NAME}/components/Background.tsx`

4 - To update your app's vault list and filter, see `packages/{BASE_TOKEN_NAME}/app/app/[tab]/page.tsx#L65`

5 - You can also customize your app's colors by overriding the base pallete. The base pallete can be found in `packages/--lib/tailwind.config.ts`. To override a color, just copy it to your app's tailwind config located here, `packages/{BASE_TOKEN_NAME}/tailwind.config.ts`.


## Support

- Reach https://discord.gg/yearn at #support channel if you have any issues using the live URL.

## Dev notes

### wagmi, viem, react-query
Because wagmi, viem, and react-query change often, the version numbers are fixed in package.json. It's great to keep these dependencies upgraded, but make sure versions are the same across all packages.
