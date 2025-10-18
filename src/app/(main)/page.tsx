import styles from "./page.module.scss";
import TableWidget from "./components/TableWidget";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUsersQueryOptions } from "@/entities/Users/api/queries";

const HomePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getUsersQueryOptions({ page: 1, limit: 10 }));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={styles.page}>
        <TableWidget />
      </div>
    </HydrationBoundary>
  );
};

export default HomePage;
