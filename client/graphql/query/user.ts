import { graphql } from "../../gql";

export const verifyGoogleTokenQuery=graphql(`
    #graphql
    query verifyGoogleToken($token:String!){
        verifyGoogleToken(token:$token)
    }
`)
export const getCurrentUserQuery = graphql(`
    query GetCurrentUser {
        getCurrentUser {
            email
            firstName
            id
            lastName
            profileImageURL
            follower{
                id
                firstName
                lastName
                profileImageURL
            }
            following{
                id
                firstName
                lastName
                profileImageURL
            }
            tweets {
                imageURL
                id
                content
                likeCount
                author {
                    id
                    firstName
                    profileImageURL
                    lastName
                }
                getLikes {
                    id
                }
            }
        }
    }
`);

export const getUserByidQuery=graphql(`
    #graphql
    query GetUserByid($id: ID!) {
        getUserByid(id: $id) {
            email
            firstName
            id
            lastName
            profileImageURL
            follower{
                id
                firstName
                lastName
                profileImageURL
            }
            following{
                id
                firstName
                lastName
                profileImageURL
            }
            tweets {
                imageURL
                id
                content
                likeCount
                author {
                    id
                    firstName
                    profileImageURL
                    lastName
                }
                getLikes {
                    id
                }
            }
        }
    }
`)

