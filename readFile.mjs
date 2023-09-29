// When using an ipfs-http-client, please make sure that
// you have a local ipfs daemon running at /ip4/127.0.0.1/tcp/5001.
// Follow https://docs.ipfs.io/introduction/usage/ to get started.

import { create } from 'ipfs-http-client'
import { CID } from 'multiformats/cid'
import { base32 } from 'multiformats/bases/base32'
import { writeFileSync } from 'node:fs'
import { extract } from 'it-tar'
import { pipe } from 'it-pipe'
import all from 'it-all'
import toBuffer from 'it-to-buffer'
import map from 'it-map'
import { base58btc } from 'multiformats/bases/base58'

import { TypedArrays } from '@react-frontend-developer/buffers'

async function* tarballed(source) {
  yield* pipe(source, extract(), async function* (source) {
    for await (const entry of source) {
      yield {
        ...entry,
        body: await toBuffer(map(entry.body, (buf) => buf.slice())),
      }
    }
  })
}

// or connect with multiaddr
const ipfs = create('/ip4/127.0.0.1/tcp/5001')

if (!process.argv[2]) {
  console.log('No CID argument provided!')
  process.exit()
}

const cid = process.argv[2]

console.log(
  'decoder[1]=',
  base58btc.decoder.decode('zb2rhWtbf4NmmFesESXhmnXSzqKDabqA8Ybj8276cUKvqCEvy')
)
console.log(
  'decoder[2]=',
  base32.decoder.decode(
    'bafkreiadvmbcf6nelytob734qegv7zutfqbinmnyr6wiqgpv3zoyquge4y'
  )
)

const cidObject = CID.parse(cid)

console.log('cid object=', cidObject)

// const res = await ipfs.dag.get(cidObject)
// console.log('res=', res)
// console.log('value=', TypedArrays.uint8Array2string(res.value, 'utf8'))
// // console.log('value=', TypedArrays.uint8Array2string(res.value.Data, 'utf8'))

for await (const file of ipfs.ls(cidObject)) {
  console.log('file=', file)
  // writeFileSync(`${cid}.tar`, buf)
  // console.log('buf=', TypedArrays.uint8Array2string(buf, 'utf8'))
}

const output = await pipe(ipfs.get(cidObject), tarballed, (source) =>
  all(source)
)

for (const file of output) {
  // console.log('file=', file)
  console.log(`writing ${file.header.name}.mp4...`)
  console.log('filename=', file.header.name)
  // console.log('content=', TypedArrays.uint8Array2string(file.body, 'utf8'))
  writeFileSync(`${file.header.name}.mp4`, file.body)
}

// const output2 = await pipe(ipfs.get(cidObject), tarballed)
// console.log(output2)
// for (const file of output2) {
//   console.log(`writing ${cid}.txt...`)
//   console.log('file2=', file)
//   // writeFileSync(`${cid}.txt`, file)
//   // console.log('file=', file.header.name)
//   // console.log('content=', TypedArrays.uint8Array2string(file.body, 'utf8'))
// }
