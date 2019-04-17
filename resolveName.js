// When using an ipfs-http-client, please make sure that
// you have a local ipfs daemon running at /ip4/127.0.0.1/tcp/5001.
// Follow https://docs.ipfs.io/introduction/usage/ to get started.

const ipfsClient = require('ipfs-http-client')

// or connect with multiaddr
const ipfs = ipfsClient('/ip4/127.0.0.1/tcp/5001')

if (!process.argv[2]) {
  console.log('No <name> to be resolved provided!')
  process.exit()
}

const name = process.argv[2]

ipfs.name.resolve(name, (err, cid) => {
  console.log(cid)
  process.exit()
})

process.stdin.resume()
