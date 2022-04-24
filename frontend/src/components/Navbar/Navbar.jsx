import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../userState";
import axios from "axios";

const Navbar = () => {
    let navigate = useNavigate();
    let settings = [];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const [user, setUser] = useRecoilState(userState);

    React.useEffect(() => {
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
                setUser(data);
            });
    }, []);

    const logout = () => {
        console.log(localStorage.getItem("access"))
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/user/logout/`, {}, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
            })
            .then((res) => {
                console.log(res.data)
                if (res.status === 200) {
                    localStorage.removeItem('access')
                    setUser(undefined);
                    navigate('/')
                    return res.data;
                }
            })
    };

    const pages = [
        { title: "Инструкторы", link: "/instructors" },
        { title: "Абонементы", link: "/abonements" },
    ];

    if (user) {
        settings = [
            { title: "Профиль", link: "/profile" },
            { title: "Выйти", link: "/logout" },
        ];
    } else {
        settings = [
            { title: "Войти", link: "/login" },
            { title: "Зарегистрироваться", link: "/register" },
        ];
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ mb: 3 }}>
            <Container maxWidth="md">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                        onClick={() => navigate("/")}
                    >
                        FITNESS
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.title}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Button
                                        size="small"
                                        onClick={() => navigate(page.link)}
                                    >
                                        <Typography textAlign="center">
                                            {page.title}
                                        </Typography>
                                    </Button>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        FITNESS
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                onClick={() => {
                                    handleCloseNavMenu();
                                    navigate(page.link);
                                }}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/2.jpg"
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => {
                                if (setting.title === "Выйти") {
                                    return (
                                        <MenuItem
                                            key={setting.title}
                                            onClick={logout}
                                        >
                                            <Typography textAlign="center">
                                                {setting.title}
                                            </Typography>
                                        </MenuItem>
                                    );
                                } else {
                                    return (
                                        <MenuItem
                                            key={setting.title}
                                            onClick={() => {
                                                handleCloseUserMenu();
                                                navigate(setting.link);
                                            }}
                                        >
                                            <Typography textAlign="center">
                                                {setting.title}
                                            </Typography>
                                        </MenuItem>
                                    );
                                }
                            })}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
