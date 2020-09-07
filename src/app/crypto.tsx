import crypto from 'crypto';

export function createHash(payload) {
  let sha256 = crypto.createHash('sha256');
  sha256.update(payload);
  return sha256.digest('hex');
}

export function hmacHex(data, signingKey) {
  let hmac = crypto.createHmac('sha256', signingKey);
  hmac.update(data);
  return hmac.digest('hex')
}