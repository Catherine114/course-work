import { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import AbonementCard from "../../components/AbonementCard/AbonementCard";
import { useRecoilState } from "recoil";
import { userState } from "../../userState";

const ProfilePage = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState();
    const [abonements, setAbonements] = useState();

    const [user, setUser] = useRecoilState(userState);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/user/user/`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    return res.data;
                }
            })
            .then((data) => {
                console.log(data);
                setUserData(data);
                axios
                    .get(`${process.env.REACT_APP_API_URL}/api/abonements/`)
                    .then((res) => {
                        if (res.status === 200) {
                            setAbonements(res.data);
                            setTimeout(() => {
                                setLoading(false);
                            }, 700);
                            console.log(res.data);
                        }
                    });
            });
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <Container sx={{ pb: 8 }} maxWidth="md">
            <Typography gutterBottom variant="h2" align="center">
                {userData.last_name} {userData.first_name}{" "}
                {userData.middle_name}
            </Typography>
            <Typography gutterBottom variant="h3">
                О вас
            </Typography>
            <Typography gutterBottom variant="h5">
                Email: {userData.email}
            </Typography>
            <Typography gutterBottom variant="h5">
                Дата рождения: {userData.date_of_birth}
            </Typography>
            <Typography gutterBottom variant="h5">
                Доп. информация
            </Typography>
            <Typography paragraph gutterBottom>
                {userData.extra_info}
            </Typography>
            <Grid
                container
                direction="column"
                alignItems="center"
                sx={{ mb: 2 }}
            >
                <Typography gutterBottom variant="h5">
                    Ваши абонементы
                </Typography>
            </Grid>
            <Grid container spacing={4}>
                {userData.abonements.map((abonement) => (
                    <Grid item key={abonement} xs={12} sm={6} md={4}>
                        <AbonementCard
                            key={abonement}
                            abonement={abonements[abonement - 1]}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProfilePage;
