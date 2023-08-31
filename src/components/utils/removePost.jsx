import React from 'react';
import { deleteObject, ref } from 'firebase/storage';
import { getPostsOfUser, updateUsersPosts } from './firebaseFunctions';
import { storage } from '../../config-firebase/firebase';

async function removePost(post) {
  const allPostsFromFirestore = await getPostsOfUser();

  const filteredPosts = allPostsFromFirestore.filter(
    (postFromFirestore) => postFromFirestore.postId !== post.postId
  );

  if (post.postImg) {
    console.log(post.postImgRef);
    const imgRef = ref(storage, post.postImgRef);

    deleteObject(imgRef)
      .then(() => {
        console.log('success');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  await updateUsersPosts(filteredPosts);
}

export default removePost;
