import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import axios from 'axios';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

function ExerciseDetail() {
	
	const [exerciseDetail, setExerciseDetail] = useState({});
	const [exerciseVideos, setExerciseVideos] = useState([]);
	const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
	const [equipmentExercises, setEquipmentExercises] = useState([]);
	const { id } = useParams();
	const lastCallTime = useRef(0);
	
	const fetchExercisesData = async () => {
		const exercisesDbUrl = "https://exercisedb.p.rapidapi.com";
		const youtubeSearchUrl = "https://youtube-search-and-download.p.rapidapi.com";
		
		try {
			const exerciseResponse = await axios.get(`${exercisesDbUrl}/exercises/exercise/${id}`, { 
				params: {
					limit: '0',
					offset: '0'
				},
				headers: {
					'x-rapidapi-key': import.meta.env.VITE_REACT_APP_RAPID_API_KEY,
					'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
				}
			});
			const exerciseDetailData = exerciseResponse.data;
			setExerciseDetail(exerciseDetailData);
			
			const youtubeResponse = await axios.get(`${youtubeSearchUrl}/search`, {
				params: {
					query: `${exerciseDetailData.name}`
				},
				headers: {
					'x-rapidapi-key': import.meta.env.VITE_REACT_APP_RAPID_API_KEY_2,
					'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com'
				}
			});
			const youtubeResponseData = youtubeResponse.data;
			setExerciseVideos(youtubeResponseData.contents);
			
			const targetMuscleResponse = await axios.get(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, {
				headers: {
					'x-rapidapi-key': import.meta.env.VITE_REACT_APP_RAPID_API_KEY_2,
					'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com'
				}
			});
			const targetMuscleData = targetMuscleResponse.data;
			setTargetMuscleExercises(targetMuscleData);
			
			const equipmentResponse = await axios.get(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, {
				headers: {
					'x-rapidapi-key': import.meta.env.VITE_REACT_APP_RAPID_API_KEY_2,
					'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com'
				}
			});
			const equipmentResponseData = equipmentResponse.data;
			setEquipmentExercises(equipmentResponseData);
			
		} catch (error) {
			console.log(error);
		}
		
	}
	
	useEffect(() => {
		// Throttle
		const now = Date.now();
		if (now - lastCallTime.current < 1000) {
			return;
		}
		
		fetchExercisesData();
	}, [id]);
	
	return (
		<Box>
			<Detail exerciseDetail={exerciseDetail} />
			<ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
			<SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises}/>
		</Box>
	);

}

export default ExerciseDetail;