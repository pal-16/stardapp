import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';

class App {
  public app: express.Application;

  constructor(controllers: readonly Controller[]) {
    this.app = express();

    this.initializeStandardMiddlewares();
    this.initializeControllers(controllers);
  }

  public listen(): void {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  public getServer(): express.Application {
    return this.app;
  }

  private initializeStandardMiddlewares() {
    this.app.set('trust proxy', true);
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(
      helmet({
        contentSecurityPolicy: false,
      })
    );
    this.app.use(fileUpload());
    this.app.use(cors({origin: ['https://dappstar-app.vercel.app'], credentials: true}));
    // this.app.use(function (req, res, next) {

    //   // Website you wish to allow to connect
    //   res.setHeader('Access-Control-Allow-Origin', 'https://dappstar-app.vercel.app');
  
    //   // Request methods you wish to allow
    //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    //   // Request headers you wish to allow
    //   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    //   // Set to true if you need the website to include cookies in the requests sent
    //   // to the API (e.g. in case you use sessions)
    //   res.setHeader('Access-Control-Allow-Credentials', 'true');
  
    //   // Pass to next layer of middleware
    //   next();
    // });
  }

  private initializeControllers(controllers: readonly Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });

    // Error Handling
    this.app.use(errorMiddleware);
  }
}

export default App;
