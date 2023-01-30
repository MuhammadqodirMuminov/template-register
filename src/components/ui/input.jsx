const Input = ({ label, type, state, setState }) => {
	return (
		<div className="form-floating mt-2">
			<input
				type={type}
				class="form-control"
				id="floatingInput"
				placeholder={label}
				value={state}
				onChange={(e) => setState(e.target.value)}
			/>
			<label htmlFor="floatingInput">{label}</label>
		</div>
	);
};

export default Input;
