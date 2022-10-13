# TaylorKlay NFT Smart contract

TaylorKlay NFT Smart contract is already deployed at 0x23278452a4847B5fc6dD23A49fc6Aa70F9226fBb on Klaytn Baobab chain (https://baobab.scope.klaytn.com/account/0x23278452a4847B5fc6dD23A49fc6Aa70F9226fBb). Here are the steps to compile and deploy the same.

## Installation
1. Clone this repo:

```shell
git clone https://github.com/ankitshubham97/stardapp.git
```

2. Install NPM packages:

```shell
cd stardapp/smart-contract
npm install
```
3. : Create a .env file and paste the code below

```shell
  KLAYTN_URL='https://api.baobab.klaytn.net:8651'
  PRIVATE_KEY=<Your Klaytn wallet private key>

```

4. Compile Contract

```shell
  npx hardhat compile
```

5. Deployment to Klaytn Testnet

```shell
npx hardhat run scripts/deploy.ts --network klaytn
```
