import React from 'react';
import Piece from './Piece.js';
import './Pieces.css';

export default class Man extends React.Component {
	render(){
		return (
			<div className='piecesCollection'>
				<Piece position={this.props.chessman.king_white} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.queen_white} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.rook_white1} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.rook_white2} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.knight_white1} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.knight_white2} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.bishop_white1} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.bishop_white2} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.pawn_white1} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.pawn_white2} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.pawn_white3} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.pawn_white4} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.pawn_white5} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.pawn_white6} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.pawn_white7} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.pawn_white8} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.king_black} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.queen_black} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.rook_black1} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.rook_black2} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.knight_black1} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.knight_black2} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.bishop_black1} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.bishop_black2} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.pawn_black1} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.pawn_black2} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.pawn_black3} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.pawn_black4} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.pawn_black5} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.pawn_black6} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.pawn_black7} clickHandler={this.props.clickHandler} />
				<Piece position={this.props.chessman.pawn_black8} clickHandler={this.props.clickHandler} />
			</div>
		);
	}
}