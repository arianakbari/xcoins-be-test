import Simulator from "../models/Simulator";

export default {
    async getSimulators(req, res) {
        var simulator = await Simulator.find().lean();
        console.log(simulator);
        res.json({ simulator });
    },
    async createSimulator(req, res) {
        var { profile_id } = req.params;
        var newData = {
          ...req.body,
          profile_id,
        };
        console.log(newData);
        var simulator = await Simulator.create(newData);
        res.json(simulator);
    },
    async getSimulatorsByProfile(req, res) {
        console.log("========== ");
        let query = {};
        var { profile_id } = req.params;
        console.log({ profile_id });
        query = { profile_id };
        var data = await Simulator.find(query);
        res.json(data);
    }
}