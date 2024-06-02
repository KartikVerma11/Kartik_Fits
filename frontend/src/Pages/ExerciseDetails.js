import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Detail from '../components/Detail.js';
import ExerciseVideos from '../components/ExerciseVideos.js';
import SimilarExercises from '../components/SimilarExercises.js';
import { exerciseOptions, fetchData, youtubeOptions } from '../Utils/fetchData';

const ExerciseDetails = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]); 
  const [targetMuscleExercises,setTargetMuscleExercises] =useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
        const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

        const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
        setExerciseDetail(exerciseDetailData);

        const exerciseVideoData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions);
        
        setExerciseVideos(exerciseVideoData.contents ||[]);

        const targetMuscleExerciseData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,exerciseOptions)
        setTargetMuscleExercises(targetMuscleExerciseData);
      } catch (error) {
        console.error('Error fetching exercise data:', error);
        setExerciseVideos([]); 
      }
    };

    fetchExerciseData();

    window.scrollTo(0, 0)
  }, [id]);

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} />
    </Box>
  );
};

export default ExerciseDetails;
