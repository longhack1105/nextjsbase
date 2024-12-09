import i18n from '~/locale/i18n';

export const formatTime = function (secondsInput: number) {
  const minutes = secondsInput / 60;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.floor(minutes % 60);
  const seconds = Math.floor((minutes % 1) * 60);

  let result = '';

  if (hours > 0) result += `${hours} ${i18n.t('giờ')} `;
  if (remainingMinutes > 0) result += `${remainingMinutes} ${i18n.t('phút')} `;
  if (seconds > 0) result += `${seconds} ${i18n.t('giây')}`;

  return result.trim(); // Remove any trailing whitespace
};
