import { useState, useEffect } from "react";
import {
    Container,
    Grid,
    Typography,
    Button,
    Collapse,
    IconButton,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import { useRecoilState } from "recoil";
import { userState } from "../../../userState";
import AbonementAccessBlock from "../../../components/AbonementAccessBlock/AbonementAccessBlock";

const AbonementDetailPage = () => {
    let params = useParams();

    const [abonement, setAbonement] = useState();
    const [loading, setLoading] = useState(true);

    const [userData, setUser] = useRecoilState(userState);

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/api/abonements/${params.id}/`,
            )
            .then((res) => {
                if (res.status === 200) {
                    setAbonement(res.data);
                    setTimeout(() => {
                        setLoading(false);
                    }, 700);
                    console.log(res.data);
                }
            });
    }, []);

    const buy = (id) => {
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/api/user/add_abonement/`,
                {
                    id,
                },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access",
                        )}`,
                    },
                },
            )
            .then((res) => {
                if (res.status === 200) {
                    return res.data;
                }
            })
            .then(() => {
                axios
                    .get(`${process.env.REACT_APP_API_URL}/api/user/user/`, {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access",
                            )}`,
                        },
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            return res.data;
                        }
                    })
                    .then((data) => {
                        setUser(data);
                    });
            });
    };

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
                    Абонемент на {abonement.duration}
                </Typography>
                <img
                    src="https://cache3.youla.io/files/images/780_780/5a/8c/5a8c0c7de7696a9721116532.jpg"
                    alt=""
                />
                <Typography gutterBottom variant="h5">
                    Абонемент предоставляет доступ в:
                </Typography>
                {abonement.access_info.map((access) => (
                    <AbonementAccessBlock access={access} key={access.id} />
                ))}
                <Typography gutterBottom variant="h5">
                    Рассчитан на {abonement.visitings} походов в зал
                </Typography>
                <Typography gutterBottom variant="h5">
                    Цена: {abonement.price} ₽
                </Typography>

                {userData ? (
                    !userData.abonements.includes(abonement.id) ? (
                        <Button
                            variant="contained"
                            onClick={() => {
                                buy(abonement.id);
                            }}
                        >
                            Купить
                        </Button>
                    ) : (
                        <Typography>У вас уже есть этот абонемент</Typography>
                    )
                ) : (
                    <Button variant="contained" disabled>
                        Купить
                    </Button>
                )}
            </Grid>
        </Container>
    );
};

export default AbonementDetailPage;
