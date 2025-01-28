/* eslint-disable */
// @ts-nocheck
import { Button } from "../ui/button";
import { handleCreate, handleDelete, handleUpdate } from "@/utils/crud";

export const GamePhotoRenderer = (props: string) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <img
        src={props.value}
        alt="Game Photo"
        style={{ height: "100%", width: "auto", objectFit: "cover" }}
      />
    </div>
  );
};

export const OptionsCellRenderer = (props) => {
  const { data, updateRowData } = props;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Button
        variant="default"
        color="primary"
        onClick={() => handleCreate(props)}
        style={{ padding: "4px 8px", fontSize: "12px" }}
      >
        Create
      </Button>
      <Button
        variant="secondary"
        color="primary"
        onClick={() => handleUpdate(props)}
        style={{ padding: "4px 8px", fontSize: "12px" }}
      >
        Update
      </Button>
      <Button
        variant="destructive"
        color="secondary"
        onClick={() => handleDelete(data.id, updateRowData)}
        style={{ padding: "4px 8px", fontSize: "12px" }}
      >
        Delete
      </Button>
    </div>
  );
};
