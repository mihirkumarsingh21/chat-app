import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
	return (
		<form className='flex items-center gap-2'>
			<input type='text'  placeholder='Search…' className='input bg-black text-white input-bordered border-orange-600 rounded-full' />
			<button type='submit' className='btn btn-circle  hover:bg-black bg-orange-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none border-orange-600 ' />
			</button>
		</form>
	);
};
export default SearchInput;