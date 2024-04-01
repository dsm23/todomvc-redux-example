import type { FunctionComponent } from "react";
import Header from "~/components/header";
import MainSection from "~/components/main";

import styles from "./styles.module.css";

const App: FunctionComponent = () => (
  <>
    <main className={styles.todoapp}>
      <Header />
      <MainSection />
    </main>
    <p className="text-center leading-none">Double-click to edit a todo</p>
  </>
);

export default App;
