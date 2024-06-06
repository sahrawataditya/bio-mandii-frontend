import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Full Stack Task Manager",
  description: "Full Stack Task Manager Web Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {
          <>
            <Toaster
              position="top-center"
              toastOptions={{ duration: 1000 }}
              containerStyle={{ fontSize: "14px", fontWeight: 600 }}
            />
            {children}
          </>
        }
      </body>
    </html>
  );
}
