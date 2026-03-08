import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => (
  <div className="min-h-screen flex flex-col">
    <SiteHeader />
    <main className="flex-1">{children}</main>
    <SiteFooter />
  </div>
);

export default PageLayout;
