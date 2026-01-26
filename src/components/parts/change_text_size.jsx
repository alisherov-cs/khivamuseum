
export const change_text_size = (scale) => {
    document.documentElement.style.fontSize = `${scale/100 * 1}em`; // Global font-size
    localStorage.setItem('text-size', scale)
};