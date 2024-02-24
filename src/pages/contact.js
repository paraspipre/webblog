import Layout from '../components/Layout';
import Link from 'next/link';
import ContactForm from '../components/form/ContactForm';

const Contact = () => {
   return (
      <Layout>
         <div className="flex flex-col items-center mt-5 ">
            <div className='w-[50%] flex flex-col gap-4'>
               <h2 className=' text-[34px] text-[#1b0044] font-[500] w-full border-b-[1px] border-dotted '>Contact</h2>
               <ContactForm />
            </div>
         </div>
      </Layout>
   );
};

export default Contact;