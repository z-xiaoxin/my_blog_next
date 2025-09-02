import { jwtVerify, SignJWT } from "jose";

export const generateToken = async (payload: {
  uid: string;
  role: number[];
}) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // 设置签名算法
    .setIssuedAt() // 签发时间 iat
    .setExpirationTime("30D") // 过期时间 exp
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!)); // 用密钥签名
};

export const verifyToken = (token: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET!)
      );

      if ((result.payload.exp ?? 0) * 1000 < Date.now())
        return reject("token expired");

      return resolve(result);
    } catch (error) {
      return reject(error);
    }
  });
