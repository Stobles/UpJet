"use client";

import { Modal, ModalProps } from "antd";
import UserForm from "./UserForm";
import { useCreateUser } from "../mutations/createUserMutation";

const UserCreateModalForm = ({ ...props }: ModalProps) => {
  const { mutate, isPending } = useCreateUser();
  return (
    <Modal
      title="Создание пользователя"
      closable={{ "aria-label": "Закрыть модальное окно" }}
      footer={null}
      {...props}
    >
      <UserForm onSubmit={(data) => mutate(data)} isPending={isPending} />
    </Modal>
  );
};

export default UserCreateModalForm;
