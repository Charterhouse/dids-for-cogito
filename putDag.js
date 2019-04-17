// When using an ipfs-http-client, please make sure that
// you have a local ipfs daemon running at /ip4/127.0.0.1/tcp/5001.
// Follow https://docs.ipfs.io/introduction/usage/ to get started.

const ipfsClient = require('ipfs-http-client')

// or connect with multiaddr
const ipfs = ipfsClient('/ip4/127.0.0.1/tcp/5001')

const obj = {
  text: "Welcome to IPFS"
}

ipfs.dag.put(obj, { format: 'dag-cbor', hashAlg: 'sha2-256' }, (err, cid) => {
  console.log(cid.toBaseEncodedString())
  process.exit()
})

process.stdin.resume()
