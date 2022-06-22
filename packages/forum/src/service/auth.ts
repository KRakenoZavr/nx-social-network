import axios from 'axios'
type UserInput = { [x: string]: any }

export const userLogin = async (data: UserInput) => {
  try {
    const res = await axios.post('http://localhost:3000/login', data)
    console.log(res)
  } catch (err) {
    console.warn(err)
  }
}
