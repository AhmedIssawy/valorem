// Generate URL-encoded SVG placeholders to avoid external dependencies

export const generatePlaceholderImage = (width: number, height: number, text: string = 'Course Image') => {
  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="${width}" height="${height}" fill="#F3F4F6"/><text x="${width/2}" y="${height/2}" font-family="Arial" font-size="16" fill="#9B9BA0" text-anchor="middle" dominant-baseline="central">${text}</text></svg>`;
  
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

// Pre-generated common placeholders
export const COURSE_IMAGE_PLACEHOLDER = generatePlaceholderImage(400, 225, 'Course Image');
export const COURSE_DETAIL_PLACEHOLDER = generatePlaceholderImage(600, 400, 'Course Image');
export const AVATAR_PLACEHOLDER = generatePlaceholderImage(40, 40, 'User');