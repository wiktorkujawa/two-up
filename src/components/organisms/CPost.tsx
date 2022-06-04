import React, { LegacyRef } from 'react'
import { IPost } from '../../interfaces';

type Props = {
  post: IPost | undefined,
  className?: string;
}

const CPost = React.forwardRef(({post, className}: Props, ref: LegacyRef<HTMLDivElement>) => {
  return (
    <div ref={ref} className={className}>
      <h2 className='text-h2 text-center'>
        {post?.title}
      </h2>
      <p className='text-p2'>{post?.body}</p>
    </div>
  )
});

export default CPost