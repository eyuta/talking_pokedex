import Head from "next/head";

interface Props {
  title: string;
  description: string;
  image: string;
  url: string;
}

const Header = ({ title, description, image, url }: Props): JSX.Element => (
  <Head>
    <title>{title}</title>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="theme-color" content="#ffffff" />
    <meta name="description" content={description} />
    <link rel="icon" href="/favicon.ico" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@shion612" />

    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content="Talking Pokédex" />
    <meta property="og:image" content={image} />
  </Head>
);

export default Header;
