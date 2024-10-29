import React, {useContext} from 'react'
import { Dialog, DialogContent, DialogTrigger,DialogDescription, DialogTitle, DialogClose } from "@/components/ui/dialog";
import Image from 'next/image';
import { AuthContext } from '@/context/AuthContext';

function WalletModal({ width, style } : {width? : any, style? : any}) {

  const { connectWallet, login } = useContext(AuthContext)
    
  return (
    <Dialog>
	<DialogTrigger asChild>
      <button
            className={`${width} ${style} rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[rgb(60,28,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(60,28,1)]`}
          >
            Log in 
          </button>
	</DialogTrigger>

	<DialogContent>
		<DialogTitle>Select a Wallet</DialogTitle>
		<DialogDescription>
			 Select Metamask or Silk wallet.
		</DialogDescription>

         <div className='w-full mt-3 space-y-3 justify-center items-center flex flex-col'>
         <button
            onClick={connectWallet}
            className={` rounded-md w-full space-x-2 text-center flex justify-center items-center bg-black px-3 py-4 text-sm font-semibold text-white shadow-sm hover:bg-[rgb(41,41,41)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(50,41,41)]`}
          >
            <Image src='/images/metamask.png' alt="matamask" width={25} height={10} />
            <p>Metamask</p>
          </button>

          <button
            onClick={login}
            className={` rounded-md w-full space-x-2 text-center flex justify-center items-center bg-black px-3 py-4 text-sm font-semibold text-white shadow-sm hover:bg-[rgb(41,41,41)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(50,41,41)]`}
          >
            <Image src='/images/silk.png' alt="matamask" width={25} height={10} />
            <p> Silk</p>
          </button>
         </div>

	</DialogContent>
</Dialog>

  )
}

export default WalletModal