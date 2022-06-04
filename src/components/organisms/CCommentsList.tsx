import React, { useEffect, Suspense } from 'react'
import { IComment } from '../../interfaces'

import {
  getComments,
  selectComments,
  selectError
} from "../../state/features/comments";
import { useAppDispatch, useAppSelector } from '../../state/hooks';


const MComment = React.lazy(() => import("../molecules/MComment"));

type Props = {
  postId: number,
  displayComments: any,
  setDisplayComments: any
}

const CCommentsList = ({ postId, displayComments, setDisplayComments}: Props) => {
  const dispatch = useAppDispatch();

  const comments = useAppSelector(selectComments);
  const error = useAppSelector(selectError);


  useEffect(() => {
    dispatch(getComments(postId))
  },[postId, dispatch]);
  
  return (
    <div className='text-center mt-4'>
      {
        displayComments ?
        <button className='a-button mb-2' onClick={()=> setDisplayComments(false)}>Hide Comments</button>:
        <button className='a-button mb-2' onClick={()=> setDisplayComments(true)}>Show Comments</button>
      }
      {
        error.length ? <div>Error</div>:
        comments?.map( (comment:IComment) => {
          return (
          <Suspense fallback={<div>loading...</div>} key={comment.id}>
            <MComment className={`transistion-all duration-1000 ${displayComments ? 'opacity-100 scale-y-100 max-h-full': 'opacity-0 scale-y-0 max-h-0'}`} key={comment.id} comment={comment}/>
          </Suspense>
          )
        })
      }

    </div>
  )
}

export default CCommentsList