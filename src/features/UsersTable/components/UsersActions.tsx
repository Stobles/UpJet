import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";

const UsersActions = ({ items }: { items: MenuProps["items"] }) => {
  return (
    <Dropdown trigger={["click"]} placement="bottom" menu={{ items }}>
      <Button
        size="middle"
        icon={<EllipsisOutlined />}
        onClick={(e) => e.preventDefault()}
      />
    </Dropdown>
  );
};

export default UsersActions;
