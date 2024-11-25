// import { isClient } from '@/http'

// const secretKey = process.env.SECRET_KEY || 'secretKey'
// const token = 'token'
// const id = 'x-client-id'
// const refreshToken = 'refreshToken'

// class Default {
//     private key: string
//     constructor(key: string) {
//         this.key = key
//     }
//     get() {
//         if (!isClient()) return null

//         const encryptedData = localStorage.getItem(this.key)
//         if (!encryptedData) return null
//         const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey)
//         const originalData = bytes.toString(CryptoJS.enc.Utf8)
//         return originalData
//     }
//     set(value: string) {
//         // if call method set on server side then throw error
//         if (!isClient()) throw new Error('cannot set local storage on server side')

//         const cipherText = CryptoJS.AES.encrypt(value, secretKey).toString()
//         localStorage.setItem(this.key, cipherText)
//     }
//     remove() {
//         // if (!isClient()) return null

//         localStorage.removeItem(this.key)
//     }
// }

// const accessTokenStorage = new Default(token)
// const refreshTokenStorage = new Default(refreshToken)
// const clientIdStorage = new Default(id)
// const removeAllLocalStorage = () => {
//     new Default(token).remove()
//     new Default(refreshToken).remove()
//     new Default(id).remove()
// }

// // <meta name="google-site-verification" content="QZAsBJDJCrYl4AhVYgf441FD2Vcy3SYP-5GB4-xuRJk" />

// export { accessTokenStorage, refreshTokenStorage, clientIdStorage, removeAllLocalStorage }
