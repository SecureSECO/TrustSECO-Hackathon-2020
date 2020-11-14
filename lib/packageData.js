import data from "../testData/data.json";

export function getAllPackageIds() {
  let paths = data.slice().map((record) => {
    return {
      params: {
        id: record.title.toLowerCase(),
      },
    };
  });
  return paths;
}
export function getAllPackageNames() {
  let paths = data.slice().map((record) => {
    return record.title;
  });
  return paths;
}

export function getFeaturedData() {
  return data;
}
export function getPackageData(id) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].title.toLowerCase() == id) return data[i];
  }
  return null;
}
