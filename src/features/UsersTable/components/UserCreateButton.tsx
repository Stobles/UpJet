"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import UserForm from "./UserForm";
import { useCreateUser } from "../mutations/createUserMutation";

const UserCreateButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { mutate, isPending } = useCreateUser();

  return (
    <>
      <Button onClick={() => showModal()}>
        Создать <PlusOutlined />
      </Button>
      <Modal
        title="Создание пользователя"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <UserForm onSubmit={(data) => mutate(data)} isPending={isPending} />
      </Modal>
    </>
  );
};

export default UserCreateButton;
