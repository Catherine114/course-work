import React from "react";
import { Grid, CircularProgress } from "@mui/material";

const Loader = () => {
    return (
        <Grid container spacing={0} direction="column" alignItems="center">
            <CircularProgress color="secondary" />
        </Grid>
    );
};

export default Loader;
