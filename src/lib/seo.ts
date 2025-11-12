export const setMetaTags = (
  title: string,
  description: string,
  keywords?: string,
  ogImage?: string
) => {
  document.title = title;

  const updateOrCreateMetaTag = (name: string, content: string) => {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  const updateOrCreateProperty = (property: string, content: string) => {
    let meta = document.querySelector(
      `meta[property="${property}"]`
    ) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  updateOrCreateMetaTag('description', description);
  if (keywords) {
    updateOrCreateMetaTag('keywords', keywords);
  }

  updateOrCreateProperty('og:title', title);
  updateOrCreateProperty('og:description', description);
  if (ogImage) {
    updateOrCreateProperty('og:image', ogImage);
  }
};
