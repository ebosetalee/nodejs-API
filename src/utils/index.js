import bcrypt from "bcrypt";

export async function hash(param) {
    return await bcrypt.hash(param, 12);
}

export async function verifyHash(param, hashedPram) {
    return await bcrypt.compare(param, hashedPram);
}

export const createOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
