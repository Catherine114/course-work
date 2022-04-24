import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Container, Typography } from "@mui/material";
import Loader from "../../../components/Loader/Loader";
import AbonementCard from "../../../components/AbonementCard/AbonementCard";

const AbonementsListPage = () => {
    const [abonements, setAbonements] = useState();
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/abonements/`).then((res) => {
            if (res.status === 200) {
                setAbonements(res.data);
                setTimeout(() => {
                    setLoading(false);
                }, 700);
                console.log(res.data);
            }
        });
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <Container sx={{ pb: 8 }} maxWidth="md">
            <Grid
                container
                direction="column"
                alignItems="center"
                sx={{ mb: 2 }}
            >
                <Typography gutterBottom variant="h3">
                    Наши фитнес-тренеры
                </Typography>
            </Grid>
            <Grid container spacing={4}>
                {abonements.map((abonement) => (
                    <Grid item key={abonement.id} xs={12} sm={6} md={4}>
                        <AbonementCard abonement={abonement} key={abonement.id} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default AbonementsListPage;
