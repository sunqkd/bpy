import CryptoJS from 'crypto-js/crypto-js'



// 默认的 KEY 与 iv 如果没有给
const KEY = CryptoJS.enc.Utf8.parse("8G5M4Ff9hel8fUA9");
const IV = CryptoJS.enc.Utf8.parse('g8v20drvOmIx2PuR');
/**
 * AES加密 ：字符串 key iv  返回base64 
 */
export function Encrypt(word, keyStr, ivStr) {
    let key = KEY
    let iv = IV

    if (keyStr) {
        key = CryptoJS.enc.Utf8.parse(keyStr);
        iv = CryptoJS.enc.Utf8.parse(ivStr);
    }

    let srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

}
/**
 * AES 解密 ：字符串 key iv  返回base64 
 *
 */
export function Decrypt(word, keyStr, ivStr) {
    let key = KEY
    let iv = IV

    if (keyStr) {
        key = CryptoJS.enc.Utf8.parse(keyStr);
        iv = CryptoJS.enc.Utf8.parse(ivStr);
    }

    let base64 = CryptoJS.enc.Base64.parse(word);
    let src = CryptoJS.enc.Base64.stringify(base64);

    var decrypt = CryptoJS.AES.decrypt(src, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedStr);
}

// let test='{"name":"王勇","age":18,"desc":"啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"}';
// let encrypted=Encrypt(test);
// let decrypted=Decrypt(encrypted);
// console.log(decrypted)
// console.log(JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)))