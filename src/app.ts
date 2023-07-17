import express,{Application, urlencoded} from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
 import cors from 'cors';
 import helmet from 'helmet';
import ErrorMiddleware from './middleware/error.middleware'
import Controller from './utils/interfaces/controller.interface' ;
import morgan from 'morgan';

class App{
    public express:Application;
    public port :number;


    constructor ( controllers :Controller[] , port :number){
        this.express=express();
        this.port=port;
        this.intialiseDatabaseConection();
        this.initialiseMiddleware();
        this.initialiseController(controllers);
        this.initialiseErrorHundling();
    }
    private initialiseMiddleware() :void{
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(urlencoded({extended:false}));
        this.express.use(compression());
    }
    private initialiseController(controllers :Controller []):void{
        controllers.forEach((controller:Controller)=>{
                this.express.use('/api',controller.router)
        })
    }
    private initialiseErrorHundling() :void{
        this.express.use(ErrorMiddleware);
    }
    private intialiseDatabaseConection():void{
        const {MONGO_URL}=process.env;
        mongoose.connect(`mongodb://${MONGO_URL}`).then((conected)=>{
        console.log("database conected successfully");
        
        }).catch((error)=>{console.log(error);
        })
    }
    public listen():void{
        this.express.listen(this.port,()=>{
            console.log('the server listening on port : '+this.port);
            
        })
    }
}
export default App;
