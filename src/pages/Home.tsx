import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect, useRef } from "react";
import CPost from "../components/organisms/CPost";
import { IPost } from "../interfaces";
import {
  getPost,
  getNextPost,
  getPreviousPost,
  selectPost,
  switchPost,
  selectError as selectPostError,
} from "../state/features/posts";

import { useAppDispatch, useAppSelector } from "../state/hooks";
const CCommentsList = React.lazy(() => import("../components/organisms/CCommentsList"));

type Props = {};

const Home = (props: Props) => {
  const dispatch = useAppDispatch();

  const postRef = useRef<HTMLDivElement>(null);

  const posts = useAppSelector(selectPost);
  const postError = useAppSelector(selectPostError);

  const [numberOfPosts, setNumberOfPosts] = useState(1);
  const [page, setPage] = useState(1);
  const [displayComments, setDisplayComments] = useState(false);

  const setPreviousPage = () => {
    postRef?.current?.classList?.add("-translate-x-full");
    postRef?.current?.previousElementSibling?.classList.add("transition-all");
    postRef?.current?.previousElementSibling?.classList.replace(
      "right-full",
      "left-1/2"
    );
    postRef?.current?.previousElementSibling?.classList.add("-translate-x-1/2");
    setDisplayComments(false);

    setTimeout(() => {
      page > 1 ? setPage(page - 1) : setPage(numberOfPosts);

      dispatch(switchPost(posts?.prev as IPost));

      postRef?.current?.previousElementSibling?.classList.remove(
        "transition-all"
      );
      postRef?.current?.classList?.remove("-translate-x-full");

      postRef?.current?.previousElementSibling?.classList.replace(
        "left-1/2",
        "right-full"
      );
      postRef?.current?.previousElementSibling?.classList.remove(
        "-translate-x-1/2"
      );
    }, 600);
  };

  const setNextPage = () => {
    postRef?.current?.classList?.add("translate-x-full");

    postRef?.current?.nextElementSibling?.classList.add("transition-all");

    postRef?.current?.nextElementSibling?.classList.replace(
      "left-full",
      "right-1/2"
    );
    postRef?.current?.nextElementSibling?.classList.add("translate-x-1/2");
    setDisplayComments(false);

    setTimeout(() => {
      page < numberOfPosts ? setPage(page + 1) : setPage(1);
      dispatch(switchPost(posts?.next as IPost));

      postRef?.current?.nextElementSibling?.classList.remove("transition-all");
      postRef?.current?.classList?.remove("translate-x-full");

      postRef?.current?.nextElementSibling?.classList.replace(
        "right-1/2",
        "left-full"
      );
      postRef?.current?.nextElementSibling?.classList.remove("translate-x-1/2");
    }, 600);
  };

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(({ data }: AxiosResponse<IPost[], any>) =>
        setNumberOfPosts(data.length)
      );
    dispatch(getPost(1));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPreviousPost(page > 1 ? page - 1 : numberOfPosts));
    dispatch(getNextPost(page < numberOfPosts ? page + 1 : 1));
  }, [page, numberOfPosts, dispatch]);

  return (
    <div className="o-container o-container--md mt-16">
      <div className="relative overflow-hidden h-64">
      {postError.length ? <p>Error</p> : 
      <>
        <CPost
          post={posts?.prev}
          className="absolute w-full right-full duration-500 top-0"
        />
        <CPost post={posts?.current} ref={postRef} />
        <CPost
          post={posts?.next}
          className="absolute w-full left-full duration-500 top-0"
        />
      </>
      }
      </div>

      <div className="flex gap-x-4 justify-center items-center">
        <button
          className="a-button"
          onClick={setPreviousPage}
        >
          Previous Page
        </button>
        <p className="text-p2 font-bold">{page}</p>
        <button
          className="a-button"
          onClick={setNextPage}
        >
          Next Page
        </button>
      </div>
        <CCommentsList
          postId={posts?.current?.id as number}
          displayComments={displayComments}
          setDisplayComments={setDisplayComments}
        />
    </div>
  );
};

export default Home;
