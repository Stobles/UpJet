import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { useMemo } from "react";
import { useDeleteUser } from "../mutations/deleteUserMutation";

const UsersActions = ({ id }: { id: string }) => {
  const { mutate } = useDeleteUser();

  const actionItems: MenuProps["items"] = useMemo(
    () => [
      {
        label: "Редактировать",
        key: "edit",
      },
      {
        label: "Удалить",
        key: "delete",
      },
    ],
    []
  );

  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "delete") mutate(id);
  };
  return (
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
  );
};

export default UsersActions;
