import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { requestService } from '../services/authService';
import { connectUserSocket } from '../services/socketService';
import styles from '../styles/Chat.module.css';

const Chat = () => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messagesByRequest, setMessagesByRequest] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!user?.id) return undefined;

    const socket = connectUserSocket(user.id);

    const handleMessage = (message) => {
      if (!message.requestId) return;
      setMessagesByRequest((current) => ({
        ...current,
        [message.requestId]: [...(current[message.requestId] || []), message],
      }));
    };

    socket.on('receive_private_message', handleMessage);

    return () => {
      socket.off('receive_private_message', handleMessage);
    };
  }, [user?.id]);

  useEffect(() => {
    requestService
      .getRequests({ mine: true, status: 'accepted' })
      .then((res) => setConversations(res.data.requests || []))
      .finally(() => setLoading(false));
  }, []);

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === selectedChat),
    [conversations, selectedChat]
  );

  const activeOtherUser = useMemo(() => {
    if (!activeConversation || !user?.id) return null;
    return activeConversation.learnerId === user.id
      ? activeConversation.mentor
      : activeConversation.learner;
  }, [activeConversation, user?.id]);

  const messages = activeConversation ? messagesByRequest[activeConversation.id] || [] : [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation || !activeOtherUser) return;

    const socket = connectUserSocket(user.id);
    socket.emit('send_private_message', {
      toUserId: activeOtherUser.id,
      requestId: activeConversation.id,
      message: newMessage.trim(),
    });
    setNewMessage('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatBox}>
        <div className={styles.conversationList}>
          <h2>Messages</h2>
          {loading ? (
            <p className={styles.emptyText}>Loading conversations...</p>
          ) : conversations.length === 0 ? (
            <p className={styles.emptyText}>No chats yet. A chat appears after a learning request is accepted.</p>
          ) : (
            conversations.map((conv) => {
              const otherUser = conv.learnerId === user?.id ? conv.mentor : conv.learner;
              const name = otherUser?.fullName || otherUser?.username || 'SkillHive member';

              return (
                <button
                  type="button"
                  key={conv.id}
                  className={`${styles.conversation} ${selectedChat === conv.id ? styles.active : ''}`}
                  onClick={() => setSelectedChat(conv.id)}
                >
                  <div className={styles.avatar}>{name.slice(0, 2).toUpperCase()}</div>
                  <div className={styles.convInfo}>
                    <h4>{name}</h4>
                    <p>{conv.skillName}</p>
                  </div>
                  <span className={styles.time}>{conv.status}</span>
                </button>
              );
            })
          )}
        </div>

        <div className={styles.chatArea}>
          {activeConversation ? (
            <>
              <div className={styles.chatHeader}>
                <div>
                  <h3>{activeOtherUser?.fullName || activeOtherUser?.username || 'SkillHive member'}</h3>
                  <p className={styles.chatSubhead}>{activeConversation.skillName}</p>
                </div>
                <div className={styles.actions}>
                  <button type="button" onClick={() => setNotice('Video calls are not enabled yet. Chat is ready for accepted requests.')}>
                    Video soon
                  </button>
                </div>
              </div>

              {notice && <div className={styles.notice}>{notice}</div>}

              <div className={styles.messagesList}>
                {messages.length === 0 ? (
                  <p className={styles.emptyText}>No messages yet. Send the first one.</p>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={`${msg.timestamp}-${index}`}
                      className={`${styles.message} ${msg.fromUserId === user?.id ? styles.user : styles.other}`}
                    >
                      <div className={styles.messageBubble}>
                        <p>{msg.message}</p>
                        <span className={styles.messageTime}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleSendMessage} className={styles.messageInput}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <button type="submit">Send</button>
              </form>
            </>
          ) : (
            <div className={styles.noChat}>
              <p>Select an accepted request to start messaging.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
