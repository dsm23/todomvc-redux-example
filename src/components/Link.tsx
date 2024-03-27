// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import PropTypes from "prop-types";
import cx from "clsx";

const Link = ({ active, children, setFilter }) => (
  // eslint-disable jsx-a11y/anchor-is-valid
  <a
    className={cx({ selected: active })}
    style={{ cursor: "pointer" }}
    onClick={() => setFilter()}
  >
    {children}
  </a>
);

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default Link;
