import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { onAuthStateChanged } from 'firebase/auth';
import handleLargeScreen from '../../components/utils/handleLargeScreen';
import { getCommunityPosts } from '../../components/utils/firebaseFunctions';
import { auth } from '../../config-firebase/firebase';

const arrayOfPosts = [
  [
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail: '',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph: '',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
  ],
  [
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
  ],
  [
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
  ],
  [
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
  ],
  [
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
  ],
  [
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
  ],
  [
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
  ],
  [
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
  ],
  [
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
  ],
  [
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
    {
      thumbnail:
        'https://cdn.discordapp.com/attachments/1110956947328479242/1110957070578106399/crew-neck-short-sleeve-t-shirt-pink.jpg',
      title: 'This is a good dress!',
      paragraph:
        'fadsjjkfjasdlkfjaw eoifjosiej oiweaf iowejafoijweiofjweoiajfoisajfoi wafejoiawejfoiwaej fawejiofawjoifajweoi fwajoifewjaoifweajo owjfaeiowajoifwa',
      likes: 134,
      dislikes: 5,
    },
  ],
];

const CommunityComponent = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [listOfPosts, setListOfPosts] = useState([]);
  const [postsToShow, setPostsToShow] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();
  const [loadingPosts, setLoadingPosts] = useState(false);

  function splitPostsIntoFive(array, size) {
    const newArray = [];

    for (let i = 0; i < array.length; i += size) {
      newArray.push(array.slice(i, i + size));
    }
    return newArray;
  }

  useEffect(() => {
    handleLargeScreen(setIsLargeScreen);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const communityPostsFromFirebase = await getCommunityPosts();
        const communityPostsSplitted = splitPostsIntoFive(
          communityPostsFromFirebase,
          5
        );

        setListOfPosts(communityPostsSplitted);
        setCurrentIndex(0);
      } else {
      }
    });
  }, []);

  useEffect(() => {
    setPostsToShow(listOfPosts[currentIndex]);
  }, [currentIndex]);

  function returningFunction() {
    if (listOfPosts && postsToShow) {
      return (
        <section className="community">
          {isLargeScreen ? (
            <a
              href="./create-post.html"
              className="create-post-btn-desktop black-btn"
            >
              <i className="fa-solid fa-plus" /> Create post
            </a>
          ) : (
            <a
              href="./create-post.html"
              className="create-post-btn-mobile black-btn"
            >
              <i className="fa-solid fa-plus" /> Create post
            </a>
          )}

          <ul className="community-list">
            {postsToShow.map((post) => (
              <CommunityPostListItem
                key={uuidv4()}
                thumbnail={post.postImg}
                title={post.postTitle}
                paragraph={post.postText}
                likes={post.likes.length}
                dislikes={post.dislikes.length}
                seconds={post.postSecond}
                minutes={post.postMinutes}
                hours={post.postHour}
                day={post.postDay}
                month={post.postMonth}
                year={post.postYear}
              />
            ))}
          </ul>

          <ul className="list-indexes">
            <li>
              {listOfPosts[currentIndex - 1] !== undefined ? (
                <>
                  <button
                    type="button"
                    className="arrow-btn black-btn"
                    onClick={() => setCurrentIndex(0)}
                  >
                    {'< <'}
                  </button>
                  <button
                    type="button"
                    className="arrow-btn black-btn"
                    onClick={() => setCurrentIndex((prev) => prev - 1)}
                  >
                    {'<'}
                  </button>
                </>
              ) : (
                ''
              )}
            </li>

            {listOfPosts.map((item, index) => {
              if (index < currentIndex - 2) return null;
              if (index > currentIndex + 2) return null;

              return (
                <li key={uuidv4()} className="list-indexes-item">
                  <button
                    type="button"
                    className="list-indexes-btn transparent-btn"
                    data-active-index={currentIndex === index}
                    onClick={(e) => setCurrentIndex(index)}
                  >
                    {index + 1}
                  </button>
                </li>
              );
            })}

            {listOfPosts[currentIndex + 1] !== undefined ? (
              <>
                <button
                  type="button"
                  className="arrow-btn black-btn"
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                >
                  {'>'}
                </button>
                <button
                  type="button"
                  className="arrow-btn black-btn"
                  onClick={() => setCurrentIndex(listOfPosts.length - 1)}
                >
                  {'> >'}
                </button>
              </>
            ) : (
              ''
            )}
          </ul>
        </section>
      );
    }
    return <div>hola</div>;
  }

  return returningFunction();
};

export default CommunityComponent;

const CommunityPostListItem = ({
  params,
  thumbnail,
  title,
  paragraph,
  likes,
  dislikes,
  seconds,
  minutes,
  hours,
  day,
  month,
  year,
}) => (
  <li className="community-list-li">
    <a
      className="community-list-item"
      href="./community.html"
      draggable="false"
    >
      <div
        className={`community-list-item-div ${
          !paragraph && thumbnail ? 'thumbnail-and-not-paragraph' : ''
        }`}
      >
        {thumbnail ? (
          <img src={thumbnail} alt="img" className="community-list-item__img" />
        ) : (
          ''
        )}
        <div className="community-list-item-div-text">
          <h2
            style={{ fontSize: 'clamp(1.3rem, 1.5vw, 3rem)' }}
            className="community-list-item__title"
          >
            {title}
          </h2>
          {paragraph ? (
            <p className="community-list-item__paragraph">{paragraph}</p>
          ) : (
            ''
          )}
        </div>
      </div>

      <div className="community-list-item__like-dislike-container">
        <button
          onClick={(e) => e.preventDefault()}
          type="button"
          alt="Like"
          className="like-dislike like"
        >
          <i className="fa-solid fa-arrow-up" />
          <p>{likes}</p>
        </button>

        <button
          onClick={(e) => e.preventDefault()}
          type="button"
          alt="Dislike"
          className="like-dislike dislike"
        >
          <i className="fa-solid fa-arrow-down" />
          <p>{dislikes}</p>
        </button>
        <p>
          {day}:0{month}:{year}
        </p>
      </div>
    </a>
  </li>
);
