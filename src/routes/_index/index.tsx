import type { FunctionComponent } from "react";
import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/header";
import MainSection from "~/components/main";
import styles from "./styles.module.css";

// eslint-disable-next-line react-refresh/only-export-components
export const meta: MetaFunction = () => {
  return [
    { title: "Redux TodoMVC Example" },
    {
      property: "og:title",
      content: "Redux TodoMVC Example",
    },
    {
      name: "description",
      content:
        "TodoMVC example application written using React, Redux and Remix",
    },
    {
      name: "og:image",
      content:
        "https://upload.wikimedia.org/wikipedia/commons/5/5d/GNOME_Todo_icon_2019.svg",
    },
  ];
};

const Index: FunctionComponent = () => (
  <>
    <main className={styles.todoapp}>
      <Header />
      <MainSection />
    </main>
    <aside>
      <p className="text-center leading-none">Double-click to edit a todo</p>
    </aside>
  </>
);

export default Index;
