import { Request } from "express"
import express from "express"

import session from 'express-session';

//types defined
declare module 'express-session' {
  export interface SessionData {
    user: string|number;
    useragent: string;
  }
}

declare module "express-serve-static-core" { 
  export interface Request {

    userId: string| undefined;
  }
}
