import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Profile, IProfile } from "../models";

export default {
    async getProfiles(
        req: Request<
            null,
            { success: boolean; data: IProfile[] },
            null,
            { pageNumber: number; pageSize: number }
        >,
        res: Response
    ): Promise<Response> {
        const { pageNumber = 1, pageSize = 10 } = req.query;
        const data = await Profile.find()
            .skip(Number(pageSize) * (Number(pageNumber) - 1))
            .limit(Number(pageSize))
            .select("-__v")
            .lean();

        return res.status(StatusCodes.OK).json({
            success: true,
            data,
        });
    },
    async createProfile(
        req: Request<
            null,
            { success: boolean; data: IProfile },
            { email: string; name: string; nickname: string },
            null
        >,
        res: Response
    ): Promise<Response> {
        const { email, name, nickname } = req.body;

        const data = await Profile.findOneAndUpdate(
            { email, nickname },
            { name },
            {
                new: true,
                upsert: true,
            }
        );
        return res.status(StatusCodes.CREATED).json({
            success: true,
            data,
        });
    },
};
