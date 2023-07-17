import Token from "../../utils/interfaces/token.interface";
import userModel from "./user.model";

import token from "../../utils/token";

class UserSercise {
  private user = userModel;

  public async register(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<string | Error> {
    try {
      const user = await this.user.create({
        name,
        email,
        password,
        role,
      });
      const accessToken = token.createToken(user);

      return accessToken;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async loginUser(
    email: string,
    password: string
  ): Promise<string | Error> {
    try {
      const user = await this.user.findOne({ email: email });
      if (!user) {
        throw new Error(`User not found`);
      }
      if (await user.isValidePassword(user.password)) {
        return token.createToken(user);
      } else {
        throw new Error("invalid credentials");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
export default UserSercise;
