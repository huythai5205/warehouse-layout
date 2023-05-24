import "./App.css";
import { Route, Routes } from "react-router-dom";
import WarehouseList from "./Warehouse-list";
import WarehouseEdit from "./Warehouse-edit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WarehouseList />}></Route>
      <Route path="/edit/:warehouseId" element={<WarehouseEdit />}></Route>
    </Routes>
  );
}

export default App;
