import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const parkInfo = readFileSync(
    path.join(__dirname, './WonderWorld.md')
).toString();

export const parkInfoInstructions = readFileSync(
    path.join(__dirname, './chatbot.txt')
)
    .toString()
    .replace('{{parkInfo}}', parkInfo);

export const summarizeReviewsInstructions = readFileSync(
    path.join(__dirname, './summarize-reviews.txt')
).toString();
