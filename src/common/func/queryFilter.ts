export const newDataDelete = ({
  oldData,
  value,
  key,
}: {
  oldData: {
    items: any[];
    total: number;
  };
  value: any;
  key: string;
}): {
  items: any[];
  total: number;
} => {
  const newData: any[] = oldData.items.filter((x) => x[key] != value);
  return {
    items: newData,
    total: oldData.total - 1,
  };
};

export const insertData = (
  newData: any[],
  oldData: any[],
  keyCheck: string
) => {
  const existingKeys = new Set(oldData.map((data) => data[keyCheck]));
  const newDataToInsert = newData.filter((v) => !existingKeys.has(v[keyCheck]));

  return newDataToInsert;
};
