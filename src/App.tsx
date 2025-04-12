import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ExerciseDetail from './pages/ExerciseDetail';
import './App.css';

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<Box width="400px" sx={{ width: { xl: "1488px" } }} m="auto">
				<BrowserRouter>
					<Navbar/>
					<Routes>
						<Route path="/" element={<Home/>}/>
						<Route path="/exercise/:id" element={<ExerciseDetail/>}/>
					</Routes>
				</BrowserRouter>
			</Box>
		</>
	)
}

export default App
