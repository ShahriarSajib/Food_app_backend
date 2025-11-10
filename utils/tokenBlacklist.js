// tokenBlacklist.js
const blacklist = new Set();

const addToken = (token, exp) => {
  // exp = expiration time in seconds (from JWT)
  blacklist.add(token);
  
  // automatically remove the token after it expires
  const now = Date.now();
  const ttl = exp * 1000 - now; // milliseconds until expiry
  setTimeout(() => blacklist.delete(token), ttl > 0 ? ttl : 0);
};

const isBlacklisted = (token) => {
  return blacklist.has(token);
};

module.exports = { addToken, isBlacklisted };
