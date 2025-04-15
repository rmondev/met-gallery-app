import { Gideon_Roman, Roboto } from "next/font/google";
import "@/styles/globals.css";
import MainNav from "@/components/MainNav";
import { ToastContainer } from 'react-toastify';


const gideon = Gideon_Roman({
  variable: "--font-gideon",
  subsets: ["latin"],
  weight: "400",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata = {
  title: "MET Gallery Search App",
  description: "Search the MET Gallery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${gideon.variable} ${roboto.variable}`}> 
        <MainNav/>
        {children}
        <ToastContainer 
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          // theme="light"
        />
      </body>
    </html>
  );
}
