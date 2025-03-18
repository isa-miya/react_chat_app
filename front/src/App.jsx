import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// レイアウトをインポート
import DefaultLayout from './layouts/DefaultLayout';

// ページをインポート
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChatRooms from './pages/ChatRooms';
import ChatRoom from './pages/ChatRoom';
import Profile from './pages/Profile';
import Home from './pages/Home';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EditProfile from './pages/EditProfile';
import CreateChatRoom from './pages/CreateChatRoom';

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Provider store={store}>
					<DefaultLayout>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/chat-rooms" element={<ChatRooms />} />
							<Route path="/chat-rooms/:roomId" element={<ChatRoom />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/edit-profile" element={<EditProfile />} />
							<Route path="/verify-email/:token" element={<VerifyEmail />} />
							<Route path="/forgot-password" element={<ForgotPassword />} />
							<Route path="/reset-password/:token" element={<ResetPassword />} />
							<Route path="/create-chat-room" element={<CreateChatRoom />} />
						</Routes>
					</DefaultLayout>
				</Provider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
