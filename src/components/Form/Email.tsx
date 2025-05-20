import React from 'react'
import Form from 'next/form'
import { submitEmailForm } from '@/actions/action'
import { Button } from '../ui/button'

const Email = () => {
  return (
    <Form action={submitEmailForm}>
        <input type="email" placeholder='Enter your mail' id='email' name='email'/>
        <Button type="submit">Subscribe</Button>
    </Form>
  )
}

export default Email