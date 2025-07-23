import React from 'react'
import Form from 'next/form'
import { submitEmailForm } from '@/actions/action'
import { Button } from '../ui/button'

const Email = () => {
  return (
    <Form action={submitEmailForm} className='flex justify-center gap-4'>
        <input type="email" placeholder='Enter your mail' id='email' name='email' className='border-1 border-white rounded-lg text-sm font-semibold p-2 w-[350px]'/>
        <Button type="submit" className='text-base'>Subscribe</Button>
    </Form>
  )
}

export default Email