import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/dbconfig";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus= useSelector((state)=> state.auth.status); 
  
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full font-bold hover:text-gray-500">
              {!authStatus ? (<Link to='/login'>
                <h1 className="cursor-pointer">Login to read Blogs</h1>
              </Link>) 
              :
              (<h1>No Posts are available</h1>)}
              {/* <Link to='/login'>
                <h1 className="cursor-pointer">Login to read Blogs</h1>
              </Link> */}
              </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full">
      <Container>
        <div className="flex flex-wrap  flex-col items-center">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home; 