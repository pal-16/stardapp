import ArweaveSigner from "arseeding-arbundles/src/signing/chains/ArweaveSigner";
import { createAndSubmitItem } from 'arseeding-js/cjs/submitOrder';
import axios from "axios";
import * as crypto from "crypto";
import express from 'express';
import fileUpload, { UploadedFile } from "express-fileupload";
import { getItemMeta } from 'arseeding-js';

export const paramMissingError = 'One or more of the required parameters was missing.';

type AlgoList = {
  [key: string]: {
    keyLength: number,
    ivLength: number,
  }
}

export const algoList: AlgoList = {
  'des': {
    keyLength: 8,
    ivLength: 8,
  }
}

// Types
type Params = {
  algo: string;
  key: string;
  salt: string;
};

type CryptFileFunction = (
  file: UploadedFile,
  decrypt: boolean,
  body: Params
) => Buffer;

type ArseedOrder = {
  itemId: string,
  size: number,
  bundler: string,
  currency: string,
  decimals: number,
  fee: string,
  paymentExpiredTime: number,
  expectedBlock: number
}

// File encryption using parameters and salt
const cryptFileWithSalt: CryptFileFunction = (
  file,
  decrypt = false,
  {
    algo = "aes-256-ctr",
    key = crypto.randomBytes(16).toString("hex"),
    salt = crypto.randomBytes(8).toString("hex"),
  }
): Buffer => {
  if (!decrypt) {
    const cipher = crypto.createCipheriv(algo, key, salt);
    const crypted = Buffer.concat([cipher.update(file.data), cipher.final()]);
    return crypted;
  } else {
    const cipher = crypto.createDecipheriv(algo, key, salt);
    const decrypted = Buffer.concat([cipher.update(file.data), cipher.final()]);
    return decrypted;
  }
};


// Checks if the file exists
const checkFile = (files: fileUpload.FileArray | undefined): boolean => {
  if (!files || !files.file) {
    return false;
  } else return true;
};

// Checks if every needed parametes exist
const checkParams = ({ algo, key, salt }: Params): boolean => {
  if (!algo || !key || !salt) {
    return false;
  }
  const chosenAlgo = algoList[algo]
  if (!chosenAlgo || key.length !== chosenAlgo.keyLength || salt.length !== chosenAlgo.ivLength) {
    return false
  }
  else return true;
};

// Set proper headers for the response
const setupHeaders = (res: express.Response, file?: UploadedFile | undefined) => {
  if (file) {
    res.writeHead(200, {
      'Content-Type': file.mimetype,
      'Content-disposition': 'attachment;filename=' + 'encrypted_' + file.name,
      'Connection': 'close',
    })
  } else {
    res.writeHead(200, {
      'Connection': 'close'
    })
  }
}

const listFilesByBucket = async ({chainsafeBucketUrl} : {chainsafeBucketUrl: string}): Promise<{data:any, error:any}> => {
  try {
    const resp = await axios({
      method: 'post',
      url: `${chainsafeBucketUrl}/ls`,
      headers: {
        'Authorization': `Bearer ${process.env.CHAINSAFE_KEY_SECRET}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        "path": `/`
      })
    });
    return {data: resp.data, error: undefined};
  } catch (error) {
    return {data: undefined, error: error};
  }
};

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
}

export { cryptFileWithSalt, checkFile, checkParams, setupHeaders, listFilesByBucket, getRandomInt };
