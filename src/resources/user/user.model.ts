import { Schema, model } from "mongoose";
import User from "../user/user.interface";
import bcrypt from 'bcrypt'
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);
UserSchema.pre('save',async function(next){
   if( !this.isModified("password")){
    return next() ;
   }
   const hash=await bcrypt.hash(this.password,10);
   this.password= hash;
   next();
})

UserSchema.methods.isValidPassword= async function
 (password:string):Promise<Error|boolean>{
    return await bcrypt.compare(password,this.password)
 
}
export default model<User>("User", UserSchema);
