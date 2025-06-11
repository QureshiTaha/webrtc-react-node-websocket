import { useEffect, useRef } from "react";

export const VideoPlayer: React.FC<{ stream?: MediaStream }> = ({ stream }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && stream) videoRef.current.srcObject = stream;
    }, [stream]);
    return (
        <video
            data-testid="peer-video"
            style={{ maxWidth: "100vw", height: "90vh" }}
            ref={videoRef}
            autoPlay
            muted={true}
        />
    );
};
