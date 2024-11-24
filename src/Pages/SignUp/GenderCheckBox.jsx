
const GenderCheckBox = ({ onChangeGenderCheckBox, selectedGender }) => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer  `}>
					<span className='label-text text-white'>Male</span>
					<input
						type='checkbox'
						className='checkbox border-orange-500'
						checked={selectedGender === "male"}
						onChange={() => onChangeGenderCheckBox(selectedGender === "male" ? "" : "male")}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer` }>
					<span className='label-text text-white'>Female</span>
					<input
						type='checkbox'
						className='checkbox border-orange-500'
						checked={selectedGender === "female"}
						onChange={() => onChangeGenderCheckBox(selectedGender === "female" ? "" : "female")}
					/>
				</label>
			</div>
		</div>
	);
};



export default GenderCheckBox;












