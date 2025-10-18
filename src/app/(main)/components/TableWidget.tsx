"use client";

import { Typography } from "antd";
import { UserCreateButton, UsersTable } from "@/features/UsersTable";
import { useGetUsers } from "@/entities/Users";

import styles from "../page.module.scss";
import { useState } from "react";

const TableWidget = () => {
  const [page, setPage] = useState(1);

  const { data, isFetching } = useGetUsers({ page: page, limit: 10 });
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography.Title>Таблица пользователей</Typography.Title>
        <UserCreateButton />
      </div>
      <UsersTable
        data={data}
        loading={isFetching}
        pagination={{
          total: 40,
          onChange: (page) => {
            setPage(page);
          },
        }}
      />
    </div>
  );
};

export default TableWidget;
