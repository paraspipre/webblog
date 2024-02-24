import Layout from '../components/Layout';
import { withRouter } from 'next/router';
import SigninComponent from '../components/auth/SigninComponent';

const Signin = ({ router }) => {
    const showRedirectMessage = () => {
        if (router.query.message) {
            return <div className="alert alert-danger">{router.query.message}</div>;
        } else {
            return;
        }
    };

    return (
        <Layout>
            <div className="sign">
                <div className='w-[50%]'>
                    <div className="main-head text-center mb-4" >Sign In</div>
                    <div className="">
                        <div className="">{showRedirectMessage()}</div>
                    </div>
                    <SigninComponent />
                </div>
            </div>
        </Layout>
    );
};

export default withRouter(Signin);