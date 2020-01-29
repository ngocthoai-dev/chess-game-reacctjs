import React from 'react';
import './Square.css';

export default class Square extends React.Component {
	clickHandler = (evt)=>{
		this.props.clickHandler(null, evt);
	};

	render(){
		const className=["chess-place", 
			this.props.blue ? "blue" : ""
		];

		return (
			<div onClick={this.clickHandler} className={className.join(" ").trim()}></div>
		);
	}
}