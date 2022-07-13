
import './App.css'
import { Header } from './components/Header'
import { Search } from './components/search'
import { Tasks } from './components/Tasks'

export function App() {

  return (
    <div className="App">
      <Header />
      <Search />
      <Tasks />
    </div>
  )
}
