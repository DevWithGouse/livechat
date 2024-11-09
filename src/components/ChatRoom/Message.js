import React from 'react';
import moment from 'moment';

const Message = ({ message, roomNumber, userId, socket, currentUser, usersInRoom }) => {
    
    const isCurrentUser = message.username === currentUser;
    const isSystem = message.username === 'System';  // Check if the message is from the system
    
    const formatTimestamp = (timestamp) => {
        const time = moment(timestamp, 'hh:mm:ss a').format('hh:mm a');
        return time.toUpperCase();
    };

    return (
        <div
            className={`message-container flex items-start p-3 rounded-lg relative ${
                isCurrentUser ? 'justify-end' : 'justify-start'
            } ${isSystem ? 'justify-center' : ''} w-full md:max-w-lg lg:max-w-2xl mx-auto`}  // Adjust for mobile, tablets, and desktops
        
        >
            {/* System Message */}
            {isSystem ? (
                <div className="system-message text-gray-400 text-center bg-gray-700 px-4 py-2 rounded-md">
                    {message.text}
                </div>
            ) : (
                <>
                    {/* Conditional rendering based on the current user */}
                    {!isCurrentUser && (
                        <div className="avatar bg-blue-500 text-white w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full font-bold">
                            {message.username && message.username.charAt(0).toUpperCase()}
                        </div>
                    )}

                    {/* Message box */}
                    <div
                        className={`message-content p-2 rounded-lg relative max-w-xs min-w-[60px] sm:min-w-[70px] ${
                            isCurrentUser ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200'
                        }`}
                    >
                        {/* Message Text */}
                        <span className="block break-words mb-4">{message.text}</span>

                        {/* Timestamp below the text */}
                        <span className={`absolute text-xs text-gray-400 ${
                            isCurrentUser ? 'right-2 bottom-1' : 'left-2 bottom-1'
                        }`}>
                            {formatTimestamp(message.timestamp)}
                        </span>
                    </div>

                    {/* Show avatar on the right if it's the current user */}
                    {isCurrentUser && (
                        <div className="avatar bg-green-500 text-white w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full font-bold">
                            {currentUser && currentUser.charAt(0).toUpperCase()}
                        </div>
                    )}
                    
                </>
            )}

        </div>
    );
};

export default Message;
