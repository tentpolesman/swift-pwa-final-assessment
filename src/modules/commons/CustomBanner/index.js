const CustomBanner = (props) => {
    const image = props.image;
    return (
        <>
            <img src={image} style={{ width: "100%", margin: "16px 0", borderRadius: "6px" }} alt="image" />
        </>
    )
}

export default CustomBanner;
