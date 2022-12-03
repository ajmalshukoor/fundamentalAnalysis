import React, {useContext} from 'react';
import Container from 'react-bootstrap/Container';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {ValueContext} from "../Context/ValueContext";
import Search from "./Search";

/*ToDo: 
Needs some refactoring
Remove react-bootstrap and use regular components
*/
export default function NavBar() {
  const {val} = useContext(ValueContext);
  
  return (

      <Navbar  className="navbar" fixed="top">
        <Container className="nav">
          <Navbar.Brand  className="mr-auto me-13">{val==""?<i class="fa fa-bars fa-2x icon" aria-hidden="true"></i>:<h2 className="symbol">{val}</h2>}</Navbar.Brand>
          <h3 className="nav-head"></h3>
          <Nav className="me-auto">
            {/* <Nav.Link><Link to="/" className="nav--link"></Link></Nav.Link> */}
            <Search/>
          </Nav>
          <NavDropdown className="nav--link" title="Evaluate" id="basic-nav-dropdown">
              <NavDropdown.Item ><Link to="/understand" className="nav--link_drop">Understand The Business</Link></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >
                <Link to="/growth" className="nav--link_drop">Profitability</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item ><Link to="/ratios" className="nav--link_drop">Financial Ratios</Link></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/valuation" className="nav--link_drop">
                Valuation and Decision
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
        </Container>
      </Navbar>
  );
}
// export default function NavBar() {
//   return (
//     <>
//       <Navbar fixed="top" bg="dark" variant="dark">
//         <Container className="nav">
//           <Navbar.Brand  className="mr-auto"><Link to="/" className="nav--link">StockAnalyse</Link></Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link><Link to="/" className="nav--link">Search</Link></Nav.Link>
//           </Nav>
//           <NavDropdown className="nav--link" title="Evaluate" id="basic-nav-dropdown">
//               <NavDropdown.Item ><Link to="/understand" className="nav--link_drop">Understand The Business</Link></NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item >
//                 <Link to="/growth" className="nav--link_drop">Profitability</Link>
//               </NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item ><Link to="/ratios" className="nav--link_drop">Financial Ratios</Link></NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item>
//                 <Link to="/valuation" className="nav--link_drop">
//                 Valuation and Decision
//                 </Link>
//               </NavDropdown.Item>
//             </NavDropdown>
//         </Container>
//       </Navbar>
//     </>
//   );
// }

      // <div className="full-nav">
      // <div className="navbar">
      //   <Link to="#" className="menu-bars"><FaIcons.FaBars onClick={showSidebar}/></Link>
      // </div>
      // <nav className={sidebar ? 'nav-menu active': 'nav-menu'}>
      //   <ul className="nav-menu-items">
      //     <li className="navbar-toggle">
      //       <Link to="/" className="menu-text" onClick={showSidebar}>Search  <BiIcons.BiSearchAlt/></Link>
      //     </li>
      //     <li className="navbar-toggle">
      //       <Link to="/understand" className="menu-text" onClick={showSidebar}>Business Model</Link>
      //     </li>
      //     <li className="navbar-toggle">
      //       <Link to="/growth" className="menu-text" onClick={showSidebar}>Profitability</Link>
      //     </li>
      //     <li className="navbar-toggle">
      //       <Link to="/ratios" className="menu-text" onClick={showSidebar}>Financial Ratios</Link>
      //     </li>
      //     <li className="navbar-toggle">
      //       <Link to="/valuation" className="menu-text" onClick={showSidebar}>Valuation and Decision</Link>
      //     </li>
      //   </ul>
      // </nav>
      // </div>