export const slugify = (text: string) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

export function paginate(object: any[], pageSize: number, pageNumber: number) {
  // Calculate the total number of pages
  const totalPages = Math.ceil(object.length / pageSize);

  // Determine the current page number
  const page = Math.max(1, Math.min(totalPages, pageNumber));

  // Calculate the start and end indices for the current page
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, object.length - 1);

  // Slice the array array to get the array for the current page
  const pageObject = object.slice(startIndex, endIndex + 1);

  // Return the paginated data and metadata
  return {
    page,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    object: pageObject,
  };
}
