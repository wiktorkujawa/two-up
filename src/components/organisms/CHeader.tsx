import React from 'react';
import AButton from '../atoms/AButton'

type Props = {};

const CHeader = (props: Props) => {
  return <header className='c-header bg-grass-green fixed left-0 right-0 top-0 z-50 bg-coral-red'>
  <div className='h-16 c-header__menu md:flex hidden items-center justify-between text-h4 mx-4 py-2'>
    <div>
      <AButton variant='nav' to="/"> Home </AButton>
      <AButton variant='nav' to="About"> About </AButton>
    </div>
  </div>
</header>
};

export default CHeader;