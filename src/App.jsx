import { useEffect, useState } from 'react'
import './darkMode.css'

function App() {

  const [quizData, setQuizData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function getData() {
      const { quizzes } = await fetch("/data/data.json").then((x) => x.json());
      setQuizData(quizzes);
    }
    getData();
  }, []);


  function getSystemThemePref() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-mode' : 'light';
  }

  const [theme, setTheme] = useState(localStorage.theme || getSystemThemePref());

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function handleChangeTheme(e) {
    const changedTheme = e.target.checked ? 'dark-mode' : 'light';
    setTheme(changedTheme);
    localStorage.theme = changedTheme;
  }


  if (!quizData) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      {!selectedCategory ? (
        <>
          <Header selectedCategory={selectedCategory} theme={theme} setTheme={setTheme}
            handleChangeTheme={handleChangeTheme} />
          <Menu quizData={quizData} setSelectedCategory={setSelectedCategory} />
        </>
      )
        :
        (
          <>
            <Header selectedCategory={selectedCategory} theme={theme} setTheme={setTheme}
              handleChangeTheme={handleChangeTheme} />
            <Questions
              selectedCategory={selectedCategory}
              quizData={quizData}
              setSelectedCategory={setSelectedCategory}
            />
          </>
        )
      }
    </div>
  )
}

function Header({ selectedCategory, theme, handleChangeTheme }) {
  return (
    <div className="header">
      {selectedCategory ?
        <div className="topic-section">
          <img src={`/img/icon-${selectedCategory.toLowerCase()}.svg`} alt="" />
          <p>{selectedCategory}</p>
        </div> :
        <div className="topic-section">
        </div>
      }
      <div className="header-images">
        <div className="themeOptions">
          <label className='lightDark'>
            <span><img src={theme === "light" ? "/img/sun-icon.svg" : "/img/dark-sun-icon.svg"} alt="Light Mode Icon" /></span>
            <input className="switch"
              type="checkbox"
              id="themeChange"
              checked={theme === "dark-mode"}
              onChange={handleChangeTheme} />
            <span><img src={theme === "light" ? "/img/moon-icon.svg" : "/img/dark-moon-icon.svg"} alt="Dark Mode Icon" /></span>
          </label>
        </div>
      </div>
    </div>
  )
}

function Menu({ quizData, setSelectedCategory }) {

  function handleCategory(category) {
    setSelectedCategory(category);
  }

  return (
    <div className="quiz-subjects">
      <div className="head-content">
        <h1>Welcome to the </h1>
        <h2>Frontend Quiz!</h2>
        <p className='intro-text'>
          Pick a subject to get started.
        </p>
      </div>
      <div className="category-buttons">
        {quizData && quizData.map((x) =>
        (<div className='category-button' onClick={() => handleCategory(x.title)} key={x.title}>
          <img src={x.icon} />
          <p>{x.title}</p>
        </div>)
        )}
      </div>
    </div>
  )
}

function ProgressBar({ progressBarPercentage }) {
  return (
    <div className="progressBar" >
      <div className="progressBarInner" style={{ width: `${progressBarPercentage}%` }}>
      </div>
    </div>
  )
}

// Güncellenmiş Questions component içinde:

function Questions({ selectedCategory, quizData, setSelectedCategory }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmit, setSubmit] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showWarning, setShowWarning] = useState(false); // ✅ Yeni eklendi

  const selections = ["A", "B", "C", "D"];

  const selectedTopic = quizData?.find(x => x.title === selectedCategory);
  const currentQuestion = selectedTopic.questions[currentQuestionIndex];
  const correctAnswer = currentQuestion.answer;
  const progressBarPercentage = ((currentQuestionIndex + 1) / selectedTopic.questions.length) * 100;

  const isLastQuestion = currentQuestionIndex === selectedTopic.questions.length - 1;

  function handleOptionClick(option) {
    if (!isSubmit) {
      setSelectedOption(option);
      setShowWarning(false); // ✅ Seçim yapılırsa uyarı kaybolsun
    }
  }

  function handleSubmit() {
    if (!selectedOption) {
      setShowWarning(true); // ✅ Alert yerine uyarı gösterilsin
      return;
    }

    if (correctAnswer === selectedOption) {
      setCorrectAnswerCount((prev) => prev + 1);
    }
    setSubmit(true);
    setShowWarning(false); // ✅ Cevap seçilip gönderildiyse uyarıyı gizle
  }

  function handleNextQuestion() {
    if (isLastQuestion) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setSubmit(false);
      setShowWarning(false); // ✅ Yeni soru geldiğinde uyarı temizlensin
    }
  }

  if (showResult) {
    return (
      <Result
        selectedCategory={selectedCategory}
        correctAnswerCount={correctAnswerCount}
        selectedTopic={selectedTopic}
        setSelectedCategory={setSelectedCategory}
      />
    );
  }

  return (
    <div className="question-container">
      <>
        <div className="question-area">
          <p className='question-number'>Question {currentQuestionIndex + 1} of {selectedTopic.questions.length} </p>
          <p className='question-text'>{currentQuestion.question}</p>
          <ProgressBar progressBarPercentage={progressBarPercentage} />
        </div>

        <div className="answer-area">
          <div className="option-buttons">
            {currentQuestion.options.map((x, i) => {
              const isCorrect = x === correctAnswer;
              const isSelected = x === selectedOption;
              let buttonClass = "option-btn";
              let spanClass = "choiceBtn";
              if (isSubmit) {
                if (isCorrect && isSelected) {
                  buttonClass += " correct selected";
                  spanClass += " correct selected";
                } else if (isCorrect) {
                  buttonClass += " correct blink";
                  spanClass += " correct";
                } else if (isSelected) {
                  buttonClass += " wrong";
                  spanClass += " wrong";
                }
              } else {
                if (isSelected) {
                  buttonClass += " selected";
                  spanClass += " selected";
                }
              }
              return (
                <button key={i} onClick={() => handleOptionClick(x)} className={buttonClass}>
                  <span className={spanClass}>{selections[i]}</span>
                  <p className='option-text'>{x}</p>
                </button>
              );
            })}
          </div>

          <div className="submit-next-btns">
            {isSubmit ? (
              <button onClick={handleNextQuestion}>
                {isLastQuestion ? "See results" : "Next question"}
              </button>
            ) : (
              <>
                <button onClick={handleSubmit}>Submit answer</button>
                {showWarning && (
                  <div className="warning-section">
                    <img src="/img/cross-icon.svg" alt="" />
                    <p className="warning-text">Please select an answer.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </>
    </div>
  );
}



function Result({ selectedCategory, correctAnswerCount, selectedTopic, setSelectedCategory }) {
  return (
    <>
      <div className="score-page-container">
        <div className="result-area">
          <h2>Quiz completed</h2>
          <h3>You scored...</h3>
        </div>
        <div className="score-card-container">
          <div className="score-content-card">
            <div className="score-content-header">
              <img src={`/img/icon-${selectedCategory.toLowerCase()}.svg`} alt="" />
              <p className='result-category'>{selectedCategory}</p>
            </div>
            <p className='score-text'>{correctAnswerCount}</p>
            <p className='total-question-number'>out of {selectedTopic.questions.length}</p>
          </div>
          <button className='play-again-button' onClick={() => setSelectedCategory(null)}>
            Play again
          </button>
        </div>
      </div>
    </>
  );
}


export default App
