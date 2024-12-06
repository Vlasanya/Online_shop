// import ProductList from "../components/productList";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
// import { fetchProducts } from "../services/api";
// import { GetServerSideProps } from "next";

// import { Product } from "../store/reduser";

// export type HomeProps = {}; // No props needed for Home now.

// export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
//   return { props: {} }; // Return an empty props object since nothing is needed.
// };

export default function Home() {
  return (
    <div>
      <AnalyticsDashboard />
    </div>
  );
}

