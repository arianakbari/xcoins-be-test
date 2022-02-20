import core from "express-serve-static-core"; // Dont remove

declare module "joi" {
    export interface Root {
        objectId?: any;
    }
}
