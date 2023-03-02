import {MDBBtn, MDBContainer, MDBFooter} from "mdb-react-ui-kit";

const Footer = () => {
    return (
        <MDBFooter className='text-center text-white' style={{ backgroundColor: '#646464',
                                                                position : "fixed",
                                                                left:0,
                                                                bottom:0,
                                                                right:0}}>
            <div className='text-center p-3' style={{ backgroundColor: '#212529' }}>
                © 2023 Copyright:
                <a className='text-white' href='https://www.linkedin.com/in/vitaly-karpii-8abb6a231/'>
                     <span> Vitaly Karpii </span>
                </a>
            </div>
        </MDBFooter>
    );
};

export default Footer;