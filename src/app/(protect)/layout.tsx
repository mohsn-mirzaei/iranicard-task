import ProtectLayout from "./ProtectedLayout";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = async ({ children }: LayoutProps) => {
  return <ProtectLayout>{children}</ProtectLayout>;
};

export default layout;
