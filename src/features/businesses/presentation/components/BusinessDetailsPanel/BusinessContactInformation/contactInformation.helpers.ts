export const removeInstagramPrefix = (instagram: string): string =>
  instagram.replace(/^@/, '');

export const getInstagramUrl = (instagram: string): string =>
  `https://instagram.com/${removeInstagramPrefix(instagram)}`;

export const getWebsiteUrl = (website: string): string => {
  if (website.startsWith('http://') || website.startsWith('https://')) {
    return website;
  }

  return `https://${website}`;
};

export const getMapsUrl = (address: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address,
  )}`;
