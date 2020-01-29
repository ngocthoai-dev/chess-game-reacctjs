import React from 'react';
import Pieces from './chess-man/Pieces';
import BlackWhiteBoard from './blackWhiteBoard/blackWhiteBoard';
import './Board.css';

// struct of each man
var manInfo = function(curPosition, legalMove, religion, name, type, isFirst=true, isAlive=true, selected=false){
	return {
		curPosition: curPosition,
		legalMove: legalMove,
		religion: religion,
		name: name,
		type: type,
		isFirst: isFirst,
		isAlive: isAlive,
		selected: selected
	}
}

// move straight if no obstacle
function straightMove(curPosition, nextPosition, othersCurPosition){
	for(let other in othersCurPosition){
		// check horizontal
		if(Math.abs(nextPosition.charCodeAt(0)-curPosition.charCodeAt(0)) === 0){
			if(othersCurPosition[other].charCodeAt(0) === curPosition.charCodeAt(0)){
				if((parseInt(nextPosition[1])-parseInt(curPosition[1]) > 0 && parseInt(othersCurPosition[other][1])-parseInt(curPosition[1]) > 0 && 
						(parseInt(nextPosition[1])-parseInt(curPosition[1]) > parseInt(othersCurPosition[other][1])-parseInt(curPosition[1]))) ||
					(parseInt(nextPosition[1])-parseInt(curPosition[1]) < 0 && parseInt(othersCurPosition[other][1])-parseInt(curPosition[1]) < 0 && 
						(parseInt(nextPosition[1])-parseInt(curPosition[1]) < parseInt(othersCurPosition[other][1])-parseInt(curPosition[1])))){
					return false;
				}
			}
		// check verticle
		} else if(Math.abs(parseInt(nextPosition[1])-parseInt(curPosition[1])) === 0){
			if(parseInt(othersCurPosition[other][1]) === parseInt(curPosition[1])){
				if((nextPosition.charCodeAt(0)-curPosition.charCodeAt(0) > 0 && othersCurPosition[other].charCodeAt(0)-curPosition.charCodeAt(0) > 0 && 
						(nextPosition.charCodeAt(0)-curPosition.charCodeAt(0) > othersCurPosition[other].charCodeAt(0)-curPosition.charCodeAt(0))) ||
					(nextPosition.charCodeAt(0)-curPosition.charCodeAt(0) < 0 && othersCurPosition[other].charCodeAt(0)-curPosition.charCodeAt(0) < 0 && 
						(nextPosition.charCodeAt(0)-curPosition.charCodeAt(0) < othersCurPosition[other].charCodeAt(0)-curPosition.charCodeAt(0)))){
					return false;
				}
			}
		}
	}
	return true;
}

// move cross if no obstacle
function crossMove(curPosition, nextPosition, othersCurPosition){
	for(let other in othersCurPosition){
		// check other in cross row
		if(Math.abs(othersCurPosition[other].charCodeAt(0)-curPosition.charCodeAt(0)) === Math.abs(parseInt(othersCurPosition[other][1])-parseInt(curPosition[1]))){
			// check other on left side
			if(othersCurPosition[other].charCodeAt(0) < curPosition.charCodeAt(0) && nextPosition.charCodeAt(0) < curPosition.charCodeAt(0)){
				if((parseInt(nextPosition[1])-parseInt(curPosition[1]) > 0 && parseInt(othersCurPosition[other][1])-parseInt(curPosition[1]) > 0 &&
						parseInt(nextPosition[1])-parseInt(curPosition[1]) > parseInt(othersCurPosition[other][1])-parseInt(curPosition[1])) || 
					(parseInt(nextPosition[1])-parseInt(curPosition[1]) < 0 && parseInt(othersCurPosition[other][1])-parseInt(curPosition[1]) < 0 &&
						parseInt(nextPosition[1])-parseInt(curPosition[1]) < parseInt(othersCurPosition[other][1])-parseInt(curPosition[1]))){
					return false;
				}
			// check other on right side
			} else if(othersCurPosition[other].charCodeAt(0) > curPosition.charCodeAt(0) && nextPosition.charCodeAt(0) > curPosition.charCodeAt(0)){
				if((parseInt(nextPosition[1])-parseInt(curPosition[1]) > 0 && parseInt(othersCurPosition[other][1])-parseInt(curPosition[1]) > 0 &&
						parseInt(nextPosition[1])-parseInt(curPosition[1]) > parseInt(othersCurPosition[other][1])-parseInt(curPosition[1])) || 
					(parseInt(nextPosition[1])-parseInt(curPosition[1]) < 0 && parseInt(othersCurPosition[other][1])-parseInt(curPosition[1]) < 0 &&
						parseInt(nextPosition[1])-parseInt(curPosition[1]) < parseInt(othersCurPosition[other][1])-parseInt(curPosition[1]))){
					return false;
				}
			}
		}
	}
	return true;
}

// move L shape
function LMove(curPosition, nextPosition, othersCurPosition){
	for(let other in othersCurPosition){
		// check other in horizontal
		if(othersCurPosition[other].charCodeAt(0) === curPosition.charCodeAt(0)){
			if(othersCurPosition[other][1]-curPosition[1] === 1 && nextPosition[1]-curPosition[1] > othersCurPosition[other][1]-curPosition[1] && 
				Math.abs(nextPosition.charCodeAt(0)-curPosition.charCodeAt(0)) === 1){
				return false;
			} else if(othersCurPosition[other][1]-curPosition[1] === -1 && nextPosition[1]-curPosition[1] < othersCurPosition[other][1]-curPosition[1] && 
				Math.abs(nextPosition.charCodeAt(0)-curPosition.charCodeAt(0)) === 1){
				return false;
			}
		// check other in verticle
		} else if(othersCurPosition[other][1] === curPosition[1]){
			if(othersCurPosition[other].charCodeAt(0)-curPosition.charCodeAt(0) === 1 && nextPosition.charCodeAt(0)-curPosition.charCodeAt(0) > othersCurPosition[other].charCodeAt(0)-curPosition.charCodeAt(0) && 
				Math.abs(nextPosition[1]-curPosition[1]) === 1){
				return false;
			} else if(othersCurPosition[other].charCodeAt(0)-curPosition.charCodeAt(0) === -1 && nextPosition.charCodeAt(0)-curPosition.charCodeAt(0) < othersCurPosition[other].charCodeAt(0)-curPosition.charCodeAt(0) && 
				Math.abs(nextPosition[1]-curPosition[1]) === 1){
				return false;
			}
		}
	}
	return true;
}

function kingMove(curPosition=null){
	function move(nextPosition=null, others){
		if(nextPosition != null){
			if(Math.abs(nextPosition.charCodeAt(0)-curPosition.charCodeAt(0)) === 1 || Math.abs(parseInt(nextPosition[1])-parseInt(curPosition[1])) === 1){
				return true;
			}
			else{
				return false;
			}
		}
	}
	return move;
}

function queenMove(curPosition=null){
	function move(nextPosition=null, others){
		if(nextPosition != null && curPosition != null){
			if((Math.abs(nextPosition.charCodeAt(0)-curPosition.charCodeAt(0)) === 0 ||
				Math.abs(parseInt(nextPosition[1])-parseInt(curPosition[1])) === 0 ||
				Math.abs(nextPosition.charCodeAt(0)-curPosition.charCodeAt(0)) === Math.abs(parseInt(nextPosition[1])-parseInt(curPosition[1]))) &&
				(straightMove(curPosition, nextPosition, others) || crossMove(curPosition, nextPosition, others))){
				return true;
			}
			else{
				return false;
			}
		}
	}
	return move;
}

function rookMove(curPosition=null){
	function move(nextPosition=null, others){
		if(nextPosition != null && curPosition != null){
			if((Math.abs(nextPosition.charCodeAt(0)-curPosition.charCodeAt(0)) === 0 ||
					Math.abs(parseInt(nextPosition[1])-parseInt(curPosition[1])) === 0) &&
				straightMove(curPosition, nextPosition, others)){
				return true;
			}
			else{
				return false;
			}
		}
	}
	return move;
}

function knightMove(curPosition=null){
	function move(nextPosition=null, others){
		if(nextPosition != null && curPosition != null){
			if(((Math.abs(nextPosition.charCodeAt(0)-curPosition.charCodeAt(0)) === 1 &&
						Math.abs(parseInt(nextPosition[1])-parseInt(curPosition[1])) === 2) ||
					(Math.abs(nextPosition.charCodeAt(0)-curPosition.charCodeAt(0)) === 2 &&
						Math.abs(parseInt(nextPosition[1])-parseInt(curPosition[1])) === 1))
				&& LMove(curPosition, nextPosition, others)){
				return true;
			}
			else{
				return false;
			}
		}
	}
	return move;
}

function bishopMove(curPosition=null){
	function move(nextPosition=null, others){
		if(nextPosition != null && curPosition != null){
			if(Math.abs(nextPosition.charCodeAt(0)-curPosition.charCodeAt(0)) === Math.abs(parseInt(nextPosition[1])-parseInt(curPosition[1])) && 
				crossMove(curPosition, nextPosition, others)){
				return true;
			}
			else{
				return false;
			}
		}
	}
	return move;
}

function pawnMove(curPosition=null, religion=null, isFirst=true){
	function move(nextPosition=null, others){
		// white go down
		if(!religion.localeCompare('white')){
			if(nextPosition != null && curPosition != null){
				// move down 1
				if(nextPosition.charCodeAt(0)-curPosition.charCodeAt(0) === 1){
					// check not go left or right
					if(parseInt(nextPosition[1])-parseInt(curPosition[1]) === 0){
						for(let other in others){
							if(others[other].charCodeAt(0)-curPosition.charCodeAt(0) === 1 &&
								Math.abs(parseInt(others[other][1])-parseInt(curPosition[1])) === 0){
								return false;
							}
						}
						return true;
					// check if go left or right one eat
					} else if(Math.abs(parseInt(nextPosition[1])-parseInt(curPosition[1])) === 1){
						for(let other in others){
							if(others[other].charCodeAt(0)-curPosition.charCodeAt(0) === 1 &&
								Math.abs(parseInt(others[other][1])-parseInt(curPosition[1])) === 1){
								return true;
							}
						}
						return false;
					}
				// move down 2
				} else if(isFirst && nextPosition.charCodeAt(0)-curPosition.charCodeAt(0) === 2){
					if(parseInt(nextPosition[1])-parseInt(curPosition[1]) === 0){
						for(let other in others){
							// check if other in pos of 1 or 2 move ahead
							if((others[other].charCodeAt(0)-curPosition.charCodeAt(0) === 1 || others[other].charCodeAt(0)-curPosition.charCodeAt(0) === 2) &&
								Math.abs(parseInt(others[other][1])-parseInt(curPosition[1])) === 0){
								return false;
							}
						}
						return true;
					}
				// else illegal move
				} else {
					return false;
				}
			}
		// black go up
		} else {
			if(nextPosition != null && curPosition != null){
				// move up 1
				if(nextPosition.charCodeAt(0)-curPosition.charCodeAt(0) === -1){
					// check not go left or right
					if(Math.abs(parseInt(nextPosition[1])-parseInt(curPosition[1])) === 0){
						for(let other in others){
							if(others[other].charCodeAt(0)-curPosition.charCodeAt(0) === -1 &&
								Math.abs(parseInt(others[other][1])-parseInt(curPosition[1])) === 0){
								return false;
							}
						}
						return true;
					// check if go left or right one eat
					} else if(Math.abs(parseInt(nextPosition[1])-parseInt(curPosition[1])) === 1){
						for(let other in others){
							if(others[other].charCodeAt(0)-curPosition.charCodeAt(0) === -1 &&
								Math.abs(parseInt(others[other][1])-parseInt(curPosition[1])) === 1){
								return true;
							}
						}
						return false;
					}
				// move up 2
				} else if(isFirst && nextPosition.charCodeAt(0)-curPosition.charCodeAt(0) === -2){
					if(parseInt(nextPosition[1])-parseInt(curPosition[1]) === 0){
						for(let other in others){
							// check if other in pos of 1 or 2 move ahead
							if((others[other].charCodeAt(0)-curPosition.charCodeAt(0) === -1 || others[other].charCodeAt(0)-curPosition.charCodeAt(0) === -2) &&
								Math.abs(parseInt(others[other][1])-parseInt(curPosition[1])) === 0){
								return false;
							}
						}
						return true;
					}
				// else illegal move
				}else {
					return false;
				}
			}			
		}
	}
	return move;
}


export default class Board extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			"king_white": manInfo("A4", kingMove, "white", "king_white", "king_white"),
			"queen_white": manInfo("A5", queenMove, "white", "queen_white", "queen_white"),
			"rook_white1": manInfo("A1", rookMove, "white", "rook_white1", "rook_white"),
			"rook_white2": manInfo("A8", rookMove, "white", "rook_white2", "rook_white"),
			"knight_white1": manInfo("A2", knightMove, "white", "knight_white1", "knight_white"),
			"knight_white2": manInfo("A7", knightMove, "white", "knight_white2", "knight_white"),
			"bishop_white1": manInfo("A3", bishopMove, "white", "bishop_white1", "bishop_white"),
			"bishop_white2": manInfo("A6", bishopMove, "white", "bishop_white2", "bishop_white"),
			"pawn_white1": manInfo("B1", pawnMove, "white", "pawn_white1", "pawn_white"),
			"pawn_white2": manInfo("B2", pawnMove, "white", "pawn_white2", "pawn_white"),
			"pawn_white3": manInfo("B3", pawnMove, "white", "pawn_white3", "pawn_white"),
			"pawn_white4": manInfo("B4", pawnMove, "white", "pawn_white4", "pawn_white"),
			"pawn_white5": manInfo("B5", pawnMove, "white", "pawn_white5", "pawn_white"),
			"pawn_white6": manInfo("B6", pawnMove, "white", "pawn_white6", "pawn_white"),
			"pawn_white7": manInfo("B7", pawnMove, "white", "pawn_white7", "pawn_white"),
			"pawn_white8": manInfo("B8", pawnMove, "white", "pawn_white8", "pawn_white"),
			"king_black": manInfo("H5", kingMove, "black", "king_black", "king_black"),
			"queen_black": manInfo("H4", queenMove, "black", "queen_black", "queen_black"),
			"rook_black1": manInfo("H1", rookMove, "black", "rook_black1", "rook_black"),
			"rook_black2": manInfo("H8", rookMove, "black", "rook_black2", "rook_black"),
			"knight_black1": manInfo("H2", knightMove, "black", "knight_black1", "knight_black"),
			"knight_black2": manInfo("H7", knightMove, "black", "knight_black2", "knight_black"),
			"bishop_black1": manInfo("H3", bishopMove, "black", "bishop_black1", "bishop_black"),
			"bishop_black2": manInfo("H6", bishopMove, "black", "bishop_black2", "bishop_black"),
			"pawn_black1": manInfo("G1", pawnMove, "black", "pawn_black1", "pawn_black"),
			"pawn_black2": manInfo("G2", pawnMove, "black", "pawn_black2", "pawn_black"),
			"pawn_black3": manInfo("G3", pawnMove, "black", "pawn_black3", "pawn_black"),
			"pawn_black4": manInfo("G4", pawnMove, "black", "pawn_black4", "pawn_black"),
			"pawn_black5": manInfo("G5", pawnMove, "black", "pawn_black5", "pawn_black"),
			"pawn_black6": manInfo("G6", pawnMove, "black", "pawn_black6", "pawn_black"),
			"pawn_black7": manInfo("G7", pawnMove, "black", "pawn_black7", "pawn_black"),
			"pawn_black8": manInfo("G8", pawnMove, "black", "pawn_black8", "pawn_black"),
			"game_turn": 0 // 0 for white, 1 for black
		};

		this.clickHandler = this.clickHandler.bind(this);
		this.move = this.move.bind(this);
	}

	// (curPosition, legalMove, religion, name, type, isFirst=true, isAlive=true, selected=false)

	move = (man, nextPosition, fed=null) => {
		let othersPosition = []
		for(let pos in this.state){
			if(!pos.localeCompare("game_turn")){
				continue;
			}
			if(this.state[pos].name.localeCompare(this.state[man].name) && this.state[pos].isAlive){
				othersPosition.push(this.state[pos].curPosition);
			}
		}
		// other move
		if(!this.state[man].name.includes('pawn')){
			if(this.state[man].legalMove(this.state[man].curPosition)(nextPosition, othersPosition)){
				this.setState({"game_turn": !this.state.game_turn});
				if(fed != null){
					this.setState({
						[fed.name]: manInfo(fed.curPosition, fed.legalMove, fed.religion, fed.name, fed.type, false, false, fed.selected)
					});
				}
				this.setState({
					[man]: manInfo(nextPosition, this.state[man].legalMove, this.state[man].religion, this.state[man].name, this.state[man].type, false, this.state[man].isAlive, !this.state[man].selected)
				});
			} else {
				this.setState({
					[man]: manInfo(this.state[man].curPosition, this.state[man].legalMove, this.state[man].religion, this.state[man].name, this.state[man].type, false, this.state[man].isAlive, !this.state[man].selected)
				});
			}
		// pawn move
		} else {
			if(this.state[man].legalMove(this.state[man].curPosition, this.state[man].religion, this.state[man].isFirst)(nextPosition, othersPosition)){
				this.setState({"game_turn": !this.state.game_turn});
				if(fed != null){
					this.setState({
						[fed.name]: manInfo(fed.curPosition, fed.legalMove, fed.religion, fed.name, fed.type, fed.isFirst, false, fed.selected)
					});
				}
				// pawn transformation
				if(!this.state[man].religion.localeCompare("white") && nextPosition.includes("H")){
					let randTranform = Math.floor(Math.random()*4);
					let manFunc, type;
					if(randTranform === 0){
						manFunc = queenMove;
						type = "queen_white";
					} else if(randTranform === 1){
						manFunc = rookMove;
						type = "rook_white";
					} else if(randTranform === 2){
						manFunc = knightMove;
						type = "knight_white";
					} else {
						manFunc = bishopMove;
						type = "bishop_white";
					}
					this.setState({
						[man]: manInfo(nextPosition, manFunc, this.state[man].religion, this.state[man].name, type, this.state[man].isFirst, this.state[man].isAlive, !this.state[man].selected)
					});
				} else if(!this.state[man].religion.localeCompare("black") && nextPosition.includes("A")){
					let randTranform = Math.floor(Math.random()*4);
					let manFunc, type;
					if(randTranform === 0){
						manFunc = queenMove;
						type = "queen_black";
					} else if(randTranform === 1){
						manFunc = rookMove;
						type = "rook_black";
					} else if(randTranform === 2){
						manFunc = knightMove;
						type = "knight_black";
					} else {
						manFunc = bishopMove;
						type = "bishop_black";
					}
					this.setState({
						[man]: manInfo(nextPosition, manFunc, this.state[man].religion, this.state[man].name, type, this.state[man].isFirst, this.state[man].isAlive, !this.state[man].selected)
					});
				} else {
					this.setState({
						[man]: manInfo(nextPosition, this.state[man].legalMove, this.state[man].religion, this.state[man].name, this.state[man].type, false, this.state[man].isAlive, !this.state[man].selected)
					});
				}
			} else {
				this.setState({
					[man]: manInfo(this.state[man].curPosition, this.state[man].legalMove, this.state[man].religion, this.state[man].name, this.state[man].type, this.state[man].isFirst, this.state[man].isAlive, !this.state[man].selected)
				});
			}
		}
	}

	clickHandler = (manName, evt) => {
		if(manName != null){
			if(manName.selected){
				return;
			} else {
				let nextPosition = String.fromCharCode(Math.floor(evt.clientY/(window.innerHeight/10))+64) + Math.floor(evt.clientX/(window.innerHeight/10)).toString();			
				let isExistedSelect = false;
				for(let man in this.state){
					if(!man.localeCompare("game_turn")){
						continue;
					}
					if(this.state[man].selected){
						if(this.state[man].religion.localeCompare(manName.religion)){
							isExistedSelect = true;
							this.move(man, nextPosition, manName);
						}
						break;
					}
				}
				if(!isExistedSelect){
					if((this.state.game_turn ? "black" : "white").localeCompare(manName.religion)){
						return;
					}
					for(let man in this.state){
						if(!man.localeCompare("game_turn")){
							continue;
						}
						if(!man.localeCompare(manName.name)){
							continue;
						}
						this.setState({
							[man]: manInfo(this.state[man].curPosition, this.state[man].legalMove, this.state[man].religion, this.state[man].name, this.state[man].type, this.state[man].isFirst, this.state[man].isAlive, false)
						});
					}
					this.setState({
						[manName.name]: manInfo(manName.curPosition, manName.legalMove, manName.religion, manName.name, manName.type, manName.isFirst, manName.isAlive, !manName.selected)
					});
				}
			}
		} else {
			let nextPosition = String.fromCharCode(Math.floor(evt.clientY/(window.innerHeight/10))+64) + Math.floor(evt.clientX/(window.innerHeight/10)).toString();			
			for(let man in this.state){
				if(!man.localeCompare("game_turn")){
					continue;
				}
				if(this.state[man].selected){
					this.move(man, nextPosition);
					break;
				}
			}
		}
	}

	render(){
		// let str = "";
		// for(let man in this.state){
		// 	if(this.state[man].isAlive){
		// 		str += '"' + man + '": ' + JSON.stringify(this.state[man]) + ",";
		// 	}
		// }
		// str = str.slice(0, -1);
		// str = "{" + str + "}";
		if(!this.state.king_white.isAlive){
			alert('black win');
		  window.location.reload();
		}
		if(!this.state.king_black.isAlive){
			alert('white win');
		  window.location.reload();
		}
		return (
			<div className='board'>
				<BlackWhiteBoard board={this.props.board} clickHandler={this.clickHandler} />
				<Pieces chessman={this.state} clickHandler={this.clickHandler} />
			</div>
		);
	}
}