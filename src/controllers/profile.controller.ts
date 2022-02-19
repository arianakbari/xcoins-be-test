import Profile from "../models/Profile";

export default {
    async getProfiles(req, res) {
        var profile = await Profile.find().lean();
        console.log(profile);
        res.json({ profile });
    },
    async createProfile(req, res) {
        var { email, name, nickname } = req.body;
      
        let profile = await Profile.findOne({
          $or: [{ email }, { nickname }],
        }).exec();
      
        if (!profile) {
          profile = await Profile.create({ name, email, nickname });
        }
      
        res.json(profile);
    }
}