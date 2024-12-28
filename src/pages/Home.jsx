import React from 'react';
import Applayout from '../components/layout/Applayout';
import { Box, Typography } from '@mui/material';
import { grayColor } from '../constants/color.js';
import { useMyChatsQuery } from '../redux/api/api.js';

const Home = () => {
  const { data } = useMyChatsQuery("");

  return (
    <Box bgcolor={grayColor} height={"100%"}>
      {/* Conditional Rendering Based on data.chats */}
      {data?.chats?.length > 0 ? (
        <Typography
          variant="h5"
          color="textSecondary"
          textAlign="center"
          p={"2rem"}
        >
          Select friends to chat.
        </Typography>
      ) : (
        <Typography
          variant="h5"
          color="textSecondary"
          textAlign="center"
          p={"2rem"}
        >
          No friends to chat.
        </Typography>
      )}
    </Box>
  );
};

export default Applayout()(Home);
