import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });
import Web3 from 'web3';
import fs from 'fs-extra'
import {db3,account,ipfs} from '../models/ipfs.js'

const PRIVATE_KEY = process.env.PRIVATE_KEY
const router = express.Router();
const upload = multer({ dest: 'proposalsfiles/' });

router.post('/post', upload.single('file'), async (req, res) => {
    try {
        let proposalInfo = req.body;
        const file = req.file;
        
        const buffer = fs.readFileSync(file.path)
        const result = await ipfs.add(buffer)
        let cid = result.path
        console.log('cid :',result.path);

        fs.unlink(file.path, (err) => {
            if (err) {
              console.log('not deleted');
            }
            console.log('File deleted successfully.');
        });

        const storeMetadataOnEthereum = async () => {
            const cidString = JSON.stringify(cid);
            const data = web3.utils.toHex(cidString);

            const gasEstimate = await web3.eth.estimateGas({
                from: account.address,
                to: account.address,
                value: web3.utils.toWei('0.01', 'ether'),
                data: data,
            });

            const tx = {
                from: account.address,
                to: account.address,
                value: web3.utils.toWei('0.01', 'ether'),
                gas: gasEstimate,
                maxPriorityFeePerGas: web3.utils.toWei('2', 'gwei'),
                maxFeePerGas: web3.utils.toWei('50', 'gwei'),
                data: data,
            };

            const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
            const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            console.log('Transaction hash:', txReceipt.transactionHash);
            return txReceipt.transactionHash;
        };

        const txHash = await storeMetadataOnEthereum(cid);
        
        skillData = { ...skillData, fileCID: cid, _id:txHash };
        await db1.put(skillData);

        res.status(200).json({ message: "Skill stored successfully" });
    } catch (error) {
        console.error("Error storing profile data:", error);
        res.status(500).json({ error: "Failed to store profile data" });
    }
});

router.get('/info', async (req, res) => {
    try {
        const proposals = await db3.query('');
        if (proposals) {
            res.status(200).json(proposals);  
        } else {
            res.status(404).json({ error: "proposals not found."});
        }
    } catch (error) {
        console.error("Error retrieving profile data:", error);
        res.status(500).json({ error: "Failed to retrieve profile data" });
    }
});

export default router;