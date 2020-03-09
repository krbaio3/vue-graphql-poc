const formatDescription = (desc: string): string => (desc.length > 30 ? `${desc.slice(0, 30)}...` : desc);

const getTitleRules = [
  (title: string) => !!title || 'Title is required',
  (title: string) => title.length < 20 || 'Title must have less 20 characters',
];

const getImageRules = [(img: string) => !!img || 'Image is required'];

const getDescRules = [
  (desc: string) => !!desc || 'Description is required',
  (desc: string) => desc.length <= 200 || 'Description at least less 200 characters',
];

const getCategoriesRules = [(categories: string) => categories.length >= 1 || 'At least one category is required'];

const itemList: string[] = ['Art', 'Education', 'Travel', 'Photography', 'Technology'];

export {
  formatDescription,
  getTitleRules,
  getImageRules,
  getDescRules,
  getCategoriesRules,
  itemList,
};
