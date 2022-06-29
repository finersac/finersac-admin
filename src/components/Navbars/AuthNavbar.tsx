/*eslint-disable*/
import React from 'react'
import { Link } from 'react-router-dom'

// components

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false)
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-center">
            <Link
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/"
            >
              <div className="mt-5">
                <img
                  src={require('../../assets/img/logo-white.png')}
                  alt="..."
                  className="w-11 h-8"
                ></img>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
