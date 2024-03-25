import { connect } from "react-redux";
import Header from "../components/Header";
import { addTodo } from "../actions";

// eslint-disable-next-line react-refresh/only-export-components
export default connect(null, { addTodo })(Header);
