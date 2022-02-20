import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import initDatabase from "../databases/mongodb";
import Favorite from "../models/Favorite";

describe("Profile tests", () => {
    beforeEach(() => {
        // connect to database
        initDatabase(true, {
            hostname: "localhost:27018",
            databaseName: "test",
        });
    });
    afterEach(async () => {
        // drop the database and disconnect
        await mongoose.connection.dropDatabase();
        await mongoose.disconnect();
    });
    it("should return all favorites", async () => {
        const favorite1 = await Favorite.create({
            profile: new mongoose.Types.ObjectId(),
            name: "Fav 1",
            favorites: ["Fav 1", "Fav 2", "Fav 3"],
        });
        const favorite2 = await Favorite.create({
            profile: new mongoose.Types.ObjectId(),
            name: "Fav 2",
            favorites: ["Fav 1", "Fav 2", "Fav 3"],
        });
        const response = await request(app).get("/api/v1/favorites");
        expect(response.status).toEqual(200);
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(true);
        expect(response.body.data.length).toEqual(2);
        expect(response.body.data[0].name).toEqual(favorite1.name);
        expect(response.body.data[1].name).toEqual(favorite2.name);
    });
    it("should return the favorite with given id", async () => {
        const favorite = await Favorite.create({
            profile: new mongoose.Types.ObjectId(),
            name: "Fav",
            favorites: ["Fav 1", "Fav 2", "Fav 3"],
        });
        const response = await request(app).get(
            `/api/v1/favorites/${favorite.id.toString()}`
        );
        expect(response.status).toEqual(200);
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(true);
        expect(response.body.data._id).toEqual(favorite.id.toString());
        expect(response.body.data.name).toEqual(favorite.name);
    });
    it("should return 404 with the wrong favorite id", async () => {
        const id = new mongoose.Types.ObjectId();
        const response = await request(app).get(
            `/api/v1/favorites/${id.toString()}`
        );
        expect(response.status).toEqual(404);
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toBeDefined();
        expect(response.body.data).toBeUndefined();
    });
});
