import { z } from 'zod'
import { tool } from '@langchain/core/tools';
import generateTimestamp from '../utils/generateTimestamp';
import dayjs from 'dayjs'
import { addNote} from '../models/firebase'

const postNoteSchema = z.object({
    title: z.string().default(""),
    description: z.string().default(""),
    date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
            message: "Date must be in format YYYY-MM-DD",
        })
        .default(dayjs().format("YYYY-MM-DD")),
    type: z.enum(["working", "learning", "entertaining", "health", "others"]).default("working"),
});

function wrapperTool(userID: string, existingTimestamp: number[]) {
    return tool(
        async ({ title, description, date, type }) => {
            try {
                const dateMonth = dayjs(date, 'YYYY-MM-DD');
                const timestamp = generateTimestamp(dateMonth, existingTimestamp);
                await addNote(userID, title, description, timestamp, type);
                return [`Note "${title}" added for ${date} (${type}).`, null];
            } catch (error: any) {
                return [`Failed to add note: ${error.message || error}`, null];
            }
        },
        {
            name: "postNote",
            description: "Post a note to the database. If no date is provided, use today's date. Today is " + Date.now(),
            schema: postNoteSchema,
            responseFormat: "content_and_artifact"
        }
    )
}

export default wrapperTool;