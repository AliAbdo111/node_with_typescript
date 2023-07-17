import {Document } from 'mongoose'


interface User extends Document{
email: string;
password:string ;
name:string;
role:string;
isValidePassword(password:string):Promise<Error|boolean>

}

export default User