import {createConnection} from "typeorm";
import "reflect-metadata";

import * as bodyParser from "body-parser";

import express, {Request, Response}  from 'express';
import {User} from "./entity/User";
import {Routes} from "./routes";
import morgan from 'morgan'

createConnection().then(async connection => {

    // create express app
    const app: express.Application = express();
    
    app.use(bodyParser.json());
    app.use(morgan(`${process.env.MORGAN_TYPE}`))

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
    
    app.listen(3000);

}).catch(error => console.log(error));
