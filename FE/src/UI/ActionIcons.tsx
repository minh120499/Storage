import DeleteIcon from "@mui/icons-material/Delete";
// import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { LockOutlined, UnlockOutlined, EditOutlined } from "@ant-design/icons";
const EditIcon = (props: any) => {
  return (
    <EditOutlined
      {...props}
      className="cursor-pointer"
      style={{ padding: "5px", background: "#E8A87C", color: "#fff" }}
    />
  );
};

const DeletedIcon = (props: any) => {
  return (
    <DeleteIcon
      {...props}
      className="cursor-pointer"
      style={{ padding: "5px", background: "#F64C72", color: "#fff" }}
    />
  );
};

const Lock = (props: any) => {
  return (
    <LockOutlined
      {...props}
      style={{ padding: "5px", color: "white" }}
      className="cursor-pointer bg-pink"
    />
  );
};

const UnLock = (props: any) => {
  return (
    <UnlockOutlined
      {...props}
      style={{ padding: "5px", color: "white" }}
      className="cursor-pointer bg-[#389e0d]"
    />
  );
};

export { EditIcon, DeletedIcon, Lock, UnLock };
