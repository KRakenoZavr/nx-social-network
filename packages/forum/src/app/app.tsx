import { Link } from 'react-router-dom'
import { Router } from './router'

export default function App() {
  return (
    <>
      <br />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
          <li>
            <Link to="/page-2/kkel">Page 2 kek</Link>
          </li>
          <li>
            <Link to="/register">Registration</Link>
          </li>
        </ul>
      </div>
      <Router></Router>
    </>
  )
}
