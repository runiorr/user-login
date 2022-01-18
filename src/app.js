import express from "express";
import routes from "./app/routes/routes.js";

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes)
    }
}

const app = new App ();

app.server.listen(3000, () => {console.log("Server running on port 8080!")});