import { useEffect, useState } from "react";
import useFetch from './UseFetch'
import "./App.css";

//https://the-trivia-api.com/api/questions/

/*
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
*/

function App() {
  // const [questionsData, setQuestionsData] = useState();
  const [count, setCount] = useState(1);
  const [correctAnswers, setCorrectAnswer] = useState(0);
  const {data, error, isLoading} = useFetch(
    "https://the-trivia-api.com/api/questions/");

  // const fetchData = async () => {
  //   try {
  //     const res = await fetch("https://the-trivia-api.com/api/questions/");
  //     const data = await res.json();

  //     setQuestionsData(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handleClick = (answer) => {
    if (answer === data[count - 1].correctAnswer) {
      setCorrectAnswer(correctAnswers + 1);
    }
    setCount(count + 1);
  };
if(data){
  if (count <= data.length) {
    return (
      <div className="container">
        <div className="quiz-card">
          <h1 className="question-number">{count}</h1>
          <h2 className="question">
            {data && data[count - 1].question}
          </h2>
          <div className="answers">
            {data && (
              <Answers
                allAnswers={data[count - 1].incorrectAnswers.concat(
                  data[count - 1].correctAnswer
                )}
                handleClick={handleClick}
              />
            )}
          </div>
        </div>
      </div>
    );
  } else {
    if (correctAnswers > 5) {
      return (
        <div className="container">
          <div className="quiz-card">
            <h1 className="question-number">You won!</h1>
            <p>Correct Answers: {correctAnswers}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="quiz-card">
            <h1 className="question-number">You lost!</h1>
            <p>Correct Answers: {correctAnswers}</p>
          </div>
        </div>
      );
    }
  }
}else if(error){
   return (
        <div className="container">
          <div className="quiz-card">
            <h1 className="question-number">error</h1>
            <p> {error}</p>
          </div>
        </div>)
}
else if(isLoading){
   return (
        <div className="container">
          <div className="quiz-card">
            <h1 className="question-number">loding ...</h1>
            <p> loding  </p>
          </div>
        </div>)
}
}

function Answers({ allAnswers, handleClick }) {
  const [answers, setAnswers] = useState([]);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    setAnswers(shuffle(allAnswers));
  }, [allAnswers]);

  return (
    <>
      {answers.map((answer) => (
        <button key={answer} onClick={() => handleClick(answer)}>
          {answer}
        </button>
      ))}
    </>
  );
}

export default App;
