import { useTheme, Typography } from "@mui/material";
import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const HomePage: React.FC<any> = ({  }) => {
  const theme = useTheme();

  return (
    <>
      <Typography>Loader should appear below</Typography>
      <ScaleLoader color={theme.palette.primary.main} />
    </>
  );
};


export default HomePage;
