import Search from "./product_variant/search";
// import SelectInventory from "./inventory/select_inventory";
import "./product_variant/file.css";

export default function Storage() {
  return (
    <div className="background-storage">
      <div>
        <h2>Tạo phiếu chuyển hàng</h2>
      </div>
     
        <Search />
      
      
      {/* <SelectInventory /> */}
    </div>
  );
}
