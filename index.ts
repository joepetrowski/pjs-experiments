/*
Getting Started
$ yarn init
$ yarn add typescript ts-node
To run:
$ yarn start
*/

// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
// import { u64 } from '@polkadot/types';

// Construct ws://127.0.0.1:9944
const wsProvider = new WsProvider('wss://kusama-rpc.polkadot.io/');
const DOT_DECIMAL = 1_000_000_000_000;

async function main(){
	const api = await ApiPromise.create({ provider: wsProvider });

	const ADDR = 'DPs2tExwULx8tRc2N7ECrWTzrPhbdVBApLVDiugkusaVH8Q';

	const [genesisHash, now, balance] = await Promise.all([
		api.genesisHash.toHex(),
		api.query.timestamp.now(),
		api.query.balances.freeBalance(ADDR)
	])

	console.log(genesisHash);
	console.log(`The time is ${now}`);
	console.log(`${ADDR} has ${balance.toNumber() / DOT_DECIMAL} KSM`);

	process.exit(0);
}

main()
