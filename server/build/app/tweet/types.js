"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = `#graphql

input CreateTweetData{
    content:String!
    imageURL:String
}
type Tweet{
    id:ID!
    content:String!
    imageURL:String
    createdAt:String!
    author:User
    likeCount: Int!
    getLikes: [User!]!
    comment: [Comment]
}
`;
