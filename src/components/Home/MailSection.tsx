import React from 'react'
import Email from '../Form/Email'

const MailSection = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-20 py-14">
      <h2>Stay Updated</h2>
      <Email/>
    </div>
  )
}

export default MailSection