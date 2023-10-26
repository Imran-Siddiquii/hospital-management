import { Link, useMatch } from "react-router-dom";
import "./sidebar.css";
function NavLinkWithActive({ to, children }) {
  const match = useMatch(to);
  return (
    <li className={match ? "active" : ""}>
      <Link to={to}>{children}</Link>
    </li>
  );
}
const Sidebar = () => {
  return (
    <div className="left-sidebar">
      <div className="logo">
        <Link to="/">
          <img src="/Hospital_Logo.png" alt="Hospital Logo" width="100px" />
        </Link>
        <h2
          style={{
            textAlign: "center"
          }}
        >
          Hopital Management
        </h2>
      </div>
      <ul className="nav-links">
        <NavLinkWithActive to="/">Patients</NavLinkWithActive>
        <NavLinkWithActive to="/wards">Wards</NavLinkWithActive>
        <NavLinkWithActive to="/hospital">Hopital</NavLinkWithActive>
      </ul>
    </div>
  );
};
export default Sidebar;
