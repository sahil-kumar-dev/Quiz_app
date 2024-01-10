import React, { useEffect, useState } from 'react'
import './App.css'
import Questions from './Question'


function App() {

	// State variables
	const [question, setquestion] = useState({}) //stors question
	const [correctOption, setcorrectOption] = useState('') //correct option
	const [isOver, setisOver] = useState(false) //check if the quiz is over or not
	const [score, setscore] = useState(0) //calculates the score
	const [isChecked, setisChecked] = useState(false) //check if the option is checked or not to visit next question
	const [options, setoptions] = useState({}) //stores all the option
	const [currentIndex, setcurrentIndex] = useState(0) //index of the question array

	// Function to handle option selection
	function isSelected(e) {
		const id = e.target.id
		setisChecked(true)
		// Increase score if the correct option is selected
		correctOption == id ? setscore(prev => prev + 1) : null
	}

	// Function to move to the next question
	function next() {
		// Move to the next question if an option is selected
		isChecked ? currentIndex + 1 == Questions.length ? setisOver(true) : setcurrentIndex(prev => prev + 1) : null
		setisChecked(false)
		// Uncheck all radio buttons
		document.querySelectorAll('.radioBtn').forEach(ele => ele.checked = false)
	}

	// Function to restart the quiz
	function restart() {
		setcurrentIndex(0)
		setisOver(false)
	}

	// Effect to update question and options when currentIndex changes
	useEffect(() => {
		setquestion(Questions[currentIndex])
		setoptions(Questions[currentIndex].option)
		setcorrectOption(Questions[currentIndex].correctOption)
	}, [currentIndex])



	return (
		<div className="flex items-center justify-center w-screen h-screen">
			<div className="w-1/2 border-2 border-solid border-black p-2">
				<div className="bg-black text-white px-[10px] py-[5px]">
					<h2 className='text-center py-[10px]'>Quiz App</h2>
					<div className="flex justify-between">
						<h5>Question : {currentIndex + 1}/10</h5>
					</div>
				</div>
				<div className={`main-section ${isOver ? 'hidden' : 'block'}`}>
					<div className="question">
						<h4 id="py-[15px]">{question.question}</h4>
					</div>
					<div className="options">
						<input type="radio" name="answer" id="a" className="radioBtn" onChange={isSelected} />
						<label htmlFor="a" id="optionA">{options.a}</label>
						<input type="radio" name="answer" id="b" className="radioBtn" onChange={isSelected} />
						<label htmlFor="b" id="optionB">{options.b}</label>
						<input type="radio" name="answer" id="c" className="radioBtn" onChange={isSelected} />
						<label htmlFor="c" id="optionC">{options.c}</label>
						<input type="radio" name="answer" id="d" className="radioBtn" onChange={isSelected} />
						<label htmlFor="d" id="optionD">{options.d}</label>
					</div>
					<div className="text-center pt-[20px]">
						<button className="px-[25px] py-[10px] bg-black text-white" onClick={next}>Next</button>
					</div>
				</div>
				<div className={`text-center py-[100px] ${isOver ? 'block' : 'hidden'} `}>
					<h2>You scored <span className="final_score">{score}</span>/10</h2>
					<button className="px-[25px] py-[10px] bg-black text-white" onClick={restart}>Restart</button>
				</div>
			</div>
		</div>
	)
}

export default App