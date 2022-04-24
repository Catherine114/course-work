import React, { useEffect, useState } from "react";
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";

const InstructorListPage = () => {
    const [instructors, setInstructors] = useState();
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/instructors/`).then((res) => {
            if (res.status === 200) {
                setInstructors(res.data);
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
                    Наши фитнес-тренеры
                </Typography>
            </Grid>
            <Grid container spacing={4}>
                {instructors.map((instructor) => (
                    <Grid key={instructor.id} item xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="140"
                                image={
                                    instructor.sex === "М"
                                        ? "https://medaboutme.ru/upload/iblock/a2b/shutterstock_578554774.jpg"
                                        : "https://s1.1zoom.ru/big7/53/Fitness_Dumbbells_Hands_White_background_Beautiful_562300_1920x1279.jpg"
                                }
                                alt={instructor.first_name}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                >
                                    {instructor.first_name}{" "}
                                    {instructor.last_name}
                                </Typography>
                                <Typography style={{ wordBreak: "break-all" }}>
                                    {instructor.description.slice(0, 50)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    onClick={() =>
                                        navigate(
                                            `/instructors/${instructor.id}`,
                                        )
                                    }
                                >
                                    Подробнее
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default InstructorListPage;
