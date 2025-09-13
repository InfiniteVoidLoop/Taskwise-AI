import { useChatBotResponseStore } from "../store";
import { useDraggable } from '@dnd-kit/core';
import type { ModifyNotePos } from "../utils/interface"

function Response(props: ModifyNotePos) {
    const { isShow, setFalse } = useChatBotResponseStore();

    const { response, setResponse } = useChatBotResponseStore();
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'chat-bot-response',
    });
    const style: React.CSSProperties = {
        left: props.x + (transform?.x || 0),
        top: props.y + (transform?.y || 0),
        position: 'fixed',
        zIndex: 2000,
    };
    if (!isShow)
        return null;
    return (
        <div
            className="chat-bot-response-container"
            ref={setNodeRef}
            style={style}
            {...attributes}
        >
            <div className="chat-bot-response-drag" {...listeners}>Drag to move</div>
                <button
                    type="button"
                    className="chat-bot-response-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        setFalse();
                        setResponse("");
                    }}
                aria-label="Close response"
                >
                    ×
                </button>
            <div className="chat-bot-response-message">
                {response}
            </div>
        </div>
    );
}

export default Response;