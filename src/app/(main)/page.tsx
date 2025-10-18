import styles from "./page.module.scss";
import TableWidget from "./components/TableWidget";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUsers, getUsersQueryOptions } from "@/entities/Users/api/queries";

const HomePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: getUsersQueryOptions().queryKey,
    queryFn: getUsers,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={styles.page}>
        <TableWidget />
      </div>
    </HydrationBoundary>
  );
};

export default HomePage;
