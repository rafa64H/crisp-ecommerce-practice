import { onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { auth } from '../../config-firebase/firebase';
import { getCommunityPosts } from '../../components/utils/firebaseFunctions';

const PostComponent = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('postId');

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const allPostsFromFirestore = getCommunityPosts();

        const theIndicatedPost = (await allPostsFromFirestore).find(
          (post) => post.postId === id
        );
        console.log(theIndicatedPost);
      } else {
      }
    });
  }, []);
  return <div>PostComponent</div>;
};

export default PostComponent;
