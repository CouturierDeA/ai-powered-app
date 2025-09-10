import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const parkInfo = readFileSync(path.join(__dirname, './WonderWorld.md'));
const parkInfoTemplate = readFileSync(path.join(__dirname, './chatbot.txt')).toString();

export const parkInfoInstructions = parkInfoTemplate.replace(
    '{{parkInfo}}',
    parkInfo.toString()
);

const summarizeReviewsInstructions = readFileSync(path.join(__dirname, './summarize-reviews.txt')).toString();
