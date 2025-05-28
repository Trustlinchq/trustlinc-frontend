export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-neutral1">
                <main>{children}</main>
            </body>
        </html>
    );
}
