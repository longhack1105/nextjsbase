const sliceText = (text: string, n: number): string => {
  return `${text.slice(0, n)}${text.length > n ? "..." : ""}`;
};

export const sliceTextMail = (text: string): string => {
  const newText = text.split("@");

  return `${newText[0].slice(0, 4)}${newText[0].length > 3 ? "..." : ""}@${
    newText[1]
  }`;
};

export default sliceText;
