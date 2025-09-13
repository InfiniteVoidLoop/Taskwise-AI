import { useMemo, useState } from "react";
import wrapperTool from "../tool-calling/postNoteTool";
import { useVisibilityStore, useListTimestamp, useUserUIDStore, useChatBotResponseStore, useRedDateStore, useGreenDateStore} from "../store";
import { useProgressStore } from "../store";
import { useListNoteStore } from "../store";
import { useDateMonthStore } from "../store";

import model from "../models/chatbot";
import '../styles/AddNote.css';
function AddNote() {
    
    const { listTimestamp, pushTimestamp} = useListTimestamp();
    const { userUID } = useUserUIDStore();
    const { setResponse } = useChatBotResponseStore();
    const [message, setMessage] = useState("");
    const {pushUnfinishedDate} = useRedDateStore();
    const {popFinishedDate} = useGreenDateStore();
    const {setHide} =useVisibilityStore();
    const {inc, unDone} = useProgressStore();
    const {setNoteInList} = useListNoteStore();
    const {dateMonth} = useDateMonthStore();

    const postNote = useMemo(
        () => wrapperTool(userUID, listTimestamp, dateMonth, {
            pushTimestamp,
            pushUnfinishedDate,
            popFinishedDate,
            setHide,
            inc,
            setNoteInList,
            unDone
            }),
        [userUID, listTimestamp]
    );

    const executeToolCall = async (toolCall: any) => {
        // Check if toolCall exists and has required properties
        if (!toolCall || !toolCall.name || !toolCall.args) {
            console.error("Invalid tool call:", toolCall);
            return "Invalid tool call received";
        }

        if (toolCall.name !== "postNote") {
            return `Unknown tool called: ${toolCall.name}`;
        }

        setResponse("Adding your note...");
        try {
            console.log("Executing tool with args:", toolCall.args);
            const toolResult = await postNote.invoke(toolCall.args);
            console.log("Tool result:", toolResult);
            return Array.isArray(toolResult) ? toolResult[0] : String(toolResult);
        } catch (toolError: any) {
            console.error("Tool execution error:", toolError);
            return `Failed to add note: ${toolError?.message || toolError}`;
        }
    };

    const extractContentFromResponse = (response: any) => {
        if (Array.isArray(response.content)) {
            return response.content
                .map((c: any) => (typeof c === "string" ? c : ("text" in c ? c.text : "")))
                .join("");
        }
        return typeof response.content === "string" ? response.content : "No response";
    };

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        setResponse("Thinking...");
        try {
            console.log("Invoking model with message:", message);
            const response = await model.bindTools([postNote]).invoke(message);
            console.log("Model raw response:", response);

            let botMessage: string;

            // Check if tool_calls exists and has valid structure
            if (response.tool_calls && Array.isArray(response.tool_calls) && response.tool_calls.length > 0) {
                const toolCall = response.tool_calls[0];
                console.log("Tool call detected:", toolCall);
                botMessage = await executeToolCall(toolCall);
            } else {
                botMessage = extractContentFromResponse(response);
            }

            setResponse(botMessage);
        } catch (error: any) {
            const errorMessage = `Error: ${error?.message || String(error)}`;
            setResponse(errorMessage);
            console.error("Main error:", error);
        } finally {
            setMessage("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSendMessage();
    };

    return (
        <div className="chat-area">
            <input
                type="text"
                placeholder="Ask bot to add your note"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                className="send-message"
                onClick={handleSendMessage}
                disabled={!message.trim()}
            >
                Send
            </button>
        </div>
    );
}

export default AddNote;