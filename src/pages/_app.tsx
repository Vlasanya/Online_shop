import { AppProps } from "next/app";
import { AppProvider } from "@/store";
import "@/styles/globals.css";
import ThemeCustomization from "@/themes/index";
import DashboardLayout from "@/layout/Dashboard";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AppProvider>
      <ThemeCustomization>
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
      </ThemeCustomization>
    </AppProvider>
  );
}

export default MyApp;
