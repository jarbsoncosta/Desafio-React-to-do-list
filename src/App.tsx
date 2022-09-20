import { Header } from "./components/Header";
import styles from './App.module.css'
import './global.css'
import { Todo } from "./components/Todo";

export function App() {

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <main>
          <Todo />
        </main>
      </div>

    </div>
  )
}


