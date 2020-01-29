import React from 'react';
import Square from './Square';
import './blackWhiteBoard.css'

var squareRowList = (board, idx, clickHandler) => [...Array(8).keys()].map((x)=><li key={String.fromCharCode((idx+65).toString())+(x+1).toString()}><Square clickHandler={clickHandler} blue={board[x]} /></li>);
var squareList = (board, idx, clickHandler) => <ul key={String.fromCharCode((idx+65).toString())}>{squareRowList(board[idx], idx, clickHandler)}</ul>;

export default class blackWhiteBoard extends React.Component {
	render(){
		var board = [];
		for(var i=0; i<8; i++){
			board.push(squareList(this.props.board, i, this.props.clickHandler));
		}

		return (
			<div className='blackWhiteBoard'>
				{board}
			</div>
		);
	}
}