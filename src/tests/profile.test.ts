import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import initDatabase from "../databases/mongodb";
import Profile from "../models/Profile";

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
    it("should return all profiles.", async () => {
        const profile1 = await Profile.create({
            name: "Profile1",
            nickname: "Profile1",
            email: "test@test.com",
            divisa: "divisa",
            capital: 123,
            preferredCryptocurrency: "LTC",
        });
        const profile2 = await Profile.create({
            name: "Profile2",
            nickname: "Profile2",
            email: "test2@test.com",
            divisa: "divisa2",
            capital: 1234,
            preferredCryptocurrency: "BTC",
        });
        const response = await request(app).get("/api/v1/profiles");
        expect(response.status).toEqual(200);
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(true);
        expect(response.body.data.length).toEqual(2);
        expect(response.body.data[0].name).toEqual(profile1.name);
        expect(response.body.data[1].name).toEqual(profile2.name);
    });
    it("should create a profile with given data", async () => {
        const data = {
            name: "Profile",
            nickname: "Profile",
            email: "test@test.com",
        };
        const response = await request(app).post("/api/v1/profiles").send(data);
        expect(response.status).toEqual(201);
        expect(response.body.success).toBeDefined();
        expect(response.body.success).toEqual(true);
        expect(response.body.data.email).toEqual(data.email);
        expect(response.body.data.name).toEqual(data.name);
        expect(response.body.data.nickname).toEqual(data.nickname);
        expect(response.body.data._id).toBeDefined();
    });
});
