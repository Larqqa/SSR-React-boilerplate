import React, { useState } from 'react';

const Clicker = () => {
	const [clicker, setClicker] = useState(0);

	const handleClick = () => {
		setClicker(clicker + 1);
	};

	return (
		<div>
			<p>clicks {clicker}</p>
			<button onClick={handleClick} >Click Me!</button>
		</div>
	);
};

export default Clicker;