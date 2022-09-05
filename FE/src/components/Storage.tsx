import "./stock_transfers/file.css";
import Create from "./stock_transfers/create";

export default function Storage() {
  return (
    <div className="background-storage">
      <div>
        <h2>Tạo phiếu chuyển hàng</h2>
      </div>

      <Create />

      {/* <SelectInventory /> */}
    </div>
  );
}
