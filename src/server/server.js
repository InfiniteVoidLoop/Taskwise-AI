import express from 'express'
import cors from 'cors'
import {authRouter} from './auth/routes.js';
import {noteRouter} from './note/routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/note', noteRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});