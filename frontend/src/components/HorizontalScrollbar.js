import React from 'react';
import { Box } from '@mui/material';
import BodyPart from './BodyPart';
import ExerciseCard from './ExerciseCard';
const HorizontalScrollbar = ({ data, setBodyPart, bodyPart,isBodyPart}) => {
  return (
    <Box className="horizontal-scrollbar">
      {data.map((item, index) => {
        const { id } = item;
        const key = id || index; // Using index as a fallback for key
        return (
          <Box
            key={key}
            itemID={id || index}
            title={id || index}
            m="0 40px"
          >
            {isBodyPart?<BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />: <ExerciseCard exercise={item}/>}
          </Box>
        );
      })}
    </Box>
  );
};

export default HorizontalScrollbar;
