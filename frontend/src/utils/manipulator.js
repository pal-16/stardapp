
export const extractSlug =  (uri) => {
  try {
    const slug = uri.split(`${window.location.origin}/`)[1];
    return slug;
  } catch (err) {
    return ""
  }
}

export const reconstructBlobUrl =  (slug) => {
  try {
    return `blob:${window.location.origin}/${slug}`;
  } catch (err) {
    return ""
  }
}
