import crypto from 'libp2p-crypto'
import fs from 'fs'
import mh from 'multihashes'
import CID from 'cids'

const readKey = async () => {
  const buf = fs.readFileSync('./key_ge2tomjwg43dgobvg4zdctztmv2ecuzuiq2vqnszov3q')
  console.log(buf)
  const key = await crypto.keys.unmarshalPrivateKey(buf)
  const pubKey = key.public
  console.log(pubKey)
  console.log(pubKey.bytes.length)
  const digestUint8Array = await pubKey.hash()
  console.log('digestUint8Array=', digestUint8Array)
  const peerId = mh.toB58String(digestUint8Array)
  console.log('peerId=', peerId)
  const cid = new CID(1, 'libp2p-key', digestUint8Array, 'base36')
  console.log('cid=', cid)
  process.exit()
}

readKey()

process.stdin.resume()
