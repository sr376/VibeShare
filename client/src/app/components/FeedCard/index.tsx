"use client"
import Image from 'next/image'
import { FC, useCallback, useMemo } from 'react'
import { BiMessageRounded } from "react-icons/bi";
import {  FaRetweet } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { MdOutlineFileUpload } from "react-icons/md";
import { Tweet, User } from '../../../../gql/graphql';
import Link from 'next/link';
import { graphqlClient } from '../../../../clientgrahql/api';
import { DislikeTweetMutation, LikeTweetMutation } from '../../../../graphql/mutation/like';
import { useQueryClient } from '@tanstack/react-query';
import { FcLike } from 'react-icons/fc';


interface FeedCardProps{
  data:Tweet,
  user:User | null
}

export const FeedCard:FC<FeedCardProps> = (props) => {
  // const likes=usegetLikes(props.data.id)

  const {data}= props
  console.log(data);

  
  const queryClient=useQueryClient();
  // console.log(`Like-> ${data.getLikes}`)
  console.log(`id->${props.user?.id}`)
  const haveILiked =useMemo(()=>{
    if(!data.getLikes) return false;
    return(
        (data.getLikes?.some((element) => element?.id === props.user?.id))
      )
    },[data.getLikes,props.user?.id])



  const handleDislike=useCallback(async()=>{
    if(!props?.data) return;
    try{
      await graphqlClient.request(DislikeTweetMutation,{tweetId:data.id})
    }
    catch(e){
      e
    }
    await queryClient.invalidateQueries({queryKey: ["all-tweets"]})
    await queryClient.invalidateQueries({queryKey: [`${props.data.author?.id}`]})
  },[queryClient])
  const handlelike=useCallback(async()=>{
    if(!props?.data) return;
    await graphqlClient.request(LikeTweetMutation,{tweetId:data.id})
    await queryClient.invalidateQueries({queryKey: ["all-tweets"]})
    await queryClient.invalidateQueries({queryKey: [`${props.data.author?.id}`]})
  },[queryClient])

  return (
    <div className='border-t  border-gray-600  py-5 p-2 sm:p-5  transition-all cursor-pointer'>
      <div className='grid grid-cols-12  gap-3'>
      <div className='col-span-2 sm:col-span-1'>
        {
          data.author?.profileImageURL && <Image className='rounded-full' src={data.author.profileImageURL} alt='avavtar' height={60} width={150} />}
      </div>
      <div className='col-span-10 sm:col-span-11'>
      {data.author?.id ? (
          <Link href={`/${data.author.id}`}>
            <h5>{data.author.firstName + " " + data.author.lastName}</h5>
          </Link>
            ) : (
            <h5>{data.author?.firstName + " " + data.author?.lastName}</h5>
          )}
        <p>{data.content}</p>
        {
          data.imageURL && <Image src={data.imageURL} alt="tweet-image" height={300} width={300}></Image>
        }
        <div className='flex  justify-between p-2 w-[90%] text-gray-500'>
          <div className='flex items-center sm:hover:bg-[#C4E4FF] sm:hover:text-black rounded-full p-3  sm:hover:shadow-[0px_0px_10px_2px_#C4E4FF]'>
            <Link href={`comment/${data.id}`}>
          <BiMessageRounded/>
            </Link>
          </div>
          <div className='flex items-center sm:hover:bg-[#F31559] sm:hover:text-black rounded-full p-2  sm:hover:shadow-[0px_0px_10px_2px_#FF0000]'>
          {(haveILiked)? 
            (<FcLike  onClick={handleDislike} />  )
            :
            (
              <CiHeart onClick={handlelike}/>
            )
          }
          <div>{data.likeCount}</div>
          </div >
          <div className='flex items-center'>
          <FaRetweet/>
          
          </div>
          <div className='flex items-center'>

          <MdOutlineFileUpload/>
          </div>
        </div>
      </div>

    </div>
    </div>
  )
}

