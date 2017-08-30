
import Crypto from 'crypto';
class encryptClass {

    encryptedPass(str) {
        const hash = Crypto.createHash('sha256');
        hash.update(str);
        let encryptedPassword = hash.digest('hex');
        return encryptedPassword;
    }
    
}

export default encryptClass;