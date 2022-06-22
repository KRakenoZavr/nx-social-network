import { Route, Routes, useParams } from 'react-router-dom'
import Page from './page'
import { Page2 } from './page2'
import Register from './register'

function Users() {
  const params = useParams()

  console.log(params)

  return <h2>userId is {params['userId']}</h2>
}

export function Router() {
  return (
    <Routes>
      <Route path="/" element={Page()} />
      <Route path="/page-2" element={<Page2 />} />
      <Route path="/page-2/:id" element={<Page2 />} />
      <Route path="/users/:userId" element={<Users />} />
      <Route path="/register" element={Register()} />
      <Route element={Page()} />
    </Routes>
  )
}
