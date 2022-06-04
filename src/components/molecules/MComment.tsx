import React from 'react'
import { IComment } from '../../interfaces';

type Props = {
  comment: IComment | undefined,
  className?: string;
}

const MComment = ({comment,className}: Props) => {
  return (
    <div className={`border border-black rounded p-2 mb-2 ${className}`}> 
      <p className='text-p1'>{comment?.body}</p>
      <p className='text-p3 text-right'>{comment?.name}</p>
    </div>
  )
}

export default MComment