import React, { useEffect, useState } from "react";
import "bootstrap";
//create your first component
const Home = () => {
	const [input, setInput] = useState({ label: "", done: false });

	const [toDo, setToDo] = useState([]);

	const handleKeyDown = e => {
		if (e.key === "Enter") {
			if (input.label.trim() != "") {
				setToDo([...toDo, input]);
				setInput({ label: "", done: false });
				addTask();
			}
		}
	};

	const handleDeleteTask = id => {
		const newArray = toDo.filter((toDo, index) => index != id);
		setToDo(newArray);
	};

	const crearUsuario = async () => {
		const respuesta = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/diegomilano",
			{
				method: "POST",
				body: JSON.stringify([]),
				headers: {
					"Content-type": "application/json"
				}
			}
		);
		consultaApi();
	};

	const consultaApi = async () => {
		const respuesta = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/diegomilano"
		);
		if (respuesta.ok) {
			let data = await respuesta.json();
			setToDo(data);
		} else {
			crearUsuario();
		}
	};

	const addTask = async () => {
		const respuesta = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/diegomilano",
			{
				method: "PUT",
				body: JSON.stringify([...toDo, input]),
				headers: {
					"Content-type": "application/json"
				}
			}
		);
		if (respuesta.ok) {
			consultaApi();
		}
	};

	const deleteTask = async id => {
		const newArray = toDo.filter((toDo, index) => index != id);

		const respuesta = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/diegomilano",
			{
				method: "PUT",
				body: JSON.stringify(newArray),
				headers: {
					"Content-type": "application/json"
				}
			}
		);
		if (respuesta.ok) {
			await consultaApi();
		}
	};

	useEffect(() => {
		consultaApi();
	}, []);

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
					name="label"
					value={input.label}
					onChange={e =>
						setInput({ ...input, [e.target.name]: e.target.value })
					}
					onKeyDown={handleKeyDown}
				/>
				{toDo.map((toDo, index) => {
					return (
						<li
							className="list-group-item list-group-item-light li-one"
							key={index}
							onClick={() => {
								deleteTask(index);
							}}>
							{toDo.label}
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
