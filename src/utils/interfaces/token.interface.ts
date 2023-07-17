import { Schema } from "mongoose";

interface Token extends Object {
id:Schema.Types.ObjectId;
expiresIn:string;
}

export default Token;