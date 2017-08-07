
import Crypto from 'crypto';
class encryptClass {

    encryptedPass(password) {
        const hash = Crypto.createHash('sha256');
        hash.update(password);
        let encryptedPass = hash.digest('hex');
        return encryptedPass;
    }
    
}

export default encryptClass;