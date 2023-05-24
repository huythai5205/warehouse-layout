import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function WarehouseList() {
  const [warehouses, setWarehouses] = useState([]);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    getWarehouseList();
  }, []);

  const getWarehouseList = () => {
    fetch("http://localhost:3000/warehouse/list", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setWarehouses(data));
  };

  const deleteWarehouse = (warehouseId) => {
    fetch("http://localhost:3000/warehouse/delete?warehouseId=" + warehouseId, {
      method: "DELETE"
    }).then((res) => getWarehouseList());
  };

  const addWarehouse = () => {
    const warehouseName = inputRef.current.value;
    if (!warehouseName) {
      setMessage("Please enter a name for new warehouse");
      return;
    }

    setMessage("");
    fetch("http://localhost:3000/warehouse/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: warehouseName })
    }).then((res) => {
      getWarehouseList();
      inputRef.current.value = "";
    });
  };

  return (
    <>
      <h2>Warehouses</h2>
      <p style={{ fontWeight: "bold", margin: 0 }}>Create a new warehouse:</p>
      <input
        ref={inputRef}
        type="text"
        id="inputWarehouseName"
        placeholder="Enter a name for new warehouse"
        style={{ width: 200, margin: "20, 0" }}
      />
      <button onClick={() => addWarehouse()}>Add a new warehouse</button>
      <br />
      <p style={{ color: "red" }}>{message}</p>
      <br />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map((warehouse) => {
            return (
              <tr key={warehouse._id}>
                <td>{warehouse.name}</td>
                <td>
                  <button>
                    <Link to={`/edit/${warehouse._id}`}>Edit</Link>
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteWarehouse(warehouse._id)}>
                    <Link>Delete</Link>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default WarehouseList;
