var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

var belCurrencyUnits = [
	{
		name:"BEL",
		multiplier:1,
		default:true,
		values:["", "bel", "BEL"],
		decimalPlaces:8
	},
	{
		name:"lite",
		multiplier:1000,
		values:["lite"],
		decimalPlaces:5
	},
	{
		name:"photon",
		multiplier:1000000,
		values:["photon"],
		decimalPlaces:2
	},
	{
		name:"satoshi",
		multiplier:100000000,
		values:["satoshi", "dor"],
		decimalPlaces:0
	}
];

module.exports = {
	name:"Bells",
	ticker:"BEL",
	logoUrl:"/img/logo/bel.png",
	siteTitle:"Bells Explorer",
	nodeTitle:"Bells Full Node",
	nodeUrl:"https://github.com/bellscoin/bellscoin",
	demoSiteUrl: "https://explorer.minebells.com",
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/hashstream/pools/master/pools.json",
	],
	maxBlockWeight: 4000000,
	currencyUnits:belCurrencyUnits,
	currencyUnitsByName:{"BEL":belCurrencyUnits[0], "lite":belCurrencyUnits[1], "photon":belCurrencyUnits[2], "satoshi":belCurrencyUnits[3]},
	baseCurrencyUnit:belCurrencyUnits[3],
	feeSatoshiPerByteBucketMaxima: [5, 10, 25, 50, 100, 150, 200, 250],
	genesisBlockHash: "e5be24df57c43a82d15c2f06bda961296948f8f8eb48501bed1efb929afe0698",
	genesisCoinbaseTransactionId: "5b2a3f53f605d62c53e62932dac6925e3d74afa5a4b459745c36d42d0ed26a69",
	genesisCoinbaseTransaction: {
		"txid":"5b2a3f53f605d62c53e62932dac6925e3d74afa5a4b459745c36d42d0ed26a69",
		"hash":"5b2a3f53f605d62c53e62932dac6925e3d74afa5a4b459745c36d42d0ed26a69",
		"blockhash":"e5be24df57c43a82d15c2f06bda961296948f8f8eb48501bed1efb929afe0698",
		"version":1,
		"locktime":0,
		"size":143,
		"vsize":143,
		"time":1383509530,
		"blocktime":1383509530,
		"vin":[
			{
				"prev_out":{
					"hash":"0000000000000000000000000000000000000000000000000000000000000000",
					"n":4294967295
				},
				"coinbase":"04ffff001d0104084e696e746f6e646f"
			}
		],
		"vout":[
			{
				"value":"88.00000000",
				"n":0,
				"scriptPubKey":{
					"hex":"41040184710fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9ac OP_CHECKSIG",
					"type":"pubkey",
					"reqSigs":1,
					"addresses":[
						"BQ5BdsJcLntYNo4Y3bihEukHLpYYNRtY3r"
					]
				}
			}
		]
	},
	historicalData: [
		{
			type: "blockheight",
			date: "2013-11-03",
			blockHeight: 0,
			blockHash: "e5be24df57c43a82d15c2f06bda961296948f8f8eb48501bed1efb929afe0698",
			summary: "The Bells genesis block.",
			alertBodyHtml: "This is the first block in the Bells blockchain.",
			referenceUrl: "https://github.com/bellscoin/bellscoin"
		}
	],
	exchangeRateData:{
		jsonUrl:"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bellscoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en",
		exchangedCurrencyName:"usd",
		responseBodySelectorFunction:function(responseBody) {
			if (responseBody[0] && responseBody[0].current_price) {
				return responseBody[0].current_price;
			}

			return -1;
		}
	},
	blockRewardFunction:function(blockHeight) {
		var eras = [ new Decimal8(50) ];
		for (var i = 1; i < 34; i++) {
			var previous = eras[i - 1];
			eras.push(new Decimal8(previous).dividedBy(2));
		}

		var index = Math.floor(blockHeight / 840000);

		return eras[index];
	}
};
