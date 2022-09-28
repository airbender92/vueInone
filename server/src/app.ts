import express from 'express';
import * as bodyParser from 'body-parser';
import { Pokemons } from './routes/pokemons'

class App {
  public app: express.Application;
  public pokeRoutes: Pokemons = new Pokemons();

  constructor() {
    this.app = express();
    this.config();
    this.pokeRoutes.routes(this.app);
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({
      extended: false
    }))

  }
}

export default new App().app;