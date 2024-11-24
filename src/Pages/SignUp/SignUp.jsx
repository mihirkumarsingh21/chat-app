import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import {useSignup} from "../../hooks/useSignup.js";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullname: "",
		username: "",
		password: "",
		confirmpassword: "",
		gender: "",
	});

	const {loading, signUp} = useSignup(inputs);


	const handleSubmit = async  (e) => {
		e.preventDefault();
		// console.log(inputs);		
		await signUp(inputs) 
	};

    const changeGenderCheckBox = (gender) => {
		setInputs({...inputs, gender: gender})
	}


	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-orange-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text text-white'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='John Doe'
							className='w-full input input-bordered text-white bg-black border-orange-500 h-10'
							value={inputs.fullname}
							onChange={(e) => setInputs({...inputs, fullname: e.target.value})}
						/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text text-white'>Username</span>
						</label>
						<input
							type='text'
							placeholder='johndoe'
							className='w-full input input-bordered h-10 text-white bg-black border-orange-500 '
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-white'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10 text-white bg-black border-orange-500 '
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-white'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10 text-white	 bg-black border-orange-500 '
							value={inputs.confirmpassword}
							onChange={(e) => setInputs({ ...inputs, confirmpassword: e.target.value })}
						/>
					</div>

					<GenderCheckbox onChangeGenderCheckBox = {changeGenderCheckBox} selectedGender = {inputs.gender} />

					<Link
						to={"/login"}
						className='text-sm hover:underline text-white hover:text-orange-600 mt-2 inline-block'
						
					>
						Already have an account?
					</Link>

					<div>
						<button disabled={loading} className='btn btn-block btn-sm mt-2 border border-orange-700 bg-black text-white hover:bg-black hover:text-orange-500 hover:border-orange-700'>
							{
                              loading ? <span className="loading loading-spinner" ></span> : "Sign Up"
							}
						
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;