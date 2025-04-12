import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';
import axios from 'axios';
import ExerciseCard from './ExerciseCard';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
	
	const [currentPage, setCurrentPage] = useState(1);
	
	const exercisesPerPage = 9;
	const indexOfLastExercise = currentPage*exercisesPerPage;
	const indexOfFirstExercise = indexOfLastExercise-exercisesPerPage;
	let exercisesArr = [];
	let currentExercises = [];
	console.log(exercisesArr);
	if (exercises.data) {
		exercisesArr = exercises.data;
		currentExercises = exercisesArr.slice(indexOfFirstExercise, indexOfLastExercise);
	}
	
	const paginate = (e, value) => {
		setCurrentPage(value);
		
		window.scrollTo({ top: 1800, behavior: "smooth" });
	};
	
	const fetchExercisesData = async () => {
		let exercisesData = [];
		
		try {
			if (bodyPart === "all") {
				exercisesData = await axios.get("https://exercisedb.p.rapidapi.com/exercises", { 
					params: {
						limit: '0',
						offset: '0'
					},
					headers: {
						'x-rapidapi-key': import.meta.env.VITE_REACT_APP_RAPID_API_KEY,
						'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
					}
				});
			} else {
				exercisesData = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, {
					params: {
						limit: '0',
						offset: '0'
					},
					headers: {
						'x-rapidapi-key': import.meta.env.VITE_REACT_APP_RAPID_API_KEY,
						'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
					}
				});
			}
		} catch (error) {
			console.log(error);
		}
		
		setExercises(exercisesData);
	}
	
	useEffect(() => {
		fetchExercisesData();
	}, [bodyPart]);
	
	return (
		<Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
			<Typography variant="h3" mb="46px" color="#3A1212">
				Showing Results
			</Typography>
			<Stack direction="row" sx={{ gap: { lg: "110px", xs: "50px" } }} flexWrap="wrap" justifyContent="center">
				{exercisesArr !== [] && (
					currentExercises?.map((exercise, index) => (
						<ExerciseCard key={index} exercise={exercise} />
					))
				)}
			</Stack>
			<Stack mt="100px" alignItems="center">
				{exercisesArr.length > 9 && (
					<Pagination 
						color="standard" 
						shape="rounded" 
						defaultPage={1} 
						count={Math.ceil(exercisesArr.length/exercisesPerPage)} 
						page={currentPage}
						onChange={paginate}
						size="large"
					/>
				)}
			</Stack>
		</Box>
	);
	
}

export default Exercises