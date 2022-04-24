import React, { useState } from "react";
import {
    Avatar,
    Button,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../userState";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [user, setUser] = useRecoilState(userState);

    let navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/api/user/login/`,
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: "true",
                },
            )
            .then((res) => {
                if (res.status === 200) {
                    return res.data;
                }
            })
            .catch((err) => {
                console.log(err.res.data)
            })
            .then((data) => {
                const { access } = data;
                localStorage.setItem("access", access);
                console.log(access)
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
                navigate("/");
            })
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={submit}
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Войти
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
