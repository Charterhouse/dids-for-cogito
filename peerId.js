import PeerId from 'peer-id'
import crypto from 'libp2p-crypto'
import mh from 'multihashes'
import CID from 'cids'

const buf = Buffer.from('CAASqAkwggSkAgEAAoIBAQDt7q8dGbTnonsg7iHiwdukaDlkqe2DWXePhL1k81K9aT//MpD2bc8xCzzWwTgTl62+j+Rov6DDVbuC9+RnkdIl3hHwXkDD5ulTZdW5HtgPaLINB4wq5zzdDoblj/N0xVfkjjF1lVJ24RF7de91KC27AHIZWXHWBRM9r5Ig9dvctRoncRNKKBCgp+p6kGxfVFfg9pGj+rInnEKOKlkkgzxyrD75Vx827Aezk6bIxPzN8UOqV4w98PUcEboSNVYJSK+nb6ceIf11Ed8LA5w89fN0aIBjDVfI1joGDekbxrtMPVGxQ2LBKYhuh+qI6cw7yXWBpKnSwIhHOG9ZqypY7uRBAgMBAAECggEAS0koDbwxms21yjCvdjHDDx2Pc4O1TMeFZlspFoVLm/Vus5BLgD40vh8BLC7NUJ3A8zhSnLZt5wD8qS9JDWB9r0+6O2WHdrVdBO+HFeFlmlKVbDwEJRswDf5nvsGy1jMPYZmAmuUZx9Xlkzw4/cgt2CsG73B27bKDaRRh154T6JylJmQNgN3imF6Av2xs0xnhhvwZi/kPywOlNlWq8+ME6VOs21o1JDZDxtv4Q3HlZMQSp/epUUJTqSqaBw3yGCV1utkdnHV4D6NaI7uJTQGqqh15egaNy3vVCRy32WKVhahykQsBrKMOII+hVet+zygo/XFt2LSKZy7YuhaTb84shQKBgQD8DhkyQg9DNvSrahA+tQqH1hj7JtXwzTZutHZm1Zd1uMS+sn7i/CPgjWBxrRH+mSGHs2A8zAQ7/VzgUVN2qH4pg8I7O/UWUM7tDM7MKRMdlZJpmYv8oeYLoHLgdVeRxS/7PTAKOdwUW25hhLNhJYIupK8zX5DnlyTxvsx/EWcdfwKBgQDxqAAk0ck7jXZyA3ZPxKYScsQzJaV+IhlJBJEH9Gg97RFDIZYfCmimyJP6owL9uqBcZqLBXc59smyqn8kU8TjEYSU/3b4WRhtLrdGxl0mcwKBLTy1vt/K68kS9/Fzt/x7qEeNW2p9zzsj49HMyTc6W5rTO06VP4VrI3IRoXUZePwKBgF3yN0v3OU8ZLaqyVqm4utsUXq1FtVoScuZiVvtPQyu6mYJmb0rVJd4tc7QLCPj3RHsazZT7idx+O97UESLZ/GQm2v9PArO1nNrX+kA4Uwqk1DSN6ZJZGbBdtlOZCPGpKJAhJ0W4eSIRThwE5QMhgts1wKOKTC01taxxLDF0YBWrAoGBAK3RHEFfj/HA37hEWz4nARj16b+sTWv7VNqbaUIifzRDp430w4kSMJH+Zcn6pHUiXqP3wwt40MTCqLzVb4obs6w0/9j/QvG8fXeiz9iALBeOyf1BNzpLQlFLXzyUH7ekMHVGZpIbcGOZEh9XnOBK7NTHnrfBrf9V5bniO27h4HJ7AoGBANYcvM2s/PsO56ZWWZ/jmg4B4RKBLRBxIpT9+AOirT2rQZ01/xfDNdmaU3JfAOxQUdnllqSR+QkLQi2oTJpikNJ7OMEhp8/bxNnTHw0QFTEhklQmTgo+kml/QdZPR9PDsmC2E+f59HUsYS4Ys1J1lxqhvQRHqK1JoXAFmiREiJhR', 'base64')

console.log(buf)

// crypto.keys.unmarshalPrivateKey(buf, (err, key) => {
//   console.log('key=', key)
//   process.exit()
// })

const createPeerId = async () => {
  const peerId = await PeerId.createFromPrivKey(buf)
  console.log(peerId)
  console.log(peerId.toB58String())
  process.exit()
}

const createPeerId2 = async () => {
  const key = await crypto.keys.unmarshalPrivateKey(buf)
  const pubKey = key.public
  console.log(pubKey)
  console.log(pubKey.bytes.length)
  const digestUint8Array = await pubKey.hash()
  console.log('digestUint8Array=', digestUint8Array)
  const peerId = mh.toB58String(digestUint8Array)
  console.log('peerId=', peerId)
  const cid = new CID(1, 'libp2p-key', digestUint8Array, 'base36')
  console.log('cid=', cid)
  process.exit()
}

// createPeerId()
createPeerId2()

process.stdin.resume()
