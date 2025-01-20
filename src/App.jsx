import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [quizData, setQuizData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(()=> {
    async function getData() {
      const {quizzes} = await fetch("/data/data.json").then ((x) => x.json());
      setQuizData(quizzes);
    }
    getData();
  })

  if(!quizData) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      {!selectedCategory ? (
        <>
        <Header selectedCategory = {selectedCategory} />        
        <Menu quizData={quizData} setSelectedCategory = {setSelectedCategory} />
        </>

      )
       : 
      (
        <>
        <Header selectedCategory = {selectedCategory} />        
        <Questions selectedCategory={selectedCategory} quizData={quizData}/>
        </>

      )
      }
      
    </div>
  )
}

function Header ({selectedCategory}) {
  return(
  <div className="header">
    {selectedCategory ? 
       <div className="topicSection">
          <img src={`/img/icon-${selectedCategory.toLowerCase()}.svg`} alt="" />
          {selectedCategory}
       </div> : 
       <div className="topicSection">

       </div>
  
    }
      <div className="header-images">
        <div className="themeOptions">
          <label>
            <span><img src="/img/light-theme.svg" alt="Light Mode Icon" /></span>
            <input className="switch" type="checkbox" id="themeChange" />
            <span><img src="/img/dark-theme.svg" alt="Dark Mode Icon" /></span>
          </label>
        </div>
      </div>
    </div>
  )
}

function Menu({quizData, setSelectedCategory}) {

  function handleCategory(category) {
    setSelectedCategory(category);
  }

  return(
    <div className="quiz-subjects">
      <div className="head-content">
        <h1>Welcome to the </h1>
        <h2>Frontend Quiz!</h2>
      </div>
      <p className='intro-text'>
        Pick a subject to get started.
      </p>
      <div className="category-buttons">
        {quizData&& quizData.map((x) => 
          (<div className='category-button' onClick={() => handleCategory(x.title)} key={x.title}>
            <img src={x.icon} />
            <p>{x.title}</p>
          </div>)
        )}
      </div>
    </div>
  )
}

function ProgressBar({progressBarPercentage}) {
  return (
    <div className ="progressBar" >
      <div className="progressBarInner" style={{width : `${progressBarPercentage}%`}}>
      </div>
    </div>
  )
}

function Questions({selectedCategory, quizData }) {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmit, setSubmit] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);

  const selections = ["A", "B", "C", "D"];

  
  const selectedTopic = quizData?.find(x => x.title === selectedCategory );
  const correctAnswer = selectedTopic.questions[currentQuestionIndex].answer;
  
  const progressBarPercentage = ((currentQuestionIndex + 1 ) / selectedTopic.questions.length ) * 100;

  function handleOptionClick(option) {
    if(!isSubmit) {
      setSelectedOption(option);
    }
  }

  function handleNextQuestion() {
    if(currentQuestionIndex <=selectedTopic.questions.length - 1)
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setSubmit(false);
    }

  function handleSubmit() {
    if(!selectedOption) {
      alert("Hop");

    }
    else {
      if(correctAnswer === selectedOption) {
        setCorrectAnswerCount((prev) => prev + 1);
      }
      setSubmit(true);
    }

  }
  return(
    <>
     {isSubmit && currentQuestionIndex === selectedTopic.questions.length - 1   ? 
      (
        <Result selectedCategory = {selectedCategory} correctAnswerCount = {correctAnswerCount}
        selectedTopic={selectedTopic}/>
      ) : 

      (
        <>
       
            <p className='question-number'>Question {currentQuestionIndex + 1} of {selectedTopic.questions.length} </p>
            <p className='question-text'>{selectedTopic.questions[currentQuestionIndex].question}</p>
            <ProgressBar progressBarPercentage = {progressBarPercentage}/>

            <div className="option-buttons">
              {selectedTopic.questions[currentQuestionIndex].options.map((x,i ) =>
              (
              <button key = {i}
                onClick = {() => handleOptionClick(x)}
                className = {
                  `option-btn
                  ${isSubmit
                    ? (x === correctAnswer
                      ? (selectedOption === correctAnswer
                        ? "correct selected"
                        : "correct")
                      : (x === selectedOption
                        ? "wrong"
                        : "")
                    )
                    : (selectedOption === x
                      ? "selected"
                      : "")
                    }
                      `
                  } 
                  ><span className={`choiceBtn ${isSubmit
                    ? (x === correctAnswer
                      ? (selectedOption === correctAnswer
                        ? "correct selected"
                        : "correct")
                      : (x === selectedOption
                        ? "wrong"
                        : "")
                    )
                    : (selectedOption === x
                      ? "selected"
                      : "")
                    }`}>{selections[i]}</span>
                    <p>{x}</p>
                  </button>  

                  ))}
              </div>
              <div className="submit-next-btns">
                {isSubmit ? (
                  <button  onClick={handleNextQuestion}>Next question</button>
                ): 
                (
                  <button onClick={handleSubmit}>Submit answer</button>
                )
                }
              </div>
                </>
              )
            } 
    </>
  )
} 

function Result({selectedCategory, correctAnswerCount, selectedTopic}) {
  return (
    <>
   
      <div className="result-area">
        <h2>Quiz completed</h2>
        <h3>You scored...</h3>
      </div>
      <div className="score-content-card">
        <div className="score-content-header">
          <img src={`/img/icon-${selectedCategory.toLowerCase()}.svg`} alt="" />
          <p className='result-category'>{selectedCategory}</p>
        </div>
        <p className='score-text'>{correctAnswerCount}</p>
        <p className='total-question-number'>out of {selectedTopic.questions.length}</p>
      </div>
        <button className='play-again-button'>Play again</button>
    </>
  )
}


export default App
