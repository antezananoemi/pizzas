import React, { useState } from "react";
import Loading from "../loading";
import { connect } from "redux-bundler-react";
import Empty from "../empty";

const CreateTopping = props => {
  const [name, setName] = useState("");
  const onChange = e => setName(e.target.value);
  const onSubmit = async e => {
    e.preventDefault();
    const newTopping = {
      name
    };
    await props.doSaveToppings(newTopping);
    props.doClearToppings();
    setName("");
    props.doFetchToppings();
  };

  return (
    <form className="form" onSubmit={e => onSubmit(e)}>
      <p className="lead">Add Topping</p>
      <div className="form-group">
        <input
          type="text"
          value={name}
          onChange={e => onChange(e)}
          placeholder="Olives.."
          name="name"
          required
        />
      </div>
      <input type="submit" className="btn btn-primary" value="Register" />
    </form>
  );
};
export default connect(
  "doSaveToppings",
  "doClearToppings",
  "doFetchToppings",
  CreateTopping
);
