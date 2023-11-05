import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const username = userInfo?.username;
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    }).then(() => {
      setUserInfo(null);
    });
  };

  return (
    <header>
      <Link to="/" className="logo">
        My Blog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <Link onClick={logout} to="/login">
              Logout
            </Link>
            {/* <a onClick={logout}>Logout</a> */}
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
