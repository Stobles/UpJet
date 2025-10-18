import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { useState } from "react";
import { useDeleteUser } from "../mutations/deleteUserMutation";
import UserUpdateModalForm from "./UserUpdateModalForm";
import { User } from "@/entities/Users";

const actionItems: MenuProps["items"] = [
  {
    label: "Редактировать",
    key: "edit",
  },
  {
    label: "Удалить",
    key: "delete",
  },
];

const UsersActions = ({ user }: { user: User }) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const { mutate } = useDeleteUser();

  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "delete") mutate(user.id);
    if (key === "edit") setIsOpenEdit(true);
  };

  const onCancel = () => {
    setIsOpenEdit(false);
  };

  return (
    <>
      <Dropdown
        trigger={["click"]}
        placement="bottom"
        menu={{ items: actionItems, onClick }}
      >
        <Button
          size="middle"
          icon={<EllipsisOutlined />}
          onClick={(e) => e.preventDefault()}
        />
      </Dropdown>
      <UserUpdateModalForm user={user} open={isOpenEdit} onCancel={onCancel} />
    </>
  );
};

export default UsersActions;
