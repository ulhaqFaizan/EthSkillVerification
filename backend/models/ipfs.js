import { gossipsub } from "@chainsafe/libp2p-gossipsub";
import { identify } from "@libp2p/identify";
import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });
import Web3 from 'web3';
import * as IPFS from 'ipfs-core'
import OrbitDB from 'orbit-db'

const INFURA_API_KEY = process.env.INFURA_PROJECT_ID
const PRIVATE_KEY = process.env.PRIVATE_KEY

const web3 = new Web3(new Web3.providers.HttpProvider(`https://sepolia.infura.io/v3/${INFURA_API_KEY}`));
const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

const Libp2pOptions = {
    services: {
      pubsub: gossipsub({
        allowPublishToZeroTopicPeers: true
      }),
      identify: identify()
    }
}

let db1,db2,db3,ipfs;

;(async function () {
    ipfs = await IPFS.create()
    const orbitdb = await OrbitDB.createInstance(ipfs)
    db1 = await orbitdb.docstore('unverifiedSkills');
    db2 = await orbitdb.docstore('verifiedSkills');
    db3 = await orbitdb.docstore('proposals');
    const address1 = db1.address
    const address2 = db2.address
    const address3 = db3.address
    console.log('address1: ',address1)
    console.log('address2: ',address2)
    console.log('address3: ',address3)
})()

export {db1,db2,db3,account,ipfs}