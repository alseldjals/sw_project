import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import { useState } from "react";
const Wrapper = styled.div`
  position: fixed;
  z-index: 99;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 2em;
  height: 8em;
`;
const Logo = styled.img``;
const Menus = styled.div`
  display: flex;
  width: 20%;
  justify-content: space-between;
`;
const Menu = styled.span`
  text-decoration: none;
  color: black;
`;
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 991 });
  return isMobile ? children : null;
};
const MWrapper = styled.div`
  position: fixed;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 2em;
  height: 8em;
`;
const Burger = styled.div`
  position: absolute;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  transform: ${(props) =>
    props.isBurger ? "translateX(30%)" : "translateX(100%)"};
  opacity: ${(props) => (props.isBurger ? "1" : "0")};
  background-color: black;
  z-index: 2;
  transition: all 0.2s;
`;
const MMenu = styled.span`
  color: white;
`;
const Header = () => {
  const [isburger, setIsBurger] = useState(false);
  const toggleBurger = () => setIsBurger(!isburger);
  return (
    <>
      <Desktop>
        <Wrapper>
          <Link to="/">
            <Logo src="logo.png" />
          </Link>
          <Menus>
            <Link to="/about1">
              <Menu>ABOUT</Menu>
            </Link>
            <Link to="/designer">
              <Menu>DESIGNER</Menu>
            </Link>
            <Link to="/exhibition">
              <Menu>EXHIBITION</Menu>
            </Link>
          </Menus>
        </Wrapper>
      </Desktop>
      <Mobile>
        <MWrapper>
          <Link to="/">
            <Logo src="logo.png" />
          </Link>
          <svg
            style={{ width: "9%" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            onClick={toggleBurger}
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </MWrapper>
        <Burger isBurger={isburger}>
          <button onClick={toggleBurger}>x</button>
          <Link to="/about1" onClick={toggleBurger}>
            <MMenu>ABOUT</MMenu>
          </Link>
          <Link to="/designer" onClick={toggleBurger}>
            <MMenu>DESIGNER</MMenu>
          </Link>
          <Link to="/exhibition" onClick={toggleBurger}>
            <MMenu>EXHIBITION</MMenu>
          </Link>
        </Burger>
      </Mobile>
    </>
  );
};
export default Header;
