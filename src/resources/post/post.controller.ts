import { Router ,Request ,Response ,NextFunction } from "express";
import Controller from '../../utils/interfaces/controller.interface'
import HttpExceptions from '../../utils/Exceptions/http.exceptions'
import validate from './post.validation';
import validationMiddleware from "../../middleware/validation-middleware";
import PostService from './post.service'
class PostController implements Controller{
    public  path='/post';
    public router= Router();
    public PostService=new PostService()

    constructor(){
 this.initialiseRouter()
    }
    private initialiseRouter():void{
        this.router.post(this.path,validationMiddleware(validate.create),
        this.create)
    }
  private create=async(
    req:Request,
    res:Response,
    next:NextFunction
  ):Promise<Response|void> =>{
   try {

    
    const{title ,body}=req.body;

    
    const post=await this.PostService.create(title,body)
    res.status(200).json(post);
   } catch (error:any) {
    next(new  HttpExceptions(500,error.message));
   }
  }
}
export default PostController;