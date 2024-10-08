import React from 'react'
import appwriteService from '../appwrite/dbconfig'; 
import { Link } from 'react-router-dom'



function PostCard({post}) {

  // console.log(post);
  return (
    <Link to={`/post/${post.$id}`}>
        <div className='w-full dark:bg-slate-800 bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} className='rounded-xl'/>
            </div>
            <h2
            className='text-xl font-bold'
            >{post.title}</h2>
        </div>
    </Link>
  )
}

export default PostCard