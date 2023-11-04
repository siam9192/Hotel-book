import React, { useContext, useState } from 'react';
import { fireBaseContext } from '../../../../AuthProvider/AuthProvider';
import { useNavigate,useLocation } from 'react-router-dom';

const SignUp = () => {
            const [toggle,setToggle] = useState(false);
            const [err,setErr] = useState('');
            const {createUser,handleUser} = useContext(fireBaseContext);
            const [loading,setLoading] = useState(false);
            const navigate = useNavigate();
          const {state} = useLocation();
        const handleSignUp = (e)=>{
            e.preventDefault();
            setLoading(true)
            setErr('')
            const form = e.target;
            const name = form.name.value;
            let photoUrl = form.photo.value;
            const email = form.email.value;
            const password = form.password.value;
            
            if(password.length < 6){
                setLoading(false)
                setErr('Password must be at least 6 characters');
                
                return;
            }
            else if(!/[A-Z]/.test(password)){
                setLoading(false)
            setErr('Password must have minimum one Capital letter');
            return;
            }
            else if(!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/.test(password)){
                setLoading(false)
                setErr('Password must have minimum one special characters');
                return;
            }
            
        createUser(email,password)
        .then(user => {
            updateProfile(auth.currentUser,{
                displayName:name,photoURL:photoUrl
                 })
                 handleUser(null)
               signOut(auth)
                 setLoading(false)
                 Swal.fire(
                    'Good job!',
                    'Registration successful!',
                    'success'
                  )
                
        })
        .catch(error=>{
            setLoading(false)
            if(error.code == 'auth/email-already-in-use'){
                setErr('You  already  have an account')
                }
        })
        }
        const googleLogin = ()=>{
            const provider = new GoogleAuthProvider();
             signInWithPopup(auth,provider)
             .then(res=>{
                console.log(res)
                if(state){
                    navigate(state);
                }
                else{
                    navigate('/')
                }
             })
        }
    


    return (
        <div>
            <div className='grid md:grid-cols-2 min-h-[100vh] font-pop'>
             <div className='md:py-10 py-2 mx-2'>
              <h1 className='text-4xl text-center text-black'>Create your account</h1>
              <form className='space-y-6' onSubmit={handleSignUp} >
                <div className='space-y-2'>
                    <h3>Your Name</h3>
                    <input type="text" placeholder='Karim' name='name' className='w-full py-3 bg-gray-200 border-2 outline-none rounded px-2' required/>
                </div>
                <div className='space-y-2'>
                    <h3>Your Photo</h3>
                    <input type="text" name='photo' placeholder='URL' className='w-full py-3 bg-gray-200 border-2 outline-none rounded px-2'  required/>
                </div>
                <div className='space-y-2'>
                    <h3>Your email</h3>
                    <input type="text" placeholder='karim@gmail.com' name='email' className='w-full py-3 bg-gray-200 border-2 outline-none rounded px-2' required/>
                </div>
                <div className='space-y-2'>
                    <h3>Password</h3>
                    <input type="text" name='password' className='w-full py-3 bg-gray-200 border-2 outline-none rounded px-2' required/>
                </div>
                <div className='space-y-2'>
                    <h3>Confrim Password</h3>
                    <input type="text" name='con-password' className='w-full py-3 bg-gray-200 border-2 outline-none rounded px-2' required/>
                </div>
                <button className='w-full py-2 text-white bg-blue-600'>Create your account</button>
              </form>
             </div>
             <div className='banner h-full flex justify-center items-center lg:block hidden'>
                    <div>
                        <h1 className='text-4xl text-white font-semibold'>Start your new journey with us <br />from here...</h1>
                    </div>
             </div>
            </div>
        </div>
    );
}

export default SignUp;
