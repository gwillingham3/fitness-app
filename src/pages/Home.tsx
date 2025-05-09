import { useState } from 'react';
import { Box } from '@mui/material';
import HeroBanner from '../components/HeroBanner';
import SearchExercises from '../components/SearchExercises';
import Exercises from '../components/Exercises';

function Home() {
	
	const [exercises, setExercises] = useState([]);
	const [bodyPart, setBodyPart] = useState("all");
	
	console.log(bodyPart);
	
	return (
		<>
			<Box>
				<HeroBanner />
				<SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
				<Exercises exercises={exercises} setExercises={setExercises} bodyPart={bodyPart} />
			</Box>
		</>
	);

}

export default Home;