import { Modal, ModalProps } from "antd";
import UserForm from "./UserForm";
import { useCreateUser } from "../mutations/createUserMutation";
import { User } from "@/entities/Users";
import { useUpdateUser } from "../mutations/updateUserMutations";

const UserUpdateModalForm = ({
  user,
  ...props
}: ModalProps & { user: User }) => {
  const { mutate, isPending } = useUpdateUser();

  const { id, ...defaultValues } = user;
  return (
    <Modal
      title="Редактирование пользователя"
      closable={{ "aria-label": "Закрыть модальное окно" }}
      footer={null}
      {...props}
    >
      <UserForm
        defaultValues={defaultValues}
        onSubmit={(data) => mutate({ id, data })}
        isPending={isPending}
      />
    </Modal>
  );
};

export default UserUpdateModalForm;
