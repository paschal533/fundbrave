import React from 'react'
import dynamic from 'next/dynamic'

const Create = () => import('@/components/common/Create')

const CreateConnect = dynamic(Create, {ssr: false})

function Page() {
   
  return (
     <CreateConnect/>
  )
}

export default Page