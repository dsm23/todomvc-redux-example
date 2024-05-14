import type { FunctionComponent } from "react";
import Link from "src/components/link";
import {
  VisibilityFilter,
  filters,
} from "src/features/visibility-filter/slice";

import styles from "./styles.module.css";

const FILTER_TITLES = {
  [filters.SHOW_ALL]: "All",
  [filters.SHOW_ACTIVE]: "Active",
  [filters.SHOW_COMPLETED]: "Completed",
} as const;

type Props = {
  completedCount: number;
  activeCount: number;
  onClearCompleted: () => void;
};

const Footer: FunctionComponent<Props> = (props) => {
  const { activeCount, completedCount, onClearCompleted } = props;
  const itemWord = activeCount === 1 ? "item" : "items";
  return (
    <footer className={styles.footer}>
      <span className={styles.todoCount}>
        <strong>{activeCount || "No"}</strong> {itemWord} left!
      </span>
      <ul className={styles.filters}>
        {(Object.keys(FILTER_TITLES) as VisibilityFilter[]).map((filter) => (
          <li key={filter}>
            <Link filter={filter}>{FILTER_TITLES[filter]}</Link>
          </li>
        ))}
      </ul>
      {!!completedCount && (
        <button className={styles.clearCompleted} onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
