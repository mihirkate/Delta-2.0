import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";

export default function InfoBox({ info }) {
    const INIT_URL =
        "https://unsplash.com/photos/body-of-water-and-view-of-sunset-vlRTz71Jazk";

    const Rain_URL =
        "https://plus.unsplash.com/premium_photo-1664360970485-99ec77c55787?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const COLD_URL =
        "https://plus.unsplash.com/premium_photo-1675791930245-a94ea3edcaea?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const HOT_URL =
        "https://images.unsplash.com/photo-1447601932606-2b63e2e64331?q=80&w=1958&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    return (
        <div className='InfoBox'>
            <div className="cardContainer">
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 150 }}
                        image={
                            info.humidity > 80 ? (
                                HOT_URL
                            ) : info.temp > 15 ? (
                                Rain_URL
                            ) : (
                                COLD_URL
                            )
                        }
                        title='green iguana'
                    />

                    <CardContent>
                        <Typography gutterBottom variant='h5' component='div'>
                            {info.city}
                        </Typography>

                        <Typography
                            variant='body2'
                            color='text.secondary'
                            component={"span"}
                        >
                            <p>
                                {info.city}
                                {info.humidity > 80 ? (
                                    <WbSunnyIcon />
                                ) : info.temp > 15 ? (
                                    <ThunderstormIcon />
                                ) : (
                                    <AcUnitIcon />
                                )}
                            </p>

                            <p>
                                <b>Temperature ={info.temp}&deg;</b>
                            </p>

                            <p>
                                <b>Max-Temperature ={info.tempMax}&deg;</b>
                            </p>

                            <p>
                                <b>Min-Temperature ={info.tempMin}&deg;</b>
                            </p>

                            <p>
                                <b>Humidity ={info.humidity}</b>
                            </p>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
