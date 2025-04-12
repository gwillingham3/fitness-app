import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import HeroBannerImage from '../assets/images/banner.png';

const HeroBanner = () => {
	
	return (
		<>
			<Box sx={{
				mt: { lg: "212px", xs: "70px" }, 
				ml: { sm: "50px" }
			}} position="relative" p="20px">
				<Stack textAlign="left">
					<Typography color="#FF2625" fontWeight="600" fontSize="26px">Fitness Club</Typography>
					<Typography color="#3A1212" fontWeight="700" mb="23px" mt="30px" sx={{ fontSize: { lg: "44px", xs: "40px" } }}>Work Hard!</Typography>
					<Typography color="#3A1212" fontSize="22px" lineHeight="35px" mb={4}>Search for some new exercises!</Typography>
				</Stack>
				<Stack>
					<a href="#exercises" style={{ marginTop: '45px', textDecoration: 'none', width: '200px', textAlign: 'center', background: '#FF2625', padding: '14px', fontSize: '22px', textTransform: 'none', color: 'white', borderRadius: '4px' }}>Explore Exercises</a>
				</Stack>
				<Typography fontWeight="600" color="#FF2625" fontSize="200px" sx={{ opacity: 0.1, display: { lg: "block", xs: "none" } }}>Exercises</Typography>
				<img src={HeroBannerImage} alt="banner image" className="hero-banner-img" />
			</Box>
		</>
	);
	
}

export default HeroBanner