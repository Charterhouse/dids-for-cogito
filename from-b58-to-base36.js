import crypto from 'libp2p-crypto'
import fs from 'fs'
import mh from 'multihashes'
import CID from 'cids'

const readKey = async () => {
  const ipnsNameBase36 = 'k2k4r8lkezjykb4ty8sv0yzzk29omf09r9rljz6onfnjj0abhh6b13f4'
  const cid = new CID(ipnsNameBase36)
  console.log('codec1=', cid.codec)
  console.log('ipnsNameBase36=', cid.toString())
  const ipnsNameB58 = mh.toB58String(cid.multihash)
  console.log(cid.multihash)
  console.log('ipnsNameB58=', ipnsNameB58)
  const cid2 = new CID(ipnsNameB58)
  console.log('codec2=', cid2.codec)
  console.log(cid2.multihash)
  const cid3 = new CID(1, 'libp2p-key', cid2.multihash, 'base36')
  console.log('cid=', cid2.toV1())
  console.log('codec3=', cid2.toV1().codec)
  console.log('ipnsNameBase36[back from B58]=', cid3.toString())
  process.exit()
}

readKey()

process.stdin.resume()
