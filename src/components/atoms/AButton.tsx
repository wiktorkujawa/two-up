import React from 'react'
import {
  NavLink as Link
} from "react-router-dom";
interface Props {
  to: string,
  children: string,
  className?: string,
  variant?: "nav" | "a"
}


const AButton = ({to, children, className="p-4", variant="a"}: Props) => {
  return (
    <>
    {
      variant==="a" ? 
        <a className={className} href={to}>{children}</a> : 
        <Link to={to} className={({ isActive }) => (isActive ? `underline ${className}`: `${className} hover:opacity-80`)}>
          {children}
        </Link>
    }
    </>
  )
}

export default AButton