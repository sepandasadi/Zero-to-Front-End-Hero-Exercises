import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import BoardList from './pages/BoardList'
import Board from './pages/Board'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BoardList />} />
        <Route path="board/:boardId" element={<Board />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App

