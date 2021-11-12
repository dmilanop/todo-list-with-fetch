import React, { useState } from "react";
import "bootstrap";
//create your first component
const Home = () => {
	const [input, setInput] = useState("");

	const [toDo, setToDo] = useState([]);

	const handleKeyDown = e => {
		if (e.key === "Enter") {
			if (input.trim != "") {
				setToDo([...toDo, input]);
				setInput("");
			}
		}
	};

	const handleDeleteTask = id => {
		const newArray = toDo.filter((toDo, index) => index != id);
		setToDo(newArray);
	};

	return (
		<div className="container div-father">
			<p className="p1">todos</p>
			<ul
				className="list-group ul-list"
				onSubmit={e => e.preventDefault()}>
				<input
					className="list-group input-important"
					type="text"
					placeholder="What needs to done?"
					name="text"
					value={input}
					onChange={e => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				{toDo.map((toDo, index) => {
					return (
						<li
							className="list-group-item list-group-item-light li-one"
							key={index}
							onClick={() => {
								handleDeleteTask(index);
							}}>
							{toDo}
						</li>
					);
				})}
				<ul className="list-group ul-list-two">
					<li className="list-group-item list-group-item-light li-two">
						{toDo.length <= 1
							? `${toDo.length} item left`
							: `${toDo.length} items left`}
					</li>
				</ul>
			</ul>
		</div>
	);
};

export default Home;
