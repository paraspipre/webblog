import Layout from '../components/Layout';
import SignupComponent from '../components/auth/SignupComponent';
import Link from 'next/link';

const Signup = () => {
    return (
        <Layout>
            <div className="sign">
                <div className="w-[50%]">
                    <h1 className="main-head text-center mb-4">Sign Up</h1>
                    <SignupComponent />
                </div>
            </div>
        </Layout>
    );
};

export default Signup;