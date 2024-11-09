import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import Header from './Header';
import Message from './ChatRoom/Message';
import EmojiPicker from 'emoji-picker-react';
import './ChatRoom.css'; // Custom CSS for scrollbar
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faFaceSmile } from '@fortawesome/free-solid-svg-icons';

const ChatRoom = () => {
  const [socket] = useState(() => io('http://localhost:5000')); // Adjust server URL
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messageContainerRef = useRef(null);
  const userDetails = useSelector((state) => state.userDetails);
  const joinedRoom = useSelector((state) => state.joinedRoom);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    socket.emit('joinedRoom', {
      roomNumber: joinedRoom.joinedRoom.roomNumber,
      username: userDetails.userName,
      userId: userDetails.userId,
    });

    socket.on('previousMessages', (messages) => {
      setMessages((prevMessages) => {
        const uniqueMessages = messages.filter(
          (newMsg) => !prevMessages.some((msg) => msg.messageId === newMsg.messageId)
        );
        return [...prevMessages, ...uniqueMessages];
      });
    });

    socket.on('message', (newMessage) => {
      setMessages((prevMessages) => {
        if (prevMessages.some((msg) => msg.messageId === newMessage.messageId)) {
          return prevMessages;
        }
        return [...prevMessages, newMessage];
      });
    });

    socket.on('userJoined', (resMessage) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...resMessage },
      ]);
    });

    return () => {
      socket.off('previousMessages');
      socket.off('message');
      socket.off('userJoined');
    };
  }, [socket, joinedRoom, userDetails]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', {
        roomNumber: joinedRoom.joinedRoom.roomNumber,
        username: userDetails.userName,
        userId: userDetails.userId,
        text: message,
      });
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const onEmojiClick = (event) => {
    setMessage((prevMessage) => prevMessage + event.emoji);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    messageContainerRef.current?.scrollTo({
      top: messageContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const sortedMessages = [...messages].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <div className="relative h-screen flex flex-col bg-black text-white">
      <Header className="fixed top-0 left-0 right-0 bg-gray-800 border-b border-gray-700" />
      
      {/* Messages container */}
      <div className="flex-grow pb-20 sm:pb-16 px-2 sm:px-4 overflow-hidden">
        <div className="custom-scrollbar overflow-y-auto h-full" ref={messageContainerRef}>
          {sortedMessages.map((msg) => (
            <div key={msg.messageId} className="mb-2">
              <Message
                message={msg}
                roomNumber={joinedRoom.joinedRoom.roomNumber}
                userId={msg.userId}
                socket={socket}
                currentUser={userDetails.userName}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Message input and send button */}
      <div className="fixed bottom-0 left-0 right-0 p-2 bg-gray-900 sm:px-6">
        <div className="flex items-center relative w-full">
          {/* Input Field and Emoji Button */}
          <div className="flex-grow flex items-center rounded-full border border-gray-700 px-3 py-2 bg-gray-800">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-none outline-none flex-grow px-2 py-2 rounded-full bg-gray-800 text-white text-sm sm:text-base"
              placeholder="Type a message..."
            />

            {/* Emoji Picker Button */}
            <button
              type="button"
              className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded-full flex items-center"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faFaceSmile} className="text-xl sm:text-2xl text-white" />
            </button>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-2 z-50">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>

          {/* Send Button */}
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 sm:px-4 rounded-full ml-2 sm:ml-3 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faPaperPlane} size="lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
