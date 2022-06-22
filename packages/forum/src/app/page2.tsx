import { Link, useParams } from 'react-router-dom'

export function Page2() {
  const params = useParams()
  console.log(params)
  return (
    <div>
      <Link to="/">{params['id']} Click here to go back to root page.</Link>
    </div>
  )
}
