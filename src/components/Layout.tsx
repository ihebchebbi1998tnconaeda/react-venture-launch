import { Sidebar } from "./Sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block w-72 border-r">
        <Sidebar />
      </div>
      <div className="flex-1 p-8">
        <div className="mx-auto max-w-4xl">{children}</div>
      </div>
    </div>
  );
}