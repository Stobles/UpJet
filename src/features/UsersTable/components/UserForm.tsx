import { Button, Input, Select, Space } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { createUserSchema, TCreateUser } from "../mutations/createUserMutation";
import {
  LoadingOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/shared/ui/Form/Form";

const UserForm = ({
  defaultValues,
  onSubmit,
  isPending,
}: {
  defaultValues?: TCreateUser;
  onSubmit: SubmitHandler<TCreateUser>;
  isPending: boolean;
}) => {
  const { register, handleSubmit, ...form } = useForm<TCreateUser>({
    resolver: zodResolver(createUserSchema),
    mode: "onChange",
    defaultValues: defaultValues || {
      name: "",
      phone: "",
      email: "",
      role: "User",
    },
  });

  return (
    <Form {...{ register, handleSubmit, ...form }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <Input
                    size="large"
                    placeholder="Имя"
                    prefix={<UserOutlined />}
                    {...register("name")}
                    {...field}
                  />
                  <FormMessage style={{ color: "red" }} />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <Input
                    size="large"
                    placeholder="Email"
                    prefix={<MailOutlined />}
                    {...register("email")}
                    {...field}
                  />
                  <FormMessage style={{ color: "red" }} />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => {
              return (
                <FormItem>
                  <Input
                    size="large"
                    placeholder="Номер телефона"
                    prefix={<PhoneOutlined />}
                    {...register("phone")}
                    {...field}
                  />
                  <FormMessage style={{ color: "red" }} />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => {
              return (
                <FormItem>
                  <Select
                    size="large"
                    placeholder="Роль"
                    style={{ width: "100%" }}
                    options={[
                      { value: "Admin", label: "Admin" },
                      { value: "Manager", label: "Manager" },
                      { value: "User", label: "Userr" },
                    ]}
                    {...register("role")}
                    {...field}
                  />
                  <FormMessage style={{ color: "red" }} />
                </FormItem>
              );
            }}
          />
          <Button
            icon={isPending ? <LoadingOutlined /> : null}
            disabled={isPending}
            size="large"
            htmlType="submit"
            style={{ marginTop: 10 }}
          >
            Отправить
          </Button>
        </Space>
      </form>
    </Form>
  );
};

export default UserForm;
