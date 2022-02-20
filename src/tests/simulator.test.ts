import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import initDatabase from "../databases/mongodb";
import Simulator from "../models/Simulator";
import Profile from "../models/Profile";

describe("Simulator tests", () => {
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
    it("should return all simulators.", async () => {
        const simulator1 = await Simulator.create({
            profile: new mongoose.Types.ObjectId(),
            dateRecorded: new Date(),
            cryptocurrency: "ETH",
            euros: 50,
            quantity: 2,
            price: 100,
        });
        const simulator2 = await Simulator.create({
            profile: new mongoose.Types.ObjectId(),
            dateRecorded: new Date(),
            cryptocurrency: "BNB",
            euros: 100,
            quantity: 3,
            price: 300,
        });
        const response = await request(app).get("/api/v1/simulators");
        expect(response.status).toEqual(200);
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(true);
        expect(response.body.data.length).toEqual(2);
        expect(response.body.data[0].cryptocurrency).toEqual(
            simulator1.cryptocurrency
        );
        expect(response.body.data[1].cryptocurrency).toEqual(
            simulator2.cryptocurrency
        );
    });
    it("should create a simulator with given data", async () => {
        const profile = await Profile.create({
            name: "Profile",
            nickname: "Profile",
            email: "test@test.com",
            divisa: "divisa",
            capital: 123,
            preferredCryptocurrency: "LTC",
        });
        const data = {
            profile: profile.id.toString(),
            dateRecorded: new Date(),
            cryptocurrency: "ETH",
            euros: 50,
            quantity: 2,
            price: 100,
        };
        const response = await request(app)
            .post("/api/v1/simulators")
            .send(data);
        expect(response.status).toEqual(201);
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(true);
        expect(response.body.data.cryptocurrency).toEqual(data.cryptocurrency);
        expect(response.body.data.price).toEqual(data.price);
        expect(response.body.data.quantity).toEqual(data.quantity);
        expect(response.body.data._id).toBeDefined();
    });
    it("should return 404 if a profile with given id does not exist", async () => {
        const data = {
            profile: new mongoose.Types.ObjectId(),
            dateRecorded: new Date(),
            cryptocurrency: "ETH",
            euros: 50,
            quantity: 2,
            price: 100,
        };
        const response = await request(app)
            .post("/api/v1/simulators")
            .send(data);
        expect(response.status).toEqual(404);
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toBeDefined();
        expect(response.body.data).toBeUndefined();
    });
    it("should return all simulators associated with a given profile id", async () => {
        const profile = await Profile.create({
            name: "Profile",
            nickname: "Profile",
            email: "test@test.com",
            divisa: "divisa",
            capital: 123,
            preferredCryptocurrency: "LTC",
        });
        const simulator1 = await Simulator.create({
            profile: profile.id,
            dateRecorded: new Date(),
            cryptocurrency: "ETH",
            euros: 50,
            quantity: 2,
            price: 100,
        });
        const simulator2 = await Simulator.create({
            profile: profile.id,
            dateRecorded: new Date(),
            cryptocurrency: "BNB",
            euros: 100,
            quantity: 3,
            price: 300,
        });
        const response = await request(app).get(
            `/api/v1/simulators/${profile.id.toString()}`
        );
        expect(response.status).toEqual(200);
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(true);
        expect(response.body.data).toBeDefined();
        expect(response.body.data.length).toEqual(2);
        expect(response.body.data[0].cryptocurrency).toEqual(
            simulator1.cryptocurrency
        );
        expect(response.body.data[1].cryptocurrency).toEqual(
            simulator2.cryptocurrency
        );
        expect(response.body.data[0].profile).toEqual(
            simulator1.profile.toString()
        );
        expect(response.body.data[1].profile).toEqual(
            simulator2.profile.toString()
        );
    });
});
