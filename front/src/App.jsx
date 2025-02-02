import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// レイアウトをインポート
import DefaultLayout from './layouts/DefaultLayout';

// ページをインポート
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChatRooms from './pages/ChatRooms';
import ChatRoom from './pages/ChatRoom';
import Profile from './pages/Profile';
import Home from './pages/Home';

function App() {
	return (
		<BrowserRouter>
			<DefaultLayout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/chat-rooms" element={<ChatRooms />} />
					<Route path="/chat-rooms/:roomId" element={<ChatRoom />} />
					<Route path="/profile" element={<Profile />} />
				</Routes>
			</DefaultLayout>
		</BrowserRouter>
	);
}

export default App;
