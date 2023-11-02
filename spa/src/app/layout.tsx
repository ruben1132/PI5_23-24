
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import '@fortawesome/fontawesome-svg-core/styles.css'

import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../components/navigation/Navigation";
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "RobDroneGo",
  description: "dashboard for RobDroneGo",
};
  
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  


  return (
    <Navigation>
        {children}
    </Navigation>
  );
}
