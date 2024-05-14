import type { FunctionComponent } from "react";
import type { MetaFunction } from "@remix-run/node";
import Header from "src/components/header";
import MainSection from "src/components/main";

import styles from "./styles.module.css";

// eslint-disable-next-line react-refresh/only-export-components
export const meta: MetaFunction = () => {
  return [
    { title: "Redux TodoMVC Example" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const Index: FunctionComponent = () => (
  <>
    <main className={styles.todoapp}>
      <Header />
      <MainSection />
    </main>
    <p className="text-center leading-none">Double-click to edit a todo</p>
  </>
);

export default Index;
