
const apikey ="CWA-F7421042-B3BE-45CA-BD48-4A0D65DC9C7B";
const format = "JSON";
const dataid= "W-C0033-001";
const url=`https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/${dataid}?Authorization=${apikey}&format=${format}`;

const container = document.querySelector('.container');
const search= document.querySelector('#city');
const searchBtn = document.querySelector('#searchBtn');

const weather =  new Promise((resolve, reject) => {
    fetch(url)
    .then(response => response.json())
    .then(data => resolve(data))
    .catch(error => reject(error))
});

async  function getWeather() {
    try {
      const data = await weather; // 直接 await weather Promise
      return data; // 將取得的資料回傳
    } catch (error) {    }
  }
  
  


// searchBtn.addEventListener('click',()=>{
//   weather.then(data => {
//         console.log(data);
//         const nwdata = data.cwaopendata.dataset;
//         console.log(nwdata.location.length);
//         for (let i=0; i< nwdata.location.length; i++){
//           if(search.value == nwdata.location.locationName[i] ){
//             container.textContent = JSON.stringify(nwdata.location);  
//         }
        
//       }
// })
// })  


// searchBtn.addEventListener('click', () => {
//   weather.then(data => {
//     console.log(data);
//     const nwdata = data.cwaopendata.dataset;
//     console.log(nwdata.location.length);

//     let foundLocation = false; // 新增一個標誌來追蹤是否找到地點

//     for (let i = 0; i < nwdata.location.length; i++) {
//       // 檢查 search.value 是否與當前地點的 locationName 相符
//       // 注意：這裡假設 locationName 是 nwdata.location[i] 物件的一個屬性
//       if (search.value === nwdata.location[i].locationName) {
//         // 如果找到匹配的地點，將該地點的完整物件轉換為 JSON 字串並顯示
//         // 使用 null, 2 參數讓 JSON 輸出更易讀
//         container.textContent = JSON.stringify(nwdata.location[i], null, 2);
//         foundLocation = true; // 設定標誌為 true
//         break; // 找到後就跳出迴圈，如果您只需要第一個匹配項
//       }
//     }

//     // 如果迴圈結束後 foundLocation 仍然是 false，表示沒有找到匹配的地點
//     if (!foundLocation) {
//       container.textContent = `找不到 ${search.value} 的天氣資料。`;
//     }

//   })
//   .catch(error => {
//       console.error("取得天氣資料或處理時發生錯誤:", error);
//       container.textContent = "載入天氣資料時發生錯誤。"; // 顯示錯誤訊息
//   });
// });


searchBtn.addEventListener('click', () => {
  weather.then(data => {
    const nwdata = data.cwaopendata.dataset;
    let foundLocation = false;

    for (let i = 0; i < nwdata.location.length; i++) {
      const loc = nwdata.location[i];
      
      if (search.value === loc.locationName) {
        foundLocation = true;

        let resultText = `城市: ${loc.locationName}\n代碼: ${loc.geocode}\n`;

        const hazard = loc.hazardConditions;

        if (!hazard || !hazard.hazards) {
          resultText += `天氣良好 🌤️`;
        } else {
          const info = hazard.hazards.info;
          const time = hazard.hazards.validTime;
          resultText += `⚠️ 天氣警報\n`;
          resultText += `現象: ${info.phenomena}\n等級: ${info.significance}\n`;
          resultText += `開始時間: ${time.startTime}\n結束時間: ${time.endTime}`;
        }

        container.textContent = resultText;
        break;
      }
    }

    if (!foundLocation) {
      container.textContent = `找不到 ${search.value} 的天氣資料。`;
    }
  })
  .catch(error => {
    console.error("取得天氣資料或處理時發生錯誤:", error);
    container.textContent = "載入天氣資料時發生錯誤。";
  });
});
