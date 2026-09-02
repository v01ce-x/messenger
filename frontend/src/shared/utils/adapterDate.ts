export const adapterDate = (dateParam: Date) => {
  const date = new Date(dateParam);

  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
}