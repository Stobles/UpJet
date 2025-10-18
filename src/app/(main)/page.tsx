"use client";

import { useGetUsers } from "@/entities/Users/api/queries";

import UsersTable from "@/features/UsersTable/components/UsersTable";
import styles from "./page.module.scss";
import { Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UserCreateButton from "@/features/UsersTable/components/UserCreateButton";

export default function Home() {
  const { data } = useGetUsers();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Typography.Title>Таблица пользователей</Typography.Title>
          <UserCreateButton />
        </div>
        <UsersTable data={data} />
      </div>
    </div>
  );
}
