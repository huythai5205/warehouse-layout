import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function WarehouseEdit() {
  const { warehouseId } = useParams();

  const [warehouse, setWarehouse] = useState(null);
  const [message, setMessage] = useState("");
  const [showItemInput, setShowItemInput] = useState(false);
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedShelf, setSelectedShelf] = useState("");

  const itemInputRef = useRef("");

  const navigate = useNavigate();

  useEffect(() => {
    getWarehouse();
    reset();
  }, []);

  const reset = () => {
    setMessage("");
    setSelectedShelf("");
    setSelectedZone("");
  };

  const getWarehouse = () => {
    fetch("http://localhost:3000/warehouse/view?warehouseId=" + warehouseId, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => setWarehouse(data));
  };

  const updateWarehouse = () => {
    fetch("http://localhost:3000/warehouse/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(warehouse)
    }).then(() => navigate("/"));
  };

  const removeShelf = (zoneName, shelfLabel) => {
    const shelves = warehouse[zoneName].shelves.reduce((arr, shelf) => {
      if (shelf.label !== shelfLabel) {
        arr.push(shelf);
      }
      return arr;
    }, []);

    setWarehouse({ ...warehouse, ...{ [zoneName]: { shelves: shelves } } });
  };

  const addShelf = (zoneName) => {
    if (warehouse[zoneName].shelves.length > 9) {
      setMessage("The maximum of shelves is 10 for a zone");
      return;
    }
    let shelfLabel;
    let existingShelf = new Set();

    warehouse[zoneName].shelves.forEach((shelf) => {
      existingShelf.add(shelf.label);
    });

    for (let i = 1; i <= 10; i++) {
      if (!existingShelf.has(i)) {
        shelfLabel = i;
        break;
      }
    }
    const shelf = {
      label: shelfLabel,
      item: ""
    };

    const zone = warehouse[zoneName];
    zone.shelves.push(shelf);

    setWarehouse({ ...warehouse, ...{ [zoneName]: zone } });
  };

  const addItem = () => {
    if (!itemInputRef.current.value) {
      setMessage("Please enter an item");
      return;
    }

    const shelves = warehouse[selectedZone].shelves.reduce((arr, shelf) => {
      if (shelf.label !== selectedShelf) {
        arr.push(shelf);
      } else {
        shelf.item = itemInputRef.current.value;
        arr.push(shelf);
      }
      return arr;
    }, []);

    setWarehouse({ ...warehouse, ...{ [selectedZone]: { shelves: shelves } } });
    reset();
    setShowItemInput(false);
  };

  const itemInput = () => {
    return (
      <div>
        <p>{`Please enter item for shelf${selectedShelf} in ${selectedZone}`}</p>
        <input ref={itemInputRef} placeholder={`Please enter item`} />
        <button onClick={() => addItem()}>Add Item</button>
      </div>
    );
  };

  const renderZones = () => {
    let zones = [];

    for (let i = 1; i <= 12; i++) {
      const zoneName = "zone" + i;
      zones.push(
        <div style={{ width: 350, border: "1px solid black", padding: 20 }}>
          <div>{zoneName}</div>
          <div style={{ margin: 20 }}>
            {warehouse[zoneName].shelves.map((shelf) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                  key={shelf.label}
                >
                  <div>Shelf{shelf.label}</div>
                  <p>Has {shelf.item || "Nothing"}</p>
                  <button
                    onClick={() => {
                      setShowItemInput(true);
                      setSelectedShelf(shelf.label);
                      setSelectedZone(zoneName);
                    }}
                  >
                    Add Item
                  </button>
                  <button onClick={() => removeShelf(zoneName, shelf.label)}>
                    Remove Shelf
                  </button>
                </div>
              );
            })}
          </div>
          <button onClick={() => addShelf(zoneName)}>Add a Shelf</button>
        </div>
      );
    }

    return zones;
  };

  return (
    <div style={{ marginTop: 50, textAlign: "center" }}>
      {warehouse?.name && (
        <>
          <h2>Warehouse {warehouse.name}</h2>
          <button onClick={updateWarehouse}>Save warehouse</button>
          {showItemInput && itemInput()}
          <p style={{ color: "red" }}>{message}</p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              gap: 20
            }}
          >
            {renderZones()}
          </div>
        </>
      )}
    </div>
  );
}

export default WarehouseEdit;
