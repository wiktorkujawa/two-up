import React from 'react';
import AButton from '../atoms/AButton';

type Props = {
  isOpened: boolean
};

const CNavMenu = (props: Props) => {
  return <nav className={`${!props.isOpened? '-translate-x-full':''} fixed left-0 duration-300 ease-in top-0 p-10 z-10 bg-grass-green md:hidden max-w-max h-screen`}>
      <AButton className="block pb-6" variant='nav' to="/"> Home </AButton>
      <AButton className="block pb-6" variant='nav' to="about"> About </AButton>
  </nav>
};

export default CNavMenu;