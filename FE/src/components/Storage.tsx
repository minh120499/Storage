import "./stock_transfers/file.css";
import Create from "./stock_transfers/create";
import {ListExport} from "./stock_transfers/list";

export default function Storage() {
  return (
    <div className="background-storage">
      <div>
        <h2>Tạo phiếu chuyển hàng</h2>
      </div>

      <ListExport />

      {/* <SelectInventory /> */}
    </div>
  );
}
