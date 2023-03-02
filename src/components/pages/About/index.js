
export const imgStyle = {
    height:"100px",
    weight:"auto"
}

const About = () => {
    return(<div className="border p-5 text-center rounded mb-5 mt-5 shadow" style={{marginLeft:"30%",marginRight:"30%",backgroundColor:"#c4c4c4"}}>
                <h2>Gift Certificate System</h2>
                <p>This project is designed as a test task.</p>
                <img src="https://logos-download.com/wp-content/uploads/2016/09/React_logo_logotype_emblem.png"
                     alt="React Logo" style={imgStyle}/>
            </div>
    );
};

export default About;