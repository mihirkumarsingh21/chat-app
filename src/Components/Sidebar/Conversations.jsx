import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations.js'

const Conversations = () => {
  
  const {loading, conversations} = useGetConversations();

  console.log(`GET USER : ${conversations} `);

  return (
      <div className='py-2 flex flex-col overflow-auto' key={conversations._id}>
        {
          
          Array.isArray(conversations) && conversations.map((conversation, idx) => (
            <Conversation 
            key={conversation._id} 
            conversation = {conversation} 
           lastIdx = {idx === conversations.length - 1}

           />
          ))
        }

        {
            loading ? <span className="loading loading-spinner" ></span> : null
            
        }

      </div>
  )
}

export default Conversations