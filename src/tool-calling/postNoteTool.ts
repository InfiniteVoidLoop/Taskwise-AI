import { z } from 'zod'
import { tool } from '@langchain/core/tools';
import  generateTimestamp  from '../utils/generateTimestamp';
import dayjs  from 'dayjs'
import {addNote} from '../models/firebase'

const postNoteSchema = z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Date must be in format YYYY-MM-DD",
    }),
    type: z.enum(["working", "learning", "entertaining", "health", "others"]),
});

function wrapperTool(userID: string, existingTimestamp: number[]) {
    return tool(
        async ({ title, description, date, type }) => {
            const dateMonth = dayjs(date, 'YYYY-MM-DD');
            const timestamp = generateTimestamp(dateMonth, existingTimestamp);
            await addNote(userID, title, description, timestamp, type);
        },
        {
            name: "postNote",
            description: "post note to database",
            schema: postNoteSchema,
            responseFormat: "content_and_artifact"
        }
    )
}

export default wrapperTool;