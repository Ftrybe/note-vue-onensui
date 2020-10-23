
export class Crypto {
    
    base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    // Bit-wise rotate left
    rotl(n: any, b: any) {
        return (n << b) | (n >>> (32 - b));
    }

    // Bit-wise rotate right
    rotr(n: any, b: any) {
        return (n << (32 - b)) | (n >>> b);
    }

    // Swap big-endian to little-endian and vice versa
    endian(n: any) {

        // If number given, swap endian
        if (n.constructor == Number) {
            return this.rotl(n, 8) & 0x00FF00FF |
                this.rotl(n, 24) & 0xFF00FF00;
        }

        // Else, assume array and swap all items
        for (var i = 0; i < n.length; i++)
            n[i] = this.endian(n[i]);
        return n;

    }

    // Generate an array of any length of random bytes
    randomBytes(n: any) {
        for (var bytes = []; n > 0; n--)
            bytes.push(Math.floor(Math.random() * 256));
        return bytes;
    }

    // Convert a string to a byte array
    stringToBytes(str: string) {
        var bytes = [];
        for (var i = 0; i < str.length; i++)
            bytes.push(str.charCodeAt(i));
        return bytes;
    }

    // Convert a byte array to a string
    static bytesToString(bytes: any) {
        var str = [];
        for (var i = 0; i < bytes.length; i++)
            str.push(String.fromCharCode(bytes[i]));
        return str.join("");
    }

    // Convert a byte array to big-endian 32-bits words
    bytesToWords(bytes: any) {
        var words: number[] = [];
        for (var i = 0, b = 0; i < bytes.length; i++, b += 8)
            words[b >>> 5] |= bytes[i] << (24 - b % 32);
        return words;
    }

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes(words: any[]) {
        var bytes = [];
        for (var b = 0; b < words.length * 32; b += 8)
            bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
        return bytes;
    }

    // Convert a byte array to a hex string
    static bytesToHex(bytes: string | any[]) {
        var hex = [];
        for (var i = 0; i < bytes.length; i++) {
            hex.push((bytes[i] >>> 4).toString(16));
            hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join("");
    }

    // Convert a hex string to a byte array
    hexToBytes(hex: string) {
        var bytes = [];
        for (var c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substring(c, 2), 16));
        return bytes;
    }

    // Convert a byte array to a base-64 string
    bytesToBase64(bytes: string | any[]) {

        // Use browser-native function if it exists
        if (typeof btoa == "function") return btoa(Crypto.bytesToString(bytes));

        var base64 = [];
        var overflow: any;

        for (var i = 0; i < bytes.length; i++) {
            switch (i % 3) {
                case 0:
                    base64.push(this.base64map.charAt(bytes[i] >>> 2));
                    overflow = (bytes[i] & 0x3) << 4;
                    break;
                case 1:
                    base64.push(this.base64map.charAt(overflow | (bytes[i] >>> 4)));
                    overflow = (bytes[i] & 0xF) << 2;
                    break;
                case 2:
                    base64.push(this.base64map.charAt(overflow | (bytes[i] >>> 6)));
                    base64.push(this.base64map.charAt(bytes[i] & 0x3F));
                    overflow = -1;
            }
        }

        // Encode overflow bits, if there are any
        if (overflow != undefined && overflow != -1)
            base64.push(this.base64map.charAt(overflow));

        // Add padding
        while (base64.length % 4 != 0) base64.push("=");

        return base64.join("");

    }

    // Convert a base-64 string to a byte array
    base64ToBytes(base64: string) {

        // Use browser-native function if it exists
        if (typeof atob == "function") return this.stringToBytes(atob(base64));

        // Remove non-base-64 characters
        base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");

        var bytes = [];

        for (var i = 0; i < base64.length; i++) {
            switch (i % 4) {
                case 1:
                    bytes.push((this.base64map.indexOf(base64.charAt(i - 1)) << 2) |
                        (this.base64map.indexOf(base64.charAt(i)) >>> 4));
                    break;
                case 2:
                    bytes.push(((this.base64map.indexOf(base64.charAt(i - 1)) & 0xF) << 4) |
                        (this.base64map.indexOf(base64.charAt(i)) >>> 2));
                    break;
                case 3:
                    bytes.push(((this.base64map.indexOf(base64.charAt(i - 1)) & 0x3) << 6) |
                        (this.base64map.indexOf(base64.charAt(i))));
                    break;
            }
        }

        return bytes;

    }

    HMAC(hasher: any, message: string, key: any, options: any) {
        var _blocksize = 16;
        var _this = this;
        // Allow arbitrary length keys
        key = key.length > _blocksize * 4 ?
            hasher(key, { asBytes: true }) :
            this.stringToBytes(key);

        // XOR keys with pad constants
        var okey = key;
        var ikey = key.slice(0);
        for (var i = 0; i < _blocksize * 4; i++) {
            okey[i] ^= 0x5C;
            ikey[i] ^= 0x36;
        }
        var hmacbytes = hasher(Crypto.bytesToString(okey) +
            hasher(Crypto.bytesToString(ikey) + message, { asString: true }),
            { asBytes: true });
        return options && options.asBytes ? hmacbytes :
            options && options.asString ? Crypto.bytesToString(hmacbytes) :
            Crypto.bytesToHex(hmacbytes);
    }

    SHA1(message: any, options: { asBytes: any; asString: any; }) {
        var words: number[] = [];
        for (var c = 0, b = 0; c < message.length; c++, b += 8)
            words[b >>> 5] |= message.charCodeAt(c) << (24 - b % 32);
        var m = words,
            l = message.length * 8,
            w = [],
            H0 = 1732584193,
            H1 = -271733879,
            H2 = -1732584194,
            H3 = 271733878,
            H4 = -1009589776;

        // Padding
        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >>> 9) << 4) + 15] = l;

        for (var i = 0; i < m.length; i += 16) {

            var a = H0,
                b = H1,
                c = H2,
                d = H3,
                e = H4;

            for (var j = 0; j < 80; j++) {

                if (j < 16) w[j] = m[i + j];
                else {
                    var n: any = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
                    w[j] = (n << 1) | (n >>> 31);
                }

                var t = ((H0 << 5) | (H0 >>> 27)) + H4 + (w[j] >>> 0) + (
                    j < 20 ? (H1 & H2 | ~H1 & H3) + 1518500249 :
                        j < 40 ? (H1 ^ H2 ^ H3) + 1859775393 :
                            j < 60 ? (H1 & H2 | H1 & H3 | H2 & H3) - 1894007588 :
                                (H1 ^ H2 ^ H3) - 899497514);

                H4 = H3;
                H3 = H2;
                H2 = (H1 << 30) | (H1 >>> 2);
                H1 = H0;
                H0 = t;

            }

            H0 += a;
            H1 += b;
            H2 += c;
            H3 += d;
            H4 += e;
        }

        var sha = [H0, H1, H2, H3, H4];

        var bytes = [];
        for (var b = 0; b < sha.length * 32; b += 8)
            bytes.push((sha[b >>> 5] >>> (24 - b % 32)) & 0xFF);

        var digestbytes = bytes;

        return options && options.asBytes ? digestbytes :
            options && options.asString ? Crypto.bytesToString(digestbytes) :
            Crypto.bytesToHex(digestbytes);
    }

}
export default new Crypto();