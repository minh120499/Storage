import { IRole, IRoleLable } from "../../interface";
import { roleColor } from "../../constant";
import { Form, Modal, Tag } from "antd";
import { useState } from "react";
import RoleSelect from "./RoleSelect";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type props = {
  roles: [IRole];
  empId?: any;
};

let currentRoles: string[] = [];

export default function Role({ roles, empId }: props) {
  const updateRole = useMutation<Response, unknown, any>((data) => {
    return axios.post(`http://localhost:8080/api/roles/emp/${empId}`, data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  });
  const [modal, setModal] = useState(false);
  const setRole = (e: any) => {
    currentRoles = e;
  };
  const updateRoles = () => {
    if (currentRoles.length === 0) {
      console.log("canot update");
    } else {
      updateRole.mutate({ rolesString: currentRoles });
    }
  };

  return (
    <div className="w-max">
      {roles.length > 0 ? (
        roles.map((role: IRole) => {
          return (
            <Tag
              className="cursor-pointer"
              onClick={() => setModal(true)}
              key={role?.id}
              color={roleColor[role.name as keyof IRoleLable]}
            >
              {role?.name}
            </Tag>
          );
        })
      ) : (
        <Tag className="cursor-pointer" onClick={() => setModal(true)}>
          Add role
        </Tag>
      )}
      <Modal
        title="Role"
        visible={modal}
        onOk={() => updateRoles()}
        onCancel={() => setModal(false)}
      >
        <Form>
          <RoleSelect getRole={setRole} empRole={roles.map((e) => e.name)} />
        </Form>
      </Modal>
    </div>
  );
}
