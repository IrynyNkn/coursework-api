const colors = ['#FF948F', '#5465FF', '#00DE96', '#FE9934', '#FF5C29', '#38DDE1', '#3A751E', '#847EF5', '#5C1E18', '#A85943', '#8F3D33', '#3B5F8F', '#578F50'];

export function getUserColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}