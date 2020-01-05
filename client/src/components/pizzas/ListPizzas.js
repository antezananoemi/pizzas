import React, { useState, useEffect } from "react";
import Loading from "../loading/";
import { connect } from "redux-bundler-react";
import Empty from "../empty";
import SelectTopping from "./SelectTopping";

const defaultImage =
  "https://media.gettyimages.com/photos/high-angle-view-of-pizza-on-table-picture-id1070066930?s=2048x2048";

const fetchPizzas = async ({ doFetchPizzas }) => {
  await doFetchPizzas;
};

const fetchToppings = async ({ doFetchToppings }) => {
  await doFetchToppings;
};
const handleDelete = (e, props, id) => {
  props.doRemovePizzas({ id });
};

const ListPizzas = props => {
  const {
    doFetchPizzas,
    doClearPizzas,
    pizzasIsLoading,
    doSavePizzas,
    toppingsData,
    doFetchToppings,
    doClearToppings
  } = props;

  const [selectTops, setSelect] = useState([]);
  const [selectAvailable, setSelectAvailable] = useState(false);
  let pizzas = props.pizzasData;
  let toppingsAll = toppingsData || [];

  useEffect(() => {
    fetchPizzas(doFetchPizzas());
    fetchToppings(doFetchToppings());
    return () => {
      doClearPizzas();
      doClearToppings();
    };
  }, [doClearPizzas, doFetchPizzas, doSavePizzas]);
  const handleChangeTop = () => {
    setSelectAvailable(!selectAvailable);
  };
  if (pizzasIsLoading) {
    return <Loading />;
  }
  if (!props.pizzasData || pizzas.length == 0) {
    return <Empty />;
  }
  if (props.pizzasData.msg) {
    pizzas = props.doFetchPizzas();
    return <Empty />;
  }
  const handleSelect = selectedOption => {
    setSelect({ selectedOption });
  };
  const onSubmit = async (e, id) => {
    e.preventDefault();
    const newToppings = {
      id,
      toppings: Object.values(selectTops)[0]
    };
    await props.doUpdatePizzas(newToppings);
    doClearPizzas();
    handleChangeTop();
    doFetchPizzas();
  };
  return (
    <>
      <h2 className="text-primary">Pizzas</h2>
      <div className="profiles">
        {pizzas.map(pizza => {
          const { toppings = [] } = pizza;
          let areTop;
          if (toppings[0]) {
            areTop = Object.values(toppings[0]).map(top => {
              if (top) {
                return (
                  <li className="text-primary" key={top._id}>
                    <i className="fas fa-check" /> {top.name}
                  </li>
                );
              }
            });
          }

          return (
            <div className="profile bg-light" key={pizza._id}>
              <a href={`/pizza/${pizza._id}`}>
                <img
                  className="round-img"
                  src={pizza.picture || defaultImage}
                  alt="pizza img"
                />
              </a>

              <div>
                <h2>
                  <a href={`/pizza/${pizza._id}`}>{pizza.name}</a>
                </h2>
                <a
                  href="#"
                  className="btn btn-primary"
                  onClick={e => handleDelete(e, props, pizza._id)}
                >
                  Delete Pizza
                </a>
                <a
                  href="#"
                  onClick={e => handleChangeTop(e)}
                  className="btn btn-dark"
                >
                  Update toppings
                </a>

                {selectAvailable && toppingsData.length > 0 ? (
                  <form onSubmit={e => onSubmit(e, pizza._id)}>
                    <SelectTopping
                      className="form"
                      toppings={toppingsAll}
                      handleSelect={handleSelect}
                    />
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Add Toppings"
                    />
                  </form>
                ) : (
                  ""
                )}
              </div>

              <ul>{areTop}</ul>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default connect(
  "doFetchPizzas",
  "doClearPizzas",
  "selectPizzasData",
  "selectPizzasIsLoading",
  "doSavePizzas",
  "doRemovePizzas",
  "doUpdatePizzas",
  "doToppingsNames",
  "doFetchToppings",
  "doClearToppings",
  "selectToppingsData",
  "selectToppingsIsLoading",
  ListPizzas
);
