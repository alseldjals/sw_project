import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About1 from "../screens/About1";
import About2 from "../screens/About2";
import About3 from "../screens/About3";
import Designers from "../screens/Designers";
import Exhibition from "../screens/Exhibition";
import Admin from "../screens/Admin";
import Home from "../screens/Home";
import Header from "./Header";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  padding-top: 8em;
`;
const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Wrapper>
        <Routes>
          <Route path="/about1" element={<About1 />} />
          <Route path="/about2" element={<About2 />} />
          <Route path="/about3" element={<About3 />} />
          <Route path="/designer" element={<Designers />} />
          <Route path="/exhibition" element={<Exhibition />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Wrapper>
    </Router>
  );
};
export default AppRouter;
