import { useEffect, useState } from "react";
import { getUserFromToken } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

function RestaurantNavBar() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function getCurrentUser(token) {
      const res = await getUserFromToken(token);
      if (res && res.user && res.user.type === "restaurant") setUser(res.user);
      else navigate("/");
    }

    const token = localStorage.getItem("access-token");
    if (token) {
      getCurrentUser(token);
    } else navigate("/");
  }, []);

  function handleLogout() {
    localStorage.removeItem("access-token");
    navigate("/");
  }

  return (
    <div className="navbar bg-accent shadow-2xl">
      <div className="flex-1">
        <a className="text-3xl text-primary pl-20">foodpanda</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-primary text-xl pr-20">
          <li>
            <a>Hello {user && user.name}</a>
          </li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
          <li>
            <details>
              <summary>EN</summary>
              <ul className="bg-accent p-2">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default RestaurantNavBar;
