import React from 'react'

function Footer() {
  return (
    <div>
      <div className=' mt-8 w-full bg-black px-8 md:px-[300px] flex md:flex-row flex-col space-y-6 md:space-y-0 md:justify-between items-start py-8 md:text-md text-sm'>
        <div className='text-white flex flex-col'>
          <p>Featured Blogs</p>
          <p>Most Viewed</p>
          <p>Readers Choice</p>
        </div>
        <div className='text-white flex flex-col'>
          <p>Forum</p>
          <p>Support</p>
          <p>Recent Posts</p>
        </div>
        <div className='text-white flex flex-col'>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>Cookie Policy</p>
        </div>
      </div>
      <p className='py-2 pb-6 text-center text-white bg-black text-sm'>© 2025 TechBlog. All rights reserved.</p>
    </div>
  )
}

export default Footer
