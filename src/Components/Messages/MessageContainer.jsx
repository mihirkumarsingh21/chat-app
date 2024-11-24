import React from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from "react-icons/ti"; 

const MessageContainer = () => {
  const ChatSelected = false;

  return (
 
    
    <div className='md:min-w-[450px] flex flex-col '>
      {
        ChatSelected ? (
<>
          {/*HEADER. */}
 
          <div className="bg-orange-500 px-4 py-2 mb-2">
              <span className="label-text">To :</span>
              <span className="text-white font-bold"> Jhon doe</span>
          </div>
          <Messages/>
          <MessageInput/>
      </>
        ) : (
          <NoChatSelected/>
        )
      }
       
   
    </div>
   )

 
}

export default MessageContainer


const NoChatSelected = () => {
    return(
      <>
        <div className="flex items-center justify-center w-full h-full">
          <div className="px-4 text-center sm:text-xl text-white font-semibold flex flex-col items-center gap-2">
            <p>Welcome Jhon Doe</p>          
            <p>Select a chat to start messaging</p>`     
            <TiMessages className='text-3xl md:text-6xl text-center text-orange-600'/>
          </div>
        </div>
      </>
    )
}