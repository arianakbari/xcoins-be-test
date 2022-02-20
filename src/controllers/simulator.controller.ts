import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import Simulator, { ISimulator } from "../models/Simulator";
import Profile from "../models/Profile";

export default {
    async getSimulators(
        req: Request<
            null,
            { success: boolean; data: ISimulator[] },
            null,
            { pageNumber: number; pageSize: number }
        >,
        res: Response
    ): Promise<Response> {
        const { pageNumber = 1, pageSize = 10 } = req.query;
        const data = await Simulator.find()
            .skip(Number(pageSize) * (Number(pageNumber) - 1))
            .limit(Number(pageSize))
            .select("-__v")
            .lean();

        return res.status(StatusCodes.OK).json({
            success: true,
            data,
        });
    },
    async createSimulator(
        req: Request<
            null,
            { success: boolean; data?: ISimulator; message?: ReasonPhrases },
            ISimulator,
            null
        >,
        res: Response
    ): Promise<Response> {
        const profileExists = await Profile.exists({ _id: req.body.profile });
        if (!profileExists) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: ReasonPhrases.NOT_FOUND,
            });
        }
        const data = await Simulator.create(req.body);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            data,
        });
    },
    async getSimulatorsByProfile(
        req: Request<
            { profileId: string },
            { success: boolean; data: ISimulator[] },
            null,
            null
        >,
        res: Response
    ): Promise<Response> {
        const data = await Simulator.find({ profile: req.params.profileId })
            .lean()
            .select("-__v");
        return res.status(StatusCodes.OK).json({
            success: true,
            data,
        });
    },
};
