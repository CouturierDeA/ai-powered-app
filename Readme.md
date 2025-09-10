# AI-Powered Application

Explore the strategic use of AI, particularly Large Language Models (LLMs), to address key business needs.
Training includes developing solutions for customer support automation via targeted chatbots,
as well as text summarization techniques to condense large sets of user feedback.

### This mini-project includes 2 pages:

1. Text summarization for a product reviews with caching results on the backend side
2. Chatbot that answers user questions about the Imaginary theme park

Both are implementing RAG (Retrieval-Augmented Generation) for 

### How the summarization app works

You can view the product list on the main page.
Each product has user reviews available on the /products page.

On the reviews page, click the Summarize button to get a summary of reviews for that product.

How it works:

1. The backend retrieves the 10 latest reviews from the database.
2. It uses a template file (summarize-reviews.txt), replacing {{reviews}} with the reviews.
3. The instructions are sent to your local TinyLlama model, which generates a summary.
4. The summary is cached in the database.

### How the chat app works programmatically

Visit the /chat page to ask the chat assistant questions about Imaginary theme park.

How it works:

1. The backend receives your prompt.
2. It uses a template file (chatbot.txt) and replaces {{parkInfo}} with information from WonderWorld.md.
3. The instructions are sent to the language model, which generates a response.

### Install and run the app:

First, you need to install project dependencies:

`npm install`

### Run review summarizer:

1. Install [SQL server](https://dev.mysql.com/downloads/mysql/)
 - Select your Operating System and server version 9.4.
 - Set admin password to access the sql server later

Run sql server (from the terminal)

```
sudo /usr/local/mysql/support-files/mysql.server start
```

Enter your PC user pwd

```
Mysql -u root -p
```

Then enter your admin password.

Create .env file (you can copy .env.example).

Replace ADMIN_PWD with your admin password.

Run database migrations from the /packages/server folder:

```
cd packages/server/
```

```
npx prisma migrate dev
```

Then seed the database with products and reviews:

```
npm run seed
```

2. Download and install [Ollama](https://ollama.com/download]) select your Operating System


Then download and run **tinyllama** model
([docs](https://ollama.com/library/tinyllama))
```
ollama run tinyllama
```

3. Execute `npm run dev` from the terminal in root folder

4. Visit the dev page (by default it will run on http://localhost:5173)

### Run AI assistant chat:

1. To run chat app you will need an [https://platform.openai.com] OpenAI account it will allow our chat to remember the previous context
2. Execute `npm run dev` from the terminal in root folder
3. Visit the dev page (by default it will run on http://localhost:5173/chatbot)
