import React from 'react';
import './Piece.css';

import kingWhiteSrc from '../img/king_white.png';
import queenWhiteSrc from '../img/queen_white.png';
import rookWhiteSrc from '../img/rook_white.png';
import knightWhiteLeftSrc from '../img/knight_white_left.png';
import bishopWhiteSrc from '../img/bishop_white.png';
import pawnWhiteSrc from '../img/pawn_white.png';
import kingBlackSrc from '../img/king_black.png';
import queenBlackSrc from '../img/queen_black.png';
import rookBlackSrc from '../img/rook_black.png';
import knightBlackRightSrc from '../img/knight_black_right.png';
import bishopBlackSrc from '../img/bishop_black.png';
import pawnBlackSrc from '../img/pawn_black.png';

function source(position){
	let src;
	if(position.name.includes('king_white')){
		src = kingWhiteSrc;
	} else if(position.type.includes('king_black')){
		src = kingBlackSrc;
	} else if(position.type.includes('queen_white')){
		src = queenWhiteSrc;
	} else if(position.type.includes('queen_black')){
		src = queenBlackSrc;
	} else if(position.type.includes('pawn_white')){
		src = pawnWhiteSrc;
	} else if(position.type.includes('pawn_black')){
		src = pawnBlackSrc
	} else if(position.type.includes('rook_white')){
		src = rookWhiteSrc;
	} else if(position.type.includes('rook_black')){
		src = rookBlackSrc;
	} else if(position.type.includes('knight_white')){
		src = knightWhiteLeftSrc;
	} else if(position.type.includes('knight_black')){
		src = knightBlackRightSrc;
	} else if(position.type.includes('bishop_white')){
		src = bishopWhiteSrc;
	} else if(position.type.includes('bishop_black')){
		src = bishopBlackSrc;
	}
	return src;
}

function style(position){
	return {
		top: ((position.curPosition.charCodeAt(0)-65+1)*window.innerHeight/10).toString() + "px",
		left: (position.curPosition[1]*window.innerHeight/10).toString() + "px"
	};
}

export default class Piece extends React.Component {
	clickHandler = (evt)=>{
		this.props.clickHandler(this.props.position, evt); 
	};

	render(){
		const className = 'man ' + (this.props.position.selected ? 'selected ' : ' ') + (this.props.position.isAlive ? '' : ' dead');
		const att = {
			css: style(this.props.position),
			src: source(this.props.position)
		};
		return (
			<img onClick={this.clickHandler} src={att.src} alt={this.props.position.name} position={this.props.position.curPosition} className={className.trim()} id={this.props.position.name} style={att.css} />
		);
	}	
}