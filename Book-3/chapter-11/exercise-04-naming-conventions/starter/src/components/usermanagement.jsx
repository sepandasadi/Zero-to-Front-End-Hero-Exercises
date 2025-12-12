import { useState } from 'react'
import { get, do as process, check } from '../utils'
import './usermanagement.css'

// TODO: Fix ALL the terrible naming!
// Problems:
// - Cryptic variables: x, y, z, temp, data
// - Unclear functions: do(), get(), handle()
// - Inconsistent booleans: active, loggedIn
// - Poor event handlers

function usermanagement() {
  // SMELL: What is x, y, z?
  const [x, setx] = useState([])
  const [y, sety] = useState(false)
  const [z, setz] = useState(null)

  // SMELL: Generic "data"
  const [data, setdata] = useState({
    n: '',
    e: '',
    r: 'user'
  })

  // SMELL: Inconsistent boolean naming
  const active = x.length > 0
  const loggedIn = true
  const admin = data.r === 'admin'

  // SMELL: What does "do" do?
  const do_something = () => {
    if (data.n && data.e) {
      // SMELL: temp? What is this?
      const temp = {
        id: Date.now(),
        name: data.n,
        email: data.e,
        role: data.r,
        active: true
      }
      setx([...x, temp])
      setdata({ n: '', e: '', r: 'user' })
    }
  }

  // SMELL: Unclear function name
  const handle = (id) => {
    setx(x.filter(u => u.id !== id))
  }

  // SMELL: What does "get" get? And why does it update state?
  const get = (id) => {
    const temp = x.find(u => u.id === id)
    if (temp) {
      setz(temp)
      sety(true)
    }
  }

  // SMELL: What does "update" update?
  const update = () => {
    if (z) {
      setx(x.map(u => u.id === z.id ? z : u))
      sety(false)
      setz(null)
    }
  }

  // SMELL: Generic "change" - change what?
  const change = (e) => {
    const { name, value } = e.target
    if (y && z) {
      setz({ ...z, [name]: value })
    } else {
      setdata({ ...data, [name]: value })
    }
  }

  return (
    <div className="mgmt">
      <div className="form">
        <input
          name="n"
          value={y && z ? z.name : data.n}
          onChange={change}
          placeholder="Name"
        />
        <input
          name="e"
          value={y && z ? z.email : data.e}
          onChange={change}
          placeholder="Email"
        />
        <select
          name="r"
          value={y && z ? z.role : data.r}
          onChange={change}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {y ? (
          <>
            <button onClick={update}>Update</button>
            <button onClick={() => { sety(false); setz(null) }}>Cancel</button>
          </>
        ) : (
          <button onClick={do_something}>Add</button>
        )}
      </div>

      {active && (
        <div className="list">
          {x.map(u => (
            <div key={u.id} className="item">
              <div>
                <strong>{u.name}</strong>
                <span>{u.email}</span>
                <span className={`badge ${u.role}`}>{u.role}</span>
              </div>
              <div>
                <button onClick={() => get(u.id)}>Edit</button>
                <button onClick={() => handle(u.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default usermanagement

