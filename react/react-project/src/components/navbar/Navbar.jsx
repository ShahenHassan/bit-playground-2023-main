import { useState } from "react";

import logo from "../../assets/images/logo.svg";
import Button from "../button/Button";
import Container from "../container/Container";

function Navbar() {
  const img = "/userprofile.img";
  const userData = {
    firstName: "Hama",
    lastName: "Saadwn",
    profile: `http://localhost3000${img}`,
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(userData);

  const handleClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleChangeClick = () => {
    setUser({
      ...user,
      firstName: "Mohammed",
    });
  };

  return (
    <nav className="navbar">
      <Container>
        <a className="logo" href="/">
          <img src={logo} alt="Potan Logo" />
        </a>
        <ul>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <Button
              text={isLoggedIn ? "Logout" : "Login"}
              handleClick={handleClick}
            />
          </li>

          <li>
            <a href="">{user.firstName}</a>
          </li>

          <Button text="change user" handleClick={handleChangeClick} />
        </ul>
      </Container>
    </nav>
  );
}

export default Navbar;
