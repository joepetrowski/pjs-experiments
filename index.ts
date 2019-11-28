/*
Getting Started
$ yarn init
$ yarn add typescript ts-node
To run:
$ yarn start
*/

// Import
import { ApiPromise, WsProvider } from '@polkadot/api';

// Construct
// Local node: ws://127.0.0.1:9944
// Parity node: wss://kusama-rpc.polkadot.io/
const wsProvider = new WsProvider('wss://kusama-rpc.polkadot.io/');
const DOT_DECIMAL = 1_000_000_000_000;

// Format a number to display with commas every three digits.
// For example, 1234567 becomes 1,234,567.
function formatWithCommas(num: number) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// Convert a Unix timestamp to a string of "YYYY-month-DD HH:MM:SS".
function timeConverter(unix: number) {
	let date = new Date(unix);
	let year = date.getFullYear();
	let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	let month = months[date.getMonth()];
	let day = date.getDate();
	let hour = date.getHours();
	let minute = date.getMinutes();
	let second = date.getSeconds();
	let datestring = year.toString() + '-' + month + '-' + day.toString() +
		' ' + hour.toString() + ':' + minute.toString() + ':' + second.toString();
	return datestring;
}

async function main(){
	const api = await ApiPromise.create({ provider: wsProvider });

	const ADDR = 'DPs2tExwULx8tRc2N7ECrWTzrPhbdVBApLVDiugkusaVH8Q';

	const [genesisHash, now, balance] = await Promise.all([
		api.genesisHash.toHex(),
		api.query.timestamp.now(),
		api.query.balances.freeBalance(ADDR)
	])

	let date_string = timeConverter(now.toNumber());
	let human_balance = formatWithCommas(balance.toNumber() / DOT_DECIMAL);

	console.log(`Genesis Hash: ${genesisHash}`);
	console.log(`The time is ${date_string}`);
	console.log(`${ADDR} has ${human_balance} KSM`);

	process.exit(0);
}

main()
