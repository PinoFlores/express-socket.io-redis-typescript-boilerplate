import * as express from "express";
import * as bodyParser from "body-parser";
import cors = require("cors");
import routes from "../api/routes";

import {Server, createServer} from "http";
import {Server as IOServer} from "socket.io";
import RedisServer from "./RedisServer";

class ExpressServer {
  public static readonly PORT: number = 8080;

  private _app: express.Application;
  private _server: Server;
  private _port: number;

  public constructor() {
    this.listen();
  }

  private listen(): void {
    // Init express instances
    this._app = express();
    this._app.use(bodyParser.urlencoded({extended: false}));
    this._app.use(bodyParser.json({type: "*/*"}));
    this._app.use(cors());
    this._app.use("/api", routes);

    // Start the nodejs server
    this._server = createServer(this._app);
    this._server.listen(this._port, () => {
      console.log("[Express Server] - Running on port: %s", this._port);
    });
  }

  public close(): void {
    this._server.close((err) => {
      if (err) throw Error();
      console.info(new Date(), "[Express Server] - Stopped");
    });
  }

  public initSocket(socket: IOServer): void {
    this._app.set("socket", socket);
  }

  public initRedis(redis: RedisServer): void {
    this._app.set("redis", redis);
  }

  get server(): Server {
    return this._server;
  }
}

export default ExpressServer;
