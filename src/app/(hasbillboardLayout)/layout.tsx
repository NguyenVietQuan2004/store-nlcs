import MainNav from "./_navbar/navbar";

// tách ra layout này để mainav ko ảnh rưởng route khác
export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MainNav />
      {children}
    </div>
  );
}
