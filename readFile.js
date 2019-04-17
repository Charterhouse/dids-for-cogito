// When using an ipfs-http-client, please make sure that
// you have a local ipfs daemon running at /ip4/127.0.0.1/tcp/5001.
// Follow https://docs.ipfs.io/introduction/usage/ to get started.

const ipfsClient = require('ipfs-http-client')

// or connect with multiaddr
const ipfs = ipfsClient('/ip4/127.0.0.1/tcp/5001')

if (!process.argv[2]) {
  console.log('No CID argument provided!')
  process.exit()
}

const cid = process.argv[2]

ipfs.get(cid, (err, files) => {
  files.forEach((file) => {
    console.log('------------------------------')
    console.log('path=', file.path)
    console.log('content=', file.content.toString('utf8'))
    console.log(file.content.toString('utf8').length)
    console.log('------------------------------')
  })
  process.exit()
})

process.stdin.resume()
