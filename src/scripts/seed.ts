import mongoose from "mongoose";
import initDatabase from "../databases/mongodb";
import Profile from "../models/Profile";
import Favorite from "../models/Favorite";
import Simulator from "../models/Simulator";
import Logger, { LOG_LABELS } from "../utilities/logger";

const seed = async () => {
    const profileId = new mongoose.Types.ObjectId();
    await Promise.all([
        Profile.create({
            _id: profileId,
            name: "Arian",
            nickname: "arianak",
            email: "test@test.com",
            divisa: "divisa",
            capital: 123,
            preferredCryptocurrency: "ETH",
        }),
        Simulator.create({
            profile: profileId,
            dateRecorded: new Date(),
            cryptocurrency: "BTC",
            euros: 10000,
            price: 1000,
            quantity: 10,
        }),
        Favorite.create({
            profile: profileId,
            name: "favorite",
            favorites: ["favorite1", "favorite2", "favorite3"],
        }),
    ]);
};
initDatabase();
seed()
    .then(() => Logger.info(LOG_LABELS.DATA_SEED, "Seed successful"))
    .catch((e) => Logger.info(LOG_LABELS.DATA_SEED, "Seed failed", e));
