export default function Head() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Sign Up and Register | TrustLinc",
        url: "https://www.trustlinc.app/register",
        description:
            "Join TrustLinc today! Sign up to start delivering promises and fulfilling connections in your community.",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://www.trustlinc.app/register",
        },
        image: "https://www.trustlinc.app/og-image.jpg",
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </>
    );
}
