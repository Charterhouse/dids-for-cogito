// Example of pinning JSON object to pinata.

import pinataSDK from '@pinata/sdk'

const pinata = new pinataSDK(yourPublicAPIKey, yourPrivateAPIKey)

const body = {
  text: 'Welcome to IPFS (new)',
}

const options = {
  pinataMetadata: {
    name: 'Welcome-EP (new)',
    keyvalues: {
      customKey: 'customValue',
      customKey2: 'customValue2',
    },
  },
}
pinata
  .pinJSONToIPFS(body, options)
  .then((result) => {
    //handle results here
    console.log(result)
    process.exit()
  })
  .catch((err) => {
    //handle error here
    console.log(err)
    process.exit(1)
  })

process.stdin.resume()
