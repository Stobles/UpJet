"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import UserCreateModalForm from "./UserCreateModalForm";

const UserCreateButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => showModal()}>
        Создать <PlusOutlined />
      </Button>
      <UserCreateModalForm open={isModalOpen} onCancel={onCancel} />
    </>
  );
};

export default UserCreateButton;
