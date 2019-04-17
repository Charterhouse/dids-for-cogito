// Example of pinning JSON object to pinata.

const pinataSDK = require('@pinata/sdk')
const pinata = pinataSDK(yourPublicAPIKey, yourPrivateAPIKey)

const body = {
  text: "Welcome to IPFS"
}

const options = {
  pinataMetadata: {
      name: 'Welcome-EP',
      keyvalues: {
          customKey: 'customValue',
          customKey2: 'customValue2'
      }
  }
}
pinata.pinJSONToIPFS(body, options).then((result) => {
  //handle results here
  console.log(result);
  process.exit()
}).catch((err) => {
  //handle error here
  console.log(err);
  process.exit(1)
})

process.stdin.resume()
