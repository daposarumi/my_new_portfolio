import type { Metadata } from "next";



export const metadata: Metadata = {
    title: "Dapo Sarumi",
    description: "Web creator, writer and photographer",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {



    return (
        <html lang="en">
            <body
                className="antialiased flex flex-col min-h-screen"
            >

                <main className="pt-5">{children}</main>



            </body>
        </html>
    );
}
