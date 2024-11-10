import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'

type Props = {
    videoUrl: string,
    title: string,
}

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
    const [videoData, setVideoData] = useState({
        otp: "",
        playbackInfo: "",
    });

    useEffect(() => {
        axios.post("http://localhost:8888/api/v1/getVdoCipherOTP", {
            videoId: videoUrl,
        }).then((res) => {
            setVideoData(res.data);
        });
    }, [videoUrl]);
    return (
        <div style={{ paddingTop: "41%", position: "relative" }}>
            {
                videoData.otp && videoData.playbackInfo !== "" && (
                    <iframe
                        src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=bwVvK9ABLhYBAP92`}
                        style={{
                            border: 0,
                            width: "90%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 55,
                        }}
                        allowFullScreen={true}
                        allow='encrypted-media'
                    ></iframe>
                )
            }
        </div>
    )
}

export default CoursePlayer