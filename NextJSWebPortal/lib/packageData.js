// import data from "../testData/data.json";
import data from "../testData/crawledData.json";

export function getAllPackageIds() {
  let paths = data.slice().map((record) => {
    return {
      params: {
        id: record.id.toLowerCase(),
      },
    };
  });
  return paths;
}
export function getAllPackageNames() {
  let paths = data.slice().map((record) => {
    return record.id;
  });
  return paths;
}

export function getFeaturedData() {
  return data.slice(1, 6);
}
export function getPackageData(id) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id.toLowerCase() == id) return data[i];
  }
  return null;
}
