import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ChatBot } from '@/components/chat/ChatBot.tsx';
import ProductsList from '@/components/products/ProductsList.tsx';
import ReviewList from '@/components/reviews/ReviewList.tsx';

function Nav() {
    return (
        <nav className="flex gap-8 fixed top-0 w-full bg-primary text-primary-foreground shadow-xs px-4 py-2">
            <Link to="/">Products</Link>
            <Link to="/chatbot">Chatbot</Link>
        </nav>
    );
}

function App() {
    return (
        <Router>
            <Nav />
            <div className="p-4 mt-20 h-full">
                <Routes>
                    <Route path="/" element={<ProductsList />} />
                    <Route
                        path="/product/:productId/reviews"
                        element={<ReviewList />}
                    />
                    <Route
                        path="/chatbot"
                        element={<ChatBot className="h-[calc(100vh-120px)]" />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
