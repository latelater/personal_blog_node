
import Crypto from 'crypto';
class encryptClass {

    encryptedPass = str => {
        const hash = Crypto.createHash('sha256');
        hash.update(str);
        let encryptedPass = hash.digest('hex');
        return encryptedPass;
    }
    
}

export default encryptClass;