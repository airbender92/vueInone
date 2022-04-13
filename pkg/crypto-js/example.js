// const CryptoJS = require("crypto-js");

var data = {
    'City': 1,
    'DisplayOrder': 20,
    'Semantic': [{'Value': '1','Description': [{'value': 'string'}],
    'aff': [{'Id': '2','Name': 'Feature1','FeatureOptions': [{'Key': 'Key1','Value': 'Value1'},{    'Key': 'Key2','Value': 'Value2'}],
    'SelectedFeatureOption': {    'Key': 'Key1',    'Value': 'Value1'}}],'aff1': [{'Key': 'Key1','Value':'Value1'}]
    }]
}

function encryptData2(data) {
    var Key = CryptoJS.enc.Base64.parse("6il7YCRSqIOB9NooY225lPKQ0KuAF/nkFX6cY3vJkS0=");  
    var IV = CryptoJS.enc.Utf8.parse("0123456789ABCDEF");
    var encryptedText = CryptoJS.AES.encrypt(JSON.stringify(data), Key, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encryptedText.toString(CryptoJS.format.Base64);
}
var encryptedData = encryptData2(data);
console.log('encryptedData: ', encryptedData)

var decryptData2 = function(encryptedData, key) {
    var C = CryptoJS;             
    var Key = C.enc.Base64.parse("6il7YCRSqIOB9NooY225lPKQ0KuAF/nkFX6cY3vJkS0=");
    var IV = C.enc.Utf8.parse("0123456789ABCDEF");
    var decryptedText = C.AES.decrypt(encryptedData, Key, {                             // 4. Use decrypt instead of encrypt
        iv: IV,
        mode: C.mode.CBC,
        padding: C.pad.Pkcs7
    });
    return JSON.parse(decryptedText.toString(CryptoJS.enc.Utf8));                                   // 5. Use decryptedText instead of encryptedData
}

var result = decryptData2(encryptedData);
console.log('decryptData2: ', result); 