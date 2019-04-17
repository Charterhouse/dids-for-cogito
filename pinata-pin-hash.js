// Example of using pinata pinning service API
// to pin an existing CID. Here we use CID v1, which
// is not currently supported by pinata - therefore this
// command fails.

const pinataSDK = require('@pinata/sdk')
const pinata = pinataSDK(yourPublicAPIKey, yourPrivateAPIKey)

const options = {
  host_nodes: [
    '/ip4/85.144.224.194/tcp/4001/ipfs/QmQUcC5iRXee1QCgavsT1oWwGRzbSZPm8PhudWmUGWDmp8'
  ]
}

pinata.pinHashToIPFS('zdpuB3Pn7miXhJ7pGM38EcSJ7mugkAMX3kHAPyVggXHJrRERo', options).then((result) => {
  //handle results here
  console.log(result)
  process.exit()
}).catch((err) => {
  //handle error here
  console.log(err)
  process.exit()
})

process.stdin.resume()
