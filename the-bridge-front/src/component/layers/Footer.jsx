import React from 'react'

function Footer() {
  return (
    <div className="bg-[#F9B454] rounded-[80px] flex flex-col w-full justify-center py-12 text-black items-center">
      <div className='flex justify-center'>
        <p className='text-3xl font-extrabold'>Contact Us</p>
      </div>
      <form className='max-w-[500px] w-full px-4'> {/* Added padding for the form */}
        <div className='flex flex-col my-2'>
          <label htmlFor="name" className='text-sm'>NAME</label>
          <input type="text" className='w-full rounded-3xl p-2 bg-white text-gray text-sm' id="name" name="name" placeholder="Your name.." />
        </div>
        
        <div className='flex flex-col my-2'>
          <label htmlFor="email" className='text-sm'>EMAIL</label>
          <input className='w-full rounded-3xl p-2 bg-white text-gray text-sm' type="text" id="email" name="email" placeholder="Your email.." />
        </div>
        <div className='flex flex-col my-2'>
          <label htmlFor="subject" className='text-sm'>SUBJECT</label>
          <textarea className='w-full rounded-3xl p-2 bg-white text-gray text-sm' id="subject" name="subject" placeholder="Write something.."></textarea>
        </div>

        <div className='flex justify-center p-2'>
          <button type="submit" className='hover:bg-pink-800 bg-pink-700 tracking-widest rounded-md text-sm text-white px-5 py-1'>Send message</button>
        </div>
      </form>
    </div>
  )
}

export default Footer