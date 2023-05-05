import { useState ,useEffect} from "react";
import "./App.css";

function App() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedCol, setSelectedCol] = useState(null);
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState(
  JSON.parse(localStorage.getItem("answers")) ||
      Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ""))
  );

  useEffect(() => {
  localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);



  const handleCellClick = (row, col) => {
    setSelectedRow(row);
    setSelectedCol(col);
    setQuestion(`? ${row} x ${col} כמה זה`);
    setAnswer("");
    setShowAnswer(false);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleCheckAnswer = () => {
    if (parseInt(answer) === selectedRow * selectedCol) {
      setShowAnswer(true);
      setAnswers(prevAnswers => {
        const newAnswers = [...prevAnswers];
        newAnswers[selectedRow - 1][selectedCol - 1] = answer;
        return newAnswers;
      });
      setQuestion(null);
    } else {
      alert("Incorrect! Please try again.");
      setAnswer("");
    }
  };

  const handleNewGame = () => {
    setAnswers(Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => "")));
  };

  const renderCell = (row, col) => {
    const isCellSelected = selectedRow === row && selectedCol === col;
    const isSelectedClass = isCellSelected ? "selected" : "";
    const cellValue = showAnswer && isCellSelected ? row * col : answers[row - 1][col - 1];

    return (
      <td
        key={col}
        className={`cell ${isSelectedClass}`}
        onClick={() => handleCellClick(row, col)}
      >
        {cellValue}
      </td>
    );
  };

  const renderRow = (row) => {
    return (
      <tr key={row}>
        <td className="cell header">{row}</td>
        {Array.from({ length: 10 }, (_, col) => renderCell(row, col + 1))}
      </tr>
    );
  };

  return (
    <div className="App">
      <h1>לוח הכפל</h1>
      <table className="table">
        <thead>
          <tr>
            <th className="cell header"></th>
            {Array.from({ length: 10 }, (_, i) => (
              <th key={i} className="cell header">
                {i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{Array.from({ length: 10 }, (_, i) => renderRow(i + 1))}</tbody>
      </table>
      {question && (
        <div className="input-container">
          <p>{question}</p>
          <input type="number" value={answer} onChange={handleAnswerChange} />
          <button onClick={handleCheckAnswer}>Check Answer</button>
        </div>
      )}
      <button onClick={handleNewGame}>New Game</button>
    </div>
  );
}

export default App;