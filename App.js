import React from 'react';
import logo from './logo.svg';
import Board from './Board';
import './App.css';

function App() {
	var boardSize = [];
	for(var i=0; i<8; i++){
		if(i===0){
			boardSize.push([0]);
		}
		else{
			boardSize.push([!boardSize[i-1][0] ? 1 : 0]);
		}
		for(var j=1; j<8; j++){
			boardSize[i].push(!boardSize[i][j-1] ? 1 : 0);
		}
	}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Board board={boardSize} />
      <div className='coordinates'>
      	<ul className='alphabet first'>
      		<li>A</li>
      		<li>B</li>
      		<li>C</li>
      		<li>D</li>
      		<li>E</li>
      		<li>F</li>
      		<li>G</li>
      		<li>H</li>
      	</ul>
      	<ul	className='digit first'>
      		<li>1</li>
      		<li>2</li>
      		<li>3</li>
      		<li>4</li>
      		<li>5</li>
      		<li>6</li>
      		<li>7</li>
      		<li>8</li>
      	</ul>
      	<ul className='alphabet last'>
      		<li>A</li>
      		<li>B</li>
      		<li>C</li>
      		<li>D</li>
      		<li>E</li>
      		<li>F</li>
      		<li>G</li>
      		<li>H</li>
      	</ul>
      	<ul	className='digit last'>
      		<li>1</li>
      		<li>2</li>
      		<li>3</li>
      		<li>4</li>
      		<li>5</li>
      		<li>6</li>
      		<li>7</li>
      		<li>8</li>
      	</ul>
      </div>
    </div>
  );
}

export default App;
