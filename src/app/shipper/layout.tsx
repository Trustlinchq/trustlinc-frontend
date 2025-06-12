export default function ShipperPage({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-neutral1">{children}</body>
        </html>
    );
}
