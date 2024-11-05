import React from 'react'
import Receipts from '@/components/common/Receipt'
import {Suspense} from "react";

function Page() {
  return (
    <Suspense fallback={<>Loading...</>}>
     <Receipts/>
    </Suspense>
  )
}

export default Page