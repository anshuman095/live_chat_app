import { useSelector } from "react-redux";
import Conversation from "./Conversation";
import { getRandomEmoji } from "../../utils/emoji";

const Conversations = () => {
  const allUsers = useSelector((state) => state.auth.allUserDetails);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {allUsers.map((users, index) => (
        <Conversation
          key={users.id}
          conversation={users}
          emoji={getRandomEmoji()}
          lastIndex={index === users.length - 1}
        />
      ))}
    </div>
  );
};
export default Conversations;
