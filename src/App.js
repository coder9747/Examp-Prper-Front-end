import { BrowserRouter, Routes, Route } from "react-router-dom";
import Question from "./Components/Question";
import AddQuestion from "./Components/AddQuestion";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Question />} />
        <Route path="/add" element={<AddQuestion/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
