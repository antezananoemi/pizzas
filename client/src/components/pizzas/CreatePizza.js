import React, { useState, useEffect } from "react";
import { connect } from "redux-bundler-react";
import ListPizzas from "./ListPizzas";
import SelectTopping from "./SelectTopping";

const fetchToppings = async ({ doFetchToppings }) => {
  await doFetchToppings;
};

const CreatePizzaPage = props => {
  const [name, setName] = useState("");
  const [selectTops, setSelect] = useState([]);
  const {
    doFetchPizzas,
    doClearPizzas,
    doSavePizzas,
    doFetchToppings,
    doClearToppings,
    toppingsIsLoading
  } = props;
  let toppings = props.toppingsData || [];
  useEffect(() => {
    fetchToppings(doFetchToppings());
    return () => {
      doClearToppings();
    };
  }, [doClearToppings, doFetchToppings]);
  const onChange = e => {
    setName(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const newPizza = {
      name,
      toppings: Object.values(selectTops)[0]
    };

    await doSavePizzas(newPizza);
    doClearPizzas();
    setName("");
    doFetchPizzas();
  };
  const handleSelect = selectedOption => {
    setSelect({ selectedOption });
  };
  return (
    <>
      <h1 className="large text-primary">Create a Pizza</h1>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={e => onChange(e)}
            placeholder="Pepperoni..."
            name="name"
            required
          />
        </div>
        <div className="form-group">
          <SelectTopping toppings={toppings} handleSelect={handleSelect} />
        </div>
        <input type="submit" className="btn btn-primary" value="Save Pizza" />
      </form>
      <br />
      <hr />
      <ListPizzas />
    </>
  );
};
export default connect(
  "doFetchPizzas",
  "doClearPizzas",
  "selectPizzasData",
  "selectPizzasIsLoading",
  "doSavePizzas",
  "doClearPizzas",
  "doFetchPizzas",
  "doFetchToppings",
  "doClearToppings",
  "selectToppingsData",
  "selectToppingsIsLoading",
  CreatePizzaPage
);
