import ManageComplaint from '@/components/Admin/ManageCompalint'
import React from 'react'

const page = ({ searchParams }: { searchParams: { category?: string, page?: string } }) => {
  return (
    <div><ManageComplaint searchParams={searchParams} /></div>
  )
}

export default page