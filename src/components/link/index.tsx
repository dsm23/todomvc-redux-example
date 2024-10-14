import type { FunctionComponent, ReactNode } from "react";
import cx from "clsx";
import {
  getVisibilityFilter,
  setVisibilityFilter,
} from "src/features/visibility-filter/slice";
import type { VisibilityFilter } from "src/features/visibility-filter/slice";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import styles from "./styles.module.css";

type Props = {
  children: ReactNode;
  filter: VisibilityFilter;
};

const Link: FunctionComponent<Props> = ({ children, filter }) => {
  const dispatch = useAppDispatch();
  const visibilityFilter = useAppSelector(getVisibilityFilter);

  const active = filter === visibilityFilter;

  const handleClick = () => {
    dispatch(setVisibilityFilter(filter));
  };

  return (
    // eslint-disable jsx-a11y/anchor-is-valid
    <a
      className={cx(styles.link, { [styles.selected]: active })}
      style={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

export default Link;
