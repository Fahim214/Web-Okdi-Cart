import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/search/:keyword" element={<HomeScreen />} />
          <Route path="/page/:pageNumber" element={<HomeScreen />} />
          <Route
            path="/search/:keyword/page/:pageNumber"
            element={<HomeScreen />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
