import {
    Card,
    CardHeader,
    Button,
    IconButton,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

const AbonementCard = ({ abonement }) => {
    const [expanded, setExpanded] = React.useState(false);

    let navigate = useNavigate();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                sx={{
                    minHeight: 88,
                    display: "inline-block",
                    position: "relative",
                }}
                title={`Абонемент на ${abonement.duration}`}
                subheader={`Рассчитан на ${abonement.visitings} посещений`}
                titleTypographyProps={{
                    verticalalign: "top",
                }}
                subheaderTypographyProps={{
                    position: "absolute",
                    bottom: 16,
                }}
            />
            <CardMedia
                component="img"
                height="194"
                image="https://cache3.youla.io/files/images/780_780/5a/8c/5a8c0c7de7696a9721116532.jpg"
                alt={abonement.duration}
            />
            <CardActions disableSpacing>
                <Button
                    size="small"
                    onClick={() => navigate(`/abonements/${abonement.id}`)}
                >
                    Подробнее
                </Button>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography gutterBottom variant="body1">
                        Абонемент даёт доступ к разным помещениям в спортзале.
                        Их краткий список:
                    </Typography>
                    {abonement.access_info.map((access) => (
                        <Typography key={access.id} paragraph>
                            {access.name}
                        </Typography>
                    ))}
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default AbonementCard;
