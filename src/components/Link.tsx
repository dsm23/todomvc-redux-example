// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import PropTypes from "prop-types";
import cx from "clsx";
import { setVisibilityFilter } from "~/actions";
import { useAppDispatch, useAppSelector } from "~/app/hooks";

const Link = ({ children, filter }) => {
  const dispatch = useAppDispatch();
  const visibilityFilter = useAppSelector((state) => state.visibilityFilter);

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
