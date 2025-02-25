import { RotatingLines } from "react-loader-spinner";

const LoadingSpinner = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
            <RotatingLines
                strokeColor="#7f4e2b"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    );
};

export default LoadingSpinner;
