import ManageComplaint from '@/components/Admin/ManageCompalint'
import React from 'react'
import { PageProps } from '@/components/Admin/ManageCompalint'

const page = ({ searchParams }: PageProps) => {
  return (
    <div><ManageComplaint searchParams={searchParams} /></div>
  )
}

export default page