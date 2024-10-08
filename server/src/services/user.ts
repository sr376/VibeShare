import axios from "axios";
import JWTService from "./jwt";
import { prismaClient } from '../client/db';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

interface GoogleTokenResult {
    iss?: string;
    azp?: string
    aud?: string
    sub?: string
    email: string
    email_verified: string
    nbf?: string
    name?: string
    picture?: string;
    given_name: string
    family_name: string
    iat?: string,
    exp?: string
    jti?: string
    alg?: string
    kid?: string
    typ?: string
}
export default class UserService {
    public static async verifyGoogleAuthToken(token: string) {
        const googleToken = token;
        const googleOauthURL = new URL('https://oauth2.googleapis.com/tokeninfo');
        googleOauthURL.searchParams.set("id_token", googleToken);

        const { data } = await axios.get<GoogleTokenResult>(googleOauthURL.toString(), {
            responseType: "json",
        });

        const user = await prismaClient.user.findUnique({
            where: { email: data.email },
        });

        if (!user) {
            await prismaClient.user.create({
                data: {
                    email: data.email,
                    firstName: data.given_name,
                    lastName: data.family_name,
                    profileImageURL: data.picture
                }
            })
        }

        const userInDb = await prismaClient.user.findUnique({ where: { email: data.email } });
        if (!userInDb) throw new Error('user with email not found')
        const userToken = await JWTService.generateTokenForUser(userInDb)

        return userToken;
    }

    public static async getUserById(id: string) {
        return prismaClient.user.findUnique({ where: { id } });
    }

    public static async followUser(from: string, to: string) {
        return prisma.follows.create({
            data: {
                follower: { connect: { id: from } },
                following: { connect: { id: to } },
            },
        });
    }

    public static async unfollowUser(from: string, to: string) {
        return prisma.follows.delete({
            where: { followerId_followingId: { followerId: from, followingId: to } }
        })
    }

}
