import jwt from "jsonwebtoken";
import User from "../resources/user/user.interface";
import Token from "../utils/interfaces/token.interface";
//#region 
 export const createToken = (user: User): string => {
  return jwt.sign({ id: user._id }, process.env.Secret_key as jwt.Secret, {
    expiresIn: "id",
  });
};

 export const verifyToken = async (
  token: string
): Promise<jwt.VerifyErrors | Token> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY as jwt.Secret, (err, payload) => {
      if (err) return reject(err);

      resolve(payload as Token);
    });
  });
};

export default { createToken, verifyToken };
//#endregion