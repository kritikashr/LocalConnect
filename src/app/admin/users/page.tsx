import ManageUser from '@/components/Admin/ManageUser'
import React from 'react'

import { PageProps } from '@/components/Admin/ManageUser'

const page = ({ searchParams }: PageProps) => {
  return (
    <div><ManageUser searchParams={searchParams} /></div>
  )
}

export default page