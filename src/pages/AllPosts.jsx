import React , {useState, useEffect} from 'react'
import appwriteService from '../appwrite/dbconfig'; 
import { Container, PostCard } from '../components';

function AllPosts() {
    const [posts, setPosts]= useState([]); 
    useEffect(()=>{}, [])
    appwriteService.getPosts([]).then((posts) => {
        if(posts) {
            setPosts(posts.documents);
        }
    })

  return (
    <div className='w-full py-8'>
        {posts.length >0 ? (<Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard post={post} />
                    </div>
                ))}
            </div>
        </Container>) : (<h1>No Posts Available</h1>)}
    </div>
  )
}

export default AllPosts