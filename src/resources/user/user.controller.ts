import { Router, Request, Response, NextFunction } from "express";
import { createToken, verifyToken } from "../../utils/token";
import validationMiddleware from "../../middleware/validation-middleware";
import validation from "./user.validation";
import UserSercise from "./user.service";
import HttpExceptions from "../../utils/Exceptions/http.exceptions";
import Controller from "../../utils/interfaces/controller.interface";
class UserController implements Controller {
  public path = "/user";
  public router = Router();
  public UserService = new UserSercise();
  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(validation.register),
      this.creatUser
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validation.login),
      this.login
    );
  }

  private async creatUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { name, email, password, role } = req.body;
      const token = await this.UserService.register(
        name,
        email,
        password,
        role
      );
      res.status(200).json({
        token,
      });
    } catch (error: any) {
      next(new HttpExceptions(404, error.message));
    }
  }

  private async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      const token = await this.UserService.loginUser(email, password);
      res.status(200).json({ token });
    } catch (error: any) {
      next(new HttpExceptions(404, error.messge));
    }
  }
}
export default UserController;