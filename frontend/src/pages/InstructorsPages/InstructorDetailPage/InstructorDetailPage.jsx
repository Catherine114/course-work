import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";

const InstructorDetailPage = () => {
    let params = useParams();

    const [instructor, setInstructor] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/instructors/${params.id}/`)
            .then((res) => {
                if (res.status === 200) {
                    setInstructor(res.data);
                    setTimeout(() => {
                        setLoading(false);
                    }, 700);
                    console.log(res.data);
                }
            });
    }, []);

    if (loading) {
        return (
            <Loader />
        );
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
                    {instructor.first_name} {instructor.last_name}
                </Typography>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={8}>
                        <Typography gutterBottom variant="h4" align="center">
                            {instructor.last_name} {instructor.first_name}{" "}
                            {instructor.middle_name}
                        </Typography>
                        <Typography gutterBottom variant="h6">
                            Дата рождения:{" "}
                            {instructor.date_of_birth
                                .split("-")
                                .reverse()
                                .join(".")}
                        </Typography>
                        <Typography gutterBottom variant="h6">
                            Стоимость: {instructor.cost} ₽/час
                        </Typography>
                        <Typography gutterBottom variant="h6">
                            Пол: {instructor.sex}
                        </Typography>
                        <Typography gutterBottom variant="h6" align="center">
                            Дополнительная информация
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="body1"
                            style={{ wordBreak: "break-all" }}
                        >
                            {instructor.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <img
                            src={
                                instructor.sex === "М"
                                    ? "https://medaboutme.ru/upload/iblock/a2b/shutterstock_578554774.jpg"
                                    : "https://s1.1zoom.ru/big7/53/Fitness_Dumbbells_Hands_White_background_Beautiful_562300_1920x1279.jpg"
                            }
                            alt={instructor.first_name}
                            loading="lazy"
                            height="200px"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default InstructorDetailPage;
