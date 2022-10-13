import fonts from '@/assets/fonts/fonts.js';

export const getIcon = (type: string) => {
  const matchIcon = fonts.find(font => {
    return font.name === type;
  }) || { unicode: '', name: 'default' };

  return  String.fromCodePoint(parseInt(matchIcon.unicode, 16))
}
