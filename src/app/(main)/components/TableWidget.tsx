"use client";

import { Typography } from "antd";
import { UserCreateButton, UsersTable } from "@/features/UsersTable";
import { useGetUsers } from "@/entities/Users";

import styles from "../page.module.scss";

const TableWidget = () => {
  const { data, isPending } = useGetUsers();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography.Title>Таблица пользователей</Typography.Title>
        <UserCreateButton />
      </div>
      <UsersTable data={data} loading={isPending} />
    </div>
  );
};

export default TableWidget;
