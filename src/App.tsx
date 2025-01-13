import { Provider } from "react-redux";
import { setupStore } from "~/app/store";
import Header from "~/components/header";
import MainSection from "~/components/main";
import styles from "./styles.module.css";

const App = () => (
  <Provider store={setupStore()}>
    <main className={styles.todoapp}>
      <Header />
      <MainSection />
    </main>
    <aside>
      <p className="text-center leading-none">Double-click to edit a todo</p>
    </aside>
  </Provider>
);

export default App;
