import { create } from 'ipfs-http-client'
import { CID } from 'multiformats/cid'

import { TypedArrays } from '@react-frontend-developer/buffers'

const ipfs = create('/ip4/127.0.0.1/tcp/5001')

// for await (const { cid, type } of ipfs.pin.ls({
//   paths: [
//     CID.parse('bafyreiaor5kkqobcv4fpoidiznucv57xsyfc4b7wqg5e3golrymoflo6o4'),
//     CID.parse('bafyreiapdbcyox3ej6lzmpmhb72volys3durab4sa2u2stnwsjy7kfanmi'),
//   ],
// })) {
for await (const { cid, type } of ipfs.pin.ls()) {
  if (type !== 'recursive') continue
  const { value } = await ipfs.dag.get(cid)
  if (value.json && value.json.boxNonce) {
    console.log(`${cid.toString()}: hush-hush`)
  } else if (value.id && value.id.startsWith('did:ipid')) {
    console.log(`${cid.toString()}: ${value.id}`)
  } else {
    console.log(`${cid.toString()}: UNKNOWN`)
  }
}
