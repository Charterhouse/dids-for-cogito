import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { create } from 'ipfs-http-client'
import { CID } from 'multiformats/cid'
import { pipe } from 'it-pipe'
import all from 'it-all'

import { TypedArrays } from '@react-frontend-developer/buffers'
import { resolve } from 'node:path'

if (!process.argv[2]) {
  console.log('No file path provided')
  process.exit()
}

const filepath = process.argv[2]

const cids = readFileSync(filepath)

if (!cids) {
  console.log(`error reading ${filepath}!`)
  process.exitCode = 1
  process.exit()
}

const cidsJson = JSON.parse(cids)

if (!cidsJson) {
  console.log(`error converting to json!`)
  process.exitCode = 1
  process.exit()
}

const cidsToPin = Object.keys(cidsJson).filter(
  (cid) => cidsJson[cid] === 'hush-hush' || cidsJson[cid].startsWith('did:ipid')
)

const ipfs = create('/ip4/127.0.0.1/tcp/5001')

const status = {}

for (const cid of cidsToPin) {
  const pinnedCid = await ipfs.pin.add(CID.parse(cid))
  status[pinnedCid.toString()] = 'done'
}

writeFileSync(
  `${path.parse(filepath).name}.result.json`,
  JSON.stringify(status, undefined, '  ')
)
