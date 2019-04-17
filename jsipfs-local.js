/*
  Before starting this script make sure you do not run
  ipfs daemon already...
*/

const IPFS = require('ipfs')
const node = new IPFS()

console.log('starting...')

node.once('ready', () => {
  // Ready to use!
  // See https://github.com/ipfs/js-ipfs#core-api

  console.log('running...')

  node.dag.get('zdpuB3Pn7miXhJ7pGM38EcSJ7mugkAMX3kHAPyVggXHJrRERo', (err, result) => {
    if (err) {
      throw err
    }

    console.log(JSON.stringify(result.value))
  })
})

process.stdin.resume()
