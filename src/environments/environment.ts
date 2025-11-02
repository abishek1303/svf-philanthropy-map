export const environment = {
  production: false,
  googleMapsApiKey: 'AIzaSyAI2k7B2z9OFbgSj3ULLqN4kL-WDCmTHzY',
  csvURL:  'https://docs.google.com/spreadsheets/d/1-rmitdPdYorMW0lsRc0prttldTyRRBNf62F_WVO_eBg/export?format=csv&gid=2058938837',
  // e.g. put this next to your csvURL in environments
  xlsxURL: 'https://docs.google.com/spreadsheets/d/1-rmitdPdYorMW0lsRc0prttldTyRRBNf62F_WVO_eBg/export?format=xlsx',
  mapId: '767b05226169a189635536c0',
  ContinentKeys: ["northamerica", "southamerica", "europe", "africa", "asia", "australia"],
  ContinentDataSets: 
  {
    "northamerica" :{
      datasetID: "0daa9417-52c9-41d8-a5b7-1ddaadb3c7d6",
      color: "#2ac4db",
      visible: true

    },
    "southamerica":{
      datasetID: "04c2421b-a704-4bc8-9c06-b22ee4d3ca78",
      color: "#0cb590",
      visible: true
    },
    "europe":{
      datasetID: "c3c6fd65-4349-4e92-b18c-8940c1cf13d9",
      color: "#2ac4db",
      visible: false
    },
    "africa":{
      datasetID: "2e658a3d-a68a-4293-82ec-233d9974d4a7",
      color: "#2ac4db",
      visible: false
    },
    "asia":{
      datasetID: "5141f324-cfb4-40d6-aae3-5bf68c8d55f4",
      color: "#C85FFF",
      visible: true
    },
    "australia":{
      datasetID: "27aac43c-e8a9-4660-96e3-91c129cb0063",
      color: "#facc07",
      visible: true
    }
  }
}; 