import React, { Fragment, useEffect, useState } from "react";

import EditItem from "./EditItem";

const ListItems = () => {
  const [items, setItems] = useState([]);

  //delete item function
  const deleteItem = async (id) => {
    try {
      const deleteItem = await fetch(`http://localhost:5000/items/${id}`, {
        method: "DELETE",
      });

      setItems(items.filter((item) => item.item_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  //purchase an item
  const purchaseItem = async (description, id) => {
    try {
      const body = { description: description };

      const purchaseItem = await fetch("http://localhost:5000/purchased", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      await deleteItem(id);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/items");
      const jsonData = await response.json();
      console.log(jsonData);
      var sorted_items = sortItems(jsonData);
      console.log(sorted_items);
      setItems(sorted_items);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getItems();
  }, []);

  const sortItems = (grocery_items) => {
    var sorted_items = grocery_items.sort((a, b) => {
      if (a.aisle < b.aisle) {
        return -1;
      }
      if (a.aisle > b.aisle) {
        return 1;
      }
      return 0;
    });
    return sorted_items;
  };

  return (
    <Fragment>
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th>Aisle</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
            </tr>*/}
          {items.map((item) => (
            <tr key={item.item_id}>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => purchaseItem(item.description, item.item_id)}
                >
                  ✓
                </button>
              </td>
              <td>{item.description}</td>
              <td>{item.aisle}</td>
              <td>
                <EditItem item={item} />
                <button
                  className="btn btn-danger"
                  onClick={() => deleteItem(item.item_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListItems;
