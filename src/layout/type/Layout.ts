type Layout = {
  navBar: {
    logo: {
      url: string | null;
      description: string | null;
    };
  };
  items: (
    | { slug: string; title: string; type: 'link' }
    | { type: 'products' }
  )[];
  categories: {
    title: string;
    products: number[];
  }[];
  products: {
    image: {
      url: string;
      description: string | null;
    } | null;
    title: string;
    slug: string;
    id: string;
  }[];
};

export default Layout;
