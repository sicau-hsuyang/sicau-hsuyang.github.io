(() => {
  function saveJSON() {
    const allData = getData();
    var jsonStr = JSON.stringify(allData);
    var blob = new Blob([jsonStr], { type: "application/json" });

    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data.json";
    a.click();
  }

  function getData() {
    const allData = [];
    const allKeys = Object.keys(localStorage);
    for (let i = 0; i < allKeys.length; i++) {
      const prop = allKeys[i];
      if (prop.indexOf("zhujialing_data") >= 0) {
        const chunkData = JSON.parse(localStorage.getItem(prop));
        allData.push(...chunkData);
      }
    }
    return allData;
  }

  saveJSON();
})();
