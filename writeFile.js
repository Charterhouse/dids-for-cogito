// When using an ipfs-http-client, please make sure that
// you have a local ipfs daemon running at /ip4/127.0.0.1/tcp/5001.
// Follow https://docs.ipfs.io/introduction/usage/ to get started.

// This script simulates adding a file to IPFS. It will use
// CID v0. See comments in https://runkit.com/marcinczenko/ipld-dag-pb
// to see how to add a file using CID v1.

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient('/ip4/127.0.0.1/tcp/5001')

const path = process.argv[2] || 'f1.txt'
const content = Buffer.from(process.argv[3] || 'Welcome to IPFS')

const files = [{ path, content }]

ipfs.add(files).then(result => {
  console.log('result=', result)
  process.exit()
}, error => {
  console.log('error:', error)
  process.exit()
})

process.stdin.resume()
