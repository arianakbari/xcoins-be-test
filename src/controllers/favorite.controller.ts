import Favorite from "../models/Favorite";

export default {
    async getFavorites(req, res) {
        const favorite = await Favorite.find().lean();
        console.log(favorite);
        res.json({ favorite });
    },
    async getFavorite(req, res) {
        console.log(req.params);
        let query = {};
        const { profile_id } = req.params;
        query = { profile_id };
        console.log(query);
        const data = await Favorite.find(query);
        res.json(data);
      }
}