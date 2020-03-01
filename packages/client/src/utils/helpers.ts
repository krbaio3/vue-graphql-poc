const formatDescription = (desc: string): string => (desc.length > 30 ? `${desc.slice(0, 30)}...` : desc);

export { formatDescription };
