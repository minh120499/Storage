import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const EditIcon = (props: any) => {
  return (
    <ModeEditIcon
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

export { EditIcon, DeletedIcon };
