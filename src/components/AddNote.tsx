import { useMemo, useState } from "react";
import wrapperTool from "../tool-calling/postNoteTool";
import { useListTimestamp } from "../store";
import { useUserUIDStore } from "../store";
import model from "../models/chatbot";
import '../styles/AddNote.css'

function AddNote() {
  const { listTimestamp } = useListTimestamp();
  const { userUID } = useUserUIDStore();
  const [message, setMessage] = useState("");

  const postNote = useMemo(
    () => wrapperTool(userUID, listTimestamp),
    [userUID, listTimestamp]
  );

  const modelBindWithTool = useMemo(
    () => model.bindTools([postNote]),
    [postNote]
  );

  const handleSendMessage = async () => {
    await modelBindWithTool.invoke(message);
    setMessage("");
  };

  return (
    <div className="chat-area">
      <input
        type="text"
        placeholder="Ask bot to add your note"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button className="send-message" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
}

export default AddNote;
