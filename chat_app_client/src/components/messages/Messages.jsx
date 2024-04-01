import { useEffect, useRef } from "react";
import Message from "./Message";
import MessageSkeleton from "../skeltons/MessageSkeleton";
import { useSelector } from "react-redux";

const Messages = () => {
  const messageLoad = useSelector((state) => state?.message);
  const messages = useSelector((state) => state?.message?.conversationData);
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messageLoad?.loading &&
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!messageLoad?.loading && messages?.length === 0 && (
        <p className="text-center text-orange-300 bg-white-500">
          Send a message to start the conversation
        </p>
      )}

      {!messageLoad?.loading &&
        messages?.length > 0 &&
        messages.map((item) => (
          <div key={item._id} ref={lastMessageRef}>
            <Message message={item} />
          </div>
        ))}
    </div>
  );
};
export default Messages;
