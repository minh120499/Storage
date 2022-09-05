import "./stock_transfers/file.css";
import { ListExport } from "./stock_transfers/list";

export default function Storage() {
  return (
    <div className="background-storage">
      <ListExport />

      {/* <SelectInventory /> */}
    </div>
  );
}
