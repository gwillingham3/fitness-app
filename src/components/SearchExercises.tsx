import { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import HorizontalScrollBar from './HorizontalScrollBar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
	
	const [search, setSearch] = useState("");
	const [bodyParts, setBodyParts] = useState([]);
	
	const handleSearch = async () => {
		if (search) {
			try {
				const response = await axios.get("https://exercisedb.p.rapidapi.com/exercises", { 
					params: {
						limit: '0',
						offset: '0'
					},
					headers: {
						'x-rapidapi-key': import.meta.env.VITE_REACT_APP_RAPID_API_KEY,
						'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
					}
				});
				const allExercises = response.data;
				const searchedExercises = allExercises.filter((exercise) => {
					return (
						exercise.name.toLowerCase().includes(search) || exercise.target.toLowerCase().includes(search) || exercise.equipment.toLowerCase().includes(search) || exercise.bodyPart.toLowerCase().includes(search)
					);
				});
				setSearch("");
				setExercises(searchedExercises);
			} catch (error) {
				console.log(error);
			}
		}
	}
	
	const fetchExercisesData = async () => {
		const response = await axios.get("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", {
			headers: {
				'x-rapidapi-key': import.meta.env.VITE_REACT_APP_RAPID_API_KEY,
				'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
			}
		});
		const bodyPartsData = response.data;
		console.log(bodyPartsData);
		setBodyParts(["all", ...bodyPartsData]);
	}
	
	useEffect(() => {
		fetchExercisesData();
	}, []);
	
	return (
		<Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
			<Typography color="#3A1212" fontWeight={700} mb="50px" textAlign="center" sx={{
			fontSize: { lg: "44px", xs: "30px" }
			}}>Awesome Exercises You <br/> Should Know</Typography>
			<Box position="relative" mb="72px">
				<TextField height="76px" type="text" value={search} placeholder="Search Exercises" onChange={(e) => setSearch(e.target.value.toLowerCase())} sx={{
					input: { 
						fontWeight: "700",
						border: "none",
						borderRadius: "4px"
					},
					width: { lg: "800px", xs: "350px" },
					backgroundColor: "#fff",
					borderRadius: "40px"
				}} />
				<Button className="search-btn" onClick={handleSearch} sx={{
					fontSize: { lg: "20px", xs: "14px" },
					bgcolor: "#FF2625",
					color: "#fff",
					textTransform: "none",
					position: "absolute",
					right: "0",
					height: "56px",
					width: { lg: "175px", xs: "80px" }
				}}>Search</Button>
			</Box>
			<Box sx={{
				position: "relative",
				width: "100%",
				p: "20px"
			}}>
				<HorizontalScrollBar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} isBodyParts />
			</Box>
		</Stack>
	);
	
}

export default SearchExercises