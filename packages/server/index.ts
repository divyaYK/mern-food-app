import bodyParser from "body-parser";
import express, { Application } from "express";
import http from "http";
import cors from "cors";
import CookieParser from "cookie-parser";
import compression from "compression";
import InitializeMongodb from "src/services/db/InitializeMongodb";
import { config } from "config";
import { logger } from "src/shared/helpers/Logger";
import routes from "routes";
import helmet from "helmet";
import hpp from "hpp";
import swaggerUi from "swagger-ui-express";
import swaggerConfig from "./swagger.json";

class APIServer {
  public app: Application;
  public httpServer: http.Server | undefined;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(CookieParser());
    this.app.use(compression());
    this.app.use(hpp());
    this.app.use(helmet());
    routes(this.app);
    this.app.use("/docs/v1", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
    this.httpServer = http.createServer(this.app);
  }

  public async initialize(): Promise<http.Server> {
    await InitializeMongodb();
    return this.httpServer!;
  }
}

const server = new APIServer();
server.initialize().then((httpServer) => {
  httpServer.listen(config.SERVER_PORT, () => {
    logger.info(`🚀  Server ready at: ${config.SERVER_PORT}`);
    logger.info(
      `Access the API at http://localhost:${config.SERVER_PORT}/api/v1`
    );
    logger.info(
      `Access the API docs at http://localhost:${config.SERVER_PORT}/docs/v1`
    );
  });
});
