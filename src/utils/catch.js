import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300 })

export const setCache = (key , value) => {
    cache.set(key, value)
}

export const getCache = (key) => {
    const otp = cache.get(key)
    return otp;
}