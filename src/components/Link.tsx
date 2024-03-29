// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import PropTypes from "prop-types";
import cx from "clsx";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import {
  getVisibilityFilter,
  setVisibilityFilter,
} from "~/features/visibility-filter/slice";

const Link = ({ children, filter }) => {
  const dispatch = useAppDispatch();
  const visibilityFilter = useAppSelector(getVisibilityFilter);

  const active = filter === visibilityFilter;

  const handleClick = () => {
    dispatch(setVisibilityFilter(filter));
  };

  return (
    // eslint-disable jsx-a11y/anchor-is-valid
    <a
      className={cx({ selected: active })}
      style={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  filter: PropTypes.string.isRequired,
};

export default Link;
