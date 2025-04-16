'use client'
import React, {useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MetLogo from '@/public/The_Metropolitan_Museum_of_Art_Logo.svg'
import { RiArrowDropDownFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { AnimatePresence, motion } from 'framer-motion'
import { removeToken, readToken } from '@/lib/authenticate';
import { useRouter } from 'next/navigation'

const MainNav = () => {
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const arrowDivRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const hamburgerRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(event.target)
      const clickedOutsideArrowDiv = arrowDivRef.current && !arrowDivRef.current.contains(event.target)
      const clickedOutsideMobileMenu = mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)
      const clickedOutsideHamburger = hamburgerRef.current && !hamburgerRef.current.contains(event.target)
      
      if (clickedOutsideDropdown && clickedOutsideArrowDiv) {
        setDropdownOpen(false)
      }
  
      if (clickedOutsideMobileMenu && clickedOutsideHamburger) {
        setMobileMenuOpen(false)
      }
    }
  
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  const handleSubmit = async (formData) => {
    let query = formData.get('query')
    console.log(query)
  }

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }
  
  const handleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const logOut = () => {
    removeToken()
    setToken(null)
    setDropdownOpen(false)
    setMobileMenuOpen(false)
    router.push('/login')
  }

  const dropdownVariants = {
    hidden: {
      height: 0,
      // opacity: 0,
      overflow: 'hidden',
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    },
    visible: {
      height: 'auto',
      // opacity: 1,
      overflow: 'hidden',
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    }
  }



  const [token, setToken] = useState(null)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    const updateToken = () => {
      const decoded = readToken()
      setToken(decoded || null)
    }
  
    updateToken() // initial load
    window.addEventListener('token-change', updateToken)
  
    return () => window.removeEventListener('token-change', updateToken)
  }, [])
  
  const handleMobileDropDownLinkClick = (route) =>{
    setMobileMenuOpen(false)
    router.push(route)
  }


  useEffect(() => {
    try {
      const decoded = readToken()
      setToken(decoded || null)
    } catch {
      setToken(null)
    } finally {
      setHasMounted(true)
    }
  }, [])

  if (!hasMounted) return null



  return (
    <nav className='sticky top-0 z-50 flex-col'>
      
      <div className='flex flex-row justify-between w-full bg-red-600 h-20'>
      {/* Left Section */}
      <section className='flex flex-row justify-start gap-2 w-fit'>
          {/* Logo Container */}
        
            <div className='cursor-pointer flex justify-center items-center bg-white m-2 p-2 rounded'>
              <Link href="/">
                <Image
                    src={MetLogo}
                    width={55}
                    alt='met-app-logo'
                />
              </Link>
            </div>
          

          {/* Title Container */}
          <div className='hidden xl:flex justify-center items-center bg-transparent'>
              <p className='font-gideon font-semibold text-white text-2xl'>The Metropolitan Museum of Art</p>
          </div>
      </section>

      {/* Middle Section */}
      {token && (
        <section className='hidden xl:flex flex-row gap-2 w-fit'>
          <ul className='flex justify-center items-center flex-row gap-4'>
              <li className='text-white text-lg hover:font-semibold'><Link href='/'>Home</Link></li>
              <li className='text-white text-lg hover:font-semibold'><Link href='/search'>Advanced Search</Link></li>
          </ul>
        </section>
      )}





      {/* Right Section */}

      {token ? (
        <>
          <section className='hidden xl:flex flex-row justify-center items-center gap-2 w-fit'>
            <form className='flex flex-row gap-2' action={handleSubmit}>
              <input 
                className='border border-white bg-white p-4 rounded w-full text-black h-10'
                placeholder='Search'
                type='text'
                name='query'
                />
              <button type='submit' className='text-white border-2 rounded mr-2 w-30 border-white hover:bg-white hover:text-red-600 h-10'>
                Search
              </button>
            </form>

            {/* Arrow Div */}
            <div 
              className='flex flex-col'
              ref={arrowDivRef}
              >
                <div onClick={handleDropdown}className='cursor-pointer flex flex-row justify-center items-center text-lg'>
                <p className='hover:text-white text-slate-300'>
                  {token.userName}
                </p>
                <RiArrowDropDownFill 
                  color={dropdownOpen ? 'black' : 'white'}
                  size={36}/>
                </div>
              </div>

            {/* Dropdown Menu */}
            {dropdownOpen &&
              <div ref={dropdownRef} className='absolute bg-white top-18 right-2 border-2 border-red-600 rounded p-2 w-[200px]'>
                <ul>
                  <li className='p-2 border-2 font-semibold border-red-600 bg-white hover:bg-red-600 hover:text-white text-red-600 rounded m-2'>Favourites</li>
                  <li className='p-2 border-2 font-semibold border-red-600 bg-white hover:bg-red-600 hover:text-white text-red-600 rounded m-2'>Search History</li>
                  <li className='p-2 border-2 font-semibold border-red-600 bg-white hover:bg-red-600 hover:text-white text-red-600 rounded m-2'
                    onClick={logOut}
                    >
                      Logout</li>
                </ul>
              </div>
            }
          </section>
        </>
      ) : (
        // No User Logged in (null token)
        <section className='hidden xl:flex flex-row gap-4 justify-center items-center mr-4'>
           <Link href="/register">
              <button className='cursor-pointer text-white text-lg hover:font-semibold'>Register</button>
            </Link>
            <Link href="/login">
              <button className='cursor-pointer text-white text-lg hover:font-semibold'>Login</button>
            </Link>
        </section>
      )}
          

      {/* Mobile Menu Icon */}
      <div 
        ref={hamburgerRef}
        className="cursor-pointer xl:hidden flex justify-center items-center p-4"
        onClick={handleMobileMenu}
      >
            <GiHamburgerMenu size={30} color={mobileMenuOpen ? 'black' : 'white'}/>
      </div>

      
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            ref={mobileMenuRef}
            className='absolute xl:hidden flex flex-col gap-4 items-center w-full bg-red-600 p-4'
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            >


              {token ? (
              <>
                <form className='flex flex-row gap-2' action={handleSubmit}>
                  <input 
                    className='border border-white bg-white p-4 rounded w-full text-black h-10'
                    placeholder='Search'
                    type='text'
                    name='query'
                    />
                  <button type='submit' className='text-white border-2 rounded mr-2 w-30 border-white hover:bg-white hover:text-red-600 h-10'>
                    Search
                  </button>
                </form>
                <Link href='/'>
                  <button className='cursor-pointer text-white text-lg py-2 hover:font-semibold'>Home</button>
                </Link>

                <Link href='/favourites'>
                  <button className='cursor-pointer text-white text-lg py-2 hover:font-semibold'>Favourites</button>
                </Link>

                <Link href='/history'>
                  <button className='cursor-pointer text-white text-lg py-2 hover:font-semibold'>Search History</button>
                </Link>

                <Link href='/search'>
                  <button className='cursor-pointer text-white text-lg py-2 hover:font-semibold'>Advanced Search</button>
                </Link>

                

                <button className="cursor-pointer text-white text-lg py-2 hover:font-semibold"
                  onClick={logOut}
                  >
                    Logout</button>
              </>
            ) : (
              <>
                 {/* <Link href="/register"> */}
                  <button onClick={()=>handleMobileDropDownLinkClick('/register')}className='cursor-pointer text-white text-lg hover:font-semibold'>Register</button>
                {/* </Link> */}
                {/* <Link href="/login"> */}
                  <button onClick={()=>handleMobileDropDownLinkClick('/login')}className='cursor-pointer text-white text-lg hover:font-semibold'>Login</button>
                {/* </Link> */}
              </>
            )}



          </motion.div>
        )}
      </AnimatePresence>
    
  </nav>
  )
}

export default MainNav
