import { useEffect, useState } from "react";
import {
    Container,
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
} from "@mui/material";
import Loader from "../../components/Loader/Loader";

import axios from "axios";

const ClassesPage = () => {
    const [classes, setClasses] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/classes/`)
            .then((res) => {
                if (res.status === 200) {
                    setClasses(res.data);
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
                    Доступные занятия
                </Typography>
            </Grid>
            <Grid container spacing={4}>
                {classes.map((classe) => (
                    <Grid key={classe.id} item xs={12} sm={6} md={4}>
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
                                    "https://medaboutme.ru/upload/iblock/a2b/shutterstock_578554774.jpg"
                                }
                                alt={classe.name}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                >
                                    Длительность в минутах: {classe.duration}
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                >
                                    {classe.price} ₽
                                </Typography>
                                <Typography style={{ wordBreak: "break-all" }}>
                                    {classe.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ClassesPage;
