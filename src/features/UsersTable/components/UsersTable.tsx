import { User } from "@/entities/Users/types";
import { MenuProps, Table, TableProps } from "antd";
import UsersActions from "./UsersActions";

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

const columns: TableProps<User>["columns"] = [
  {
    title: "Имя",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Телефон",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Роль",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Действия",
    key: "action",
    render: (_, record) => <UsersActions items={actionItems} />,
  },
];

const UsersTable = ({ data }: { data: User[] | undefined }) => {
  return (
    <Table
      style={{ width: "100%" }}
      rowKey="id"
      dataSource={data}
      columns={columns}
    />
  );
};

export default UsersTable;
