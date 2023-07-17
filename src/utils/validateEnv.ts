import {cleanEnv ,str ,port} from 'envalid';


function validateEnv():void {
    cleanEnv(process.env,{
        NODE_ENV:str({
            choices:['development', 'production']
        }),
        PORT:port({default:3000}),
        MONGO_URL:str(),
        SECRET_KEY:str()
    })
}
export default validateEnv;