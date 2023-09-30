import { writeFileSync } from 'node:fs'
import { create } from 'ipfs-http-client'
import { CID } from 'multiformats/cid'
import { pipe } from 'it-pipe'
import all from 'it-all'

import { TypedArrays } from '@react-frontend-developer/buffers'

if (!process.argv[2]) {
  console.log('No file path provided')
  process.exit()
}

const filepath = process.argv[2]

const ipfs = create('/ip4/127.0.0.1/tcp/5001')

const output = await pipe(ipfs.pin.ls(), (source) => all(source))

const recursive = output.filter((o) => o.type === 'recursive')

const res = await recursive.reduce(async (prevPromise, { cid, type }) => {
  const acc = await prevPromise
  const { value } = await ipfs.dag.get(cid)
  if (value.json && value.json.boxNonce) {
    acc[cid.toString()] = 'hush-hush'
  } else if (value.id && value.id.startsWith('did:ipid')) {
    acc[cid.toString()] = value.id
  } else {
    acc[cid.toString()] = 'UNKNOWN'
  }
  return acc
}, Promise.resolve({}))

writeFileSync(filepath, JSON.stringify(res, undefined, '  '))
