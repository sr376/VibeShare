"use client"
import React, { useCallback, useState } from "react";
import { FeedCard } from "./components/FeedCard";
import { useCurrentUser } from "../../hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { AddTweet } from "./components/AddTweet";
import { useGetAllTweets } from "../../hooks/tweet";
import { Tweet, User } from "../../gql/graphql";
import { AiFillHome } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { CgMoreO, CgProfile } from "react-icons/cg";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "../../clientgrahql/api";
import { verifyGoogleTokenQuery } from "../../graphql/query/user";
import Image from "next/image";
import { TwitterLayout } from "./components/Layout/TwitterLayout";
import { getAllTweetsQuery } from "../../graphql/query/tweet";




const Home= ()=> {



  const AllTweets=useGetAllTweets()
  const {user}=useCurrentUser()
  // const {tweets=[]}=useGetAllTweets();
  return (
    <div>
      <TwitterLayout >
        <div>
            <AddTweet/>
          </div>
          {
              AllTweets.tweets?.map(tweet => tweet? <FeedCard key={tweet?.id} data={tweet as Tweet} user={user as User}/> : null)
            }
        </TwitterLayout>
      </div>


        )
}


export default Home;

