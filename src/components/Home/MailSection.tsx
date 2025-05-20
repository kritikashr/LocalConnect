import React from 'react'

const MailSection = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-20 py-14">
      <h2>Stay Updated</h2>
      <form action="">
        <input type="email" placeholder='Enter your mail' />
        <input type="submit" placeholder='Subscribe' name='Subscribe'/>
      </form>
    </div>
  )
}

export default MailSection