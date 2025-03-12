import Head from "next/head";

interface AlternateLinksProps {
  currentPath: string;
}

export function AlternateLinks({ currentPath }: AlternateLinksProps) {
  const domains = [
    "https://nayan135.com.np",
    "https://nayan135.night-owls.tech",
    "https://nayanacharya.xyz"
  ];
  
  // Default to root path if no path is provided
  const path = currentPath || "";
  
  return (
    <Head>
      {domains.map(domain => (
        <link 
          key={domain} 
          rel="alternate" 
          hrefLang="en-US" 
          href={`${domain}${path}`} 
        />
      ))}
      <link 
        rel="canonical" 
        href={`https://nayan135.com.np${path}`} 
      />
    </Head>
  );
}
