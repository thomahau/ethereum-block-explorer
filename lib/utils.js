import axios from 'axios';
import { utils } from 'ethers';

const url = process.env.NEXT_PUBLIC_NODE_URL;

async function makeRequests(method, paramArrays) {
  const requests = paramArrays.map((params, idx) => ({
    jsonrpc: '2.0',
    id: idx,
    method,
    params,
  }));

  const responses = await axios.all(requests.map(req => axios.post(url, req)));
  return responses.map(response => response.data.result);
}

// export async function getBlock(blockNumber) {
//   const blockNumberInHex = '0x' + parseInt(blockNumber).toString(16);
//   const block = await (await makeRequests('eth_getBlockByNumber', [[blockNumberInHex, true]]))[0];

//   return parseBlockData(block);
// }

export async function getLatestBlocks() {
  try {
    const latestBlock = await (await makeRequests('eth_getBlockByNumber', [['latest', true]]))[0];
    const latestBlockNumber = parseInt(latestBlock.number, 16);
    const pastBlocksParams = [...Array(9)].map((_, idx) => [utils.hexlify(latestBlockNumber - idx - 1), true]);
    const previousNineBlocks = await makeRequests('eth_getBlockByNumber', pastBlocksParams);
    const parsedBlocks = [latestBlock, ...previousNineBlocks].map(parseBlockData);

    return parsedBlocks;
  } catch (err) {
    console.error(err);
  }
}

export function parseBlockData(rawBlockData) {
  return {
    hash: rawBlockData.hash,
    timestamp: parseInt(rawBlockData.timestamp, 16),
    number: parseInt(rawBlockData.number, 16),
    txCount: rawBlockData.transactions.length,
  };
}

export function parseTransactionData() {}

export function hexToString(hex) {
  let str = '';

  for (let i = 0; i < hex.length; i += 2) {
    let v = parseInt(hex.substr(i, 2), 16);
    if (v) str += String.fromCharCode(v);
  }
  return str;
}
