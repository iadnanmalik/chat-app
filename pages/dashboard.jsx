import { ChatBoxComponent } from "../components/ChatBox";
import { UsersWrapper } from "../context/UsersContext";

export default function Dashboard() {
  return (
    <UsersWrapper>
      <ChatBoxComponent />
    </UsersWrapper>
  );
}
