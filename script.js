window.onload=()=>{
  getCountryData();
  document.getElementById("listOfCountries-container_id").style.visibility = "hidden";
}
var close = 0;
var closeTbl=0;
const closeGraph=()=>{
 
if(close==0){
  document.getElementById("showGraphBtn").innerHTML = "Close Graph";
  
  let edit = document.getElementById("chart-data");
  edit.style.visibility = 'visible';
  let inContainter= document.getElementById("input-container-id");
  inContainter.style.visibility="hidden";
  document.getElementById("showTableBtn").style.visibility = "hidden";
  document.getElementById("showGraphBtn").style.visibility = "visible";
  let background = document.getElementById("map");
  background.style.visibility = "hidden";
  document.getElementById("listOfCountries-container_id").style.visibility="hidden";
  document.getElementById("btn-recovered-graph").style.visibility = "visible";
  document.getElementById("btn-deaths-graph").style.visibility = "visible";
}
 if(close==1){
 close=-1;
 document.getElementById("showGraphBtn").innerHTML = "Show Graph";
 let edit = document.getElementById("chart-data");
 edit.style.visibility = 'hidden';

 document.getElementById("showTableBtn").style.visibility = "visible";
 let inContainter= document.getElementById("input-container-id");
 inContainter.style.visibility="visible";
 let background = document.getElementById("map");
  background.style.visibility = "visible";
  document.getElementById("btn-recovered-graph").style.visibility = "hidden";
  document.getElementById("btn-deaths-graph").style.visibility = "hidden";
  document.getElementById("chart-data-r").style.visibility = "hidden";
  document.getElementById("chart-data-d").style.visibility = "hidden";
}
 close++;
}
const showRecoveredGraph = () =>{
  document.getElementById("chart-data").style.visibility = "hidden";
  document.getElementById("chart-data-d").style.visibility = "hidden";
  document.getElementById("chart-data-r").style.visibility = "visible";
}
const showDeathsGraph = () =>{
  document.getElementById("chart-data").style.visibility = "hidden";
  document.getElementById("chart-data-r").style.visibility = "hidden";
  document.getElementById("chart-data-d").style.visibility = "visible";
}
const closeTable=()=>{
 
if(closeTbl==0){
  document.getElementById("showTableBtn").innerHTML = "Close Table";
  let edit = document.getElementById("country-data-container");
  edit.style.visibility = 'visible';
  let inContainter = document.getElementById("input-container-id");
  inContainter.style.visibility="hidden";
  document.getElementById("showTableBtn").style.visibility = "visible";
  document.getElementById("showGraphBtn").style.visibility = "hidden";
  let background = document.getElementById("map");
  background.style.visibility = "hidden";
  document.getElementById("listOfCountries-container_id").style.visibility="hidden";
  
  

}
 if(closeTbl==1){
  closeTbl=-1;
 document.getElementById("showTableBtn").innerHTML = "Show Table";
 let edit = document.getElementById("country-data-container");
 edit.style.visibility = 'hidden';
 document.getElementById("showGraphBtn").style.visibility = "visible";
  let inContainter = document.getElementById("input-container-id");
  inContainter.style.visibility="visible";
  let background = document.getElementById("map");
  background.style.visibility = "visible";
  
}
 closeTbl++;
}


var image ={

  url:'COVID-19-Virus-Transparent-Background-seehow.png',
  
  
}
  const getCountryData =()=>{
    fetch('https://corona.lmao.ninja/v2/countries')
    .then((response)=>{
      return response.json();
      
    }).then((data)=>{
      
      showDataOnMap(data); 
      showDataInTable(data); 
      getHistoricalData(data);
      

    })
  }   
  var option = 0;    
  var i = 0;
  var choice = 0;
  var copyData = []              
  callSortyByName=()=>{
    
    
    
    option = 1;
    i=0;
    copyData = [] 
    fetch('https://corona.lmao.ninja/v2/countries')
    .then((response)=>{
      return response.json();
      
    }).then((data)=>{
     
      exclusiveForSort(data);

    })
    
  }
  callSortyByCases=()=>{
    
    option = 2;
    i=0;
    copyData = [] 
    fetch('https://corona.lmao.ninja/v2/countries')
    .then((response)=>{
      return response.json();
      
    }).then((data)=>{
     
      exclusiveForSort(data);

    })
    
  }
  callSortyByRecovered=()=>{
    
    option = 3;
    i=0;
    copyData = [] 
    fetch('https://corona.lmao.ninja/v2/countries')
    .then((response)=>{
      return response.json();
      
    }).then((data)=>{
     
      exclusiveForSort(data);

    })
    
  }
 
  callSortyByDeaths=()=>{
    option = 4;
    i=0;
    copyData = [] 
    fetch('https://corona.lmao.ninja/v2/countries')
    .then((response)=>{
      return response.json();
      
    }).then((data)=>{
      
      exclusiveForSort(data);

    })
    
  }

  exclusiveForSort=(data)=>{
    for(i;i<data.length;i++){
      copyData.push([data[i].country,data[i].active,
    data[i].todayRecovered,data[i].todayDeaths])
    
      }
      if(option==1)
      sortByCountryName(copyData);
      if(option==2)
      sortByCountryCases(copyData);
      if(option==3)
      sortByCountryRecovered(copyData);
      if(option==4)
      sortByCountryDeaths(copyData);
      
      
      
  }
  var infoWindow;
  var arrayOfCountries = [];
  var start=0;
  const showDataOnMap =(data)=>{

    
    
    data.map((country)=>{
      let countryCenter = {
      lat: country.countryInfo.lat,
      lng: country.countryInfo.long,
    }

    
      var countryCircle = new google.maps.Marker({
        position: countryCenter,
        map: map,
        center: countryCenter,
        icon: image,
        
    });
    
    arrayOfCountries[start++] = country.country;
    
    
    
      var htmlInfo = `
      <div class="info-container">
        <div class="info-flag" style="background-image: url(${country.countryInfo.flag})"></div>
        <div class="info-name"> ${country.country}</div>
       <div class="infor-data-container">
        <div class="info-titles">
        <div class="title-1">Total cases:</div>
        <div class="title-2">Total recovered:</div>
        <div class="title-3">Total deaths:</div>
        </div>
         <div class="info-numbers">
         <div class="title-1"> ${numberWithCommas(country.cases)}</div>
         <div class="title-2">${numberWithCommas(country.recovered)}</div>
         <div class="title-3"> ${numberWithCommas(country.deaths)}</div>
        </div>
        </div>
      </div>
      `

      
      
      google.maps.event.addListener(countryCircle, 'click', function() {
        infoWindow.setContent(htmlInfo);
        infoWindow.open(map, countryCircle);
      });
     
    })
    
  }
  var center = {lat: 39.8333333, lng: -98.585522};
  var map;
  function initMap() {
      
    map = new google.maps.Map(document.getElementById('map'), {
      center: center ,
      minZoom: 4,
      maxZoom: 8,
      zoom: 6,
      styles: mapStyle,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: false,
      gestureHandling: 'greedy',
    });
    infoWindow = new google.maps.InfoWindow();
    
  }
  
  
  
  var countriesList = "";
  searchCountry=()=>{
    document.getElementById("listOfCountries-container_id").style.height = "400px"
    let ctryName = document.getElementById("ctryName").value
    if(ctryName.length==0){
    document.getElementById("listOfCountries-container_id").style.height = "0px";
    document.getElementById("listOfCountries-container_id").style.visibility = "hidden";
      countriesList = "";
      
  document.getElementById('input-table-data').innerHTML= countriesList;
      return;
    }
    
    document.getElementById("listOfCountries-container_id").style.visibility = "visible";
    
    for (const x of arrayOfCountries) {
     
      if(x.toLowerCase().search(ctryName.toLowerCase())!=0){
        
        continue;
     
      }
      showUpDataInTableFromInput(x);
      
    }
    
    countriesList = "";
    
   
  }
  
  
  const lookForCoordinates=(country)=>{

    fetch('https://corona.lmao.ninja/v2/countries')
    .then((response)=>{
      return response.json();
      
    }).then((data)=>{
     
      actualCoordinatesLookup(data,country);

    })

  }
  var newinfoWindow;
  const actualCoordinatesLookup=(data,countryName)=>{
    var coordinates = {};
    data.map((country)=>{
      if(countryName==country.country){
        coordinates = {lat: country.countryInfo.lat, lng: country.countryInfo.long};
        document.getElementById("listOfCountries-container_id").style.visibility = "hidden";
        document.getElementById("ctryName").value = "";
        displayNewMap(coordinates);
    }

    })
    data.map((country)=>{
      var newcountryCenter = {
      lat: country.countryInfo.lat,
      lng: country.countryInfo.long,
    }

      
      var newcountryCircle = new google.maps.Marker({
        position: newcountryCenter,
        map: map,
        center: newcountryCenter,
        icon: image,
        
    }); 
    
      var newhtmlInfo = `
      <div class="info-container">
        <div class="info-flag" style="background-image: url(${country.countryInfo.flag})">
          
          
        </div>
        <div class="info-name">
          ${country.country}
        </div>
       <div class="infor-data-container">
        <div class="info-titles">
        <div class="title-1">Total cases:</div>
        <div class="title-2">Total recovered:</div>
        <div class="title-3">Total deaths:</div>
        </div>
         <div class="info-numbers">
         <div class="title-1"> ${numberWithCommas(country.cases)}</div>
         <div class="title-2">${numberWithCommas(country.recovered)}</div>
         <div class="title-3"> ${numberWithCommas(country.deaths)}</div>
        </div>
        </div>
      </div>
      `

   
    
      google.maps.event.addListener(newcountryCircle, 'click', function() {
        newinfoWindow.setContent(newhtmlInfo);
        newinfoWindow.open(map, newcountryCircle)
      });

   
     
   
    })

    
  }

  const displayNewMap=(center)=>{
   
    
    document.getElementById("listOfCountries-container_id").style.height = "0px";
    countriesList = "";
    map = new google.maps.Map(document.getElementById('map'), {
      center: center ,
      minZoom: 4,
      maxZoom: 8,
      zoom: 6,
      styles: mapStyle,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: false,
      gestureHandling: 'greedy'
    });
    newinfoWindow = new google.maps.InfoWindow();
    
    
    
  }

  const showUpDataInTableFromInput = (country) =>{
    
    
      countriesList += `
  <tr>
  <div class="input-countriesDisplay-container">
      <td class="indv-countries"><button class="btns-input btn-success" id="${country}"
       value="${country}" onclick="lookForCoordinates(value)">${country}</btn></td>
      </div>
  </tr>
      
  `
  
  
  document.getElementById('input-table-data').innerHTML= countriesList;
  
    
  }

  //By default it load in that position (NYC)
  
    

    
const showDataInTable = (data) =>{
  var html ='';
  data.forEach(country => {
   
      html += `
  <tr>
      <td>${country.country}</td>
      <td>${numberWithCommas(country.active)}</td>
      <td>${numberWithCommas(country.todayRecovered)}</td>
      <td>${numberWithCommas(country.todayDeaths)}</td>
  </tr>
  `
  });
  document.getElementById('table-data').innerHTML= html;
  
}

const showUpdateDataInTable = (data) =>{
  
html ='';
  
  
  let info = 0;
  for(let i=0;i<data.length;i++){
    html += `
    <tr>
    <td>${data[i][info++]}</td>
    <td>${numberWithCommas(data[i][info++])}</td>
    <td>${numberWithCommas(data[i][info++])}</td>
    <td>${numberWithCommas(data[i][info++])}</td>
    
</tr>
`
//reset so elements from 0-3 are displayed
info=0;
  }
  document.getElementById('table-data').innerHTML= html;

}
sortByCountryName=(data)=>{


if(choice==0){
data.reverse();
showUpdateDataInTable(data);

}
if(choice==1){
 choice = -1;
data.sort()

showUpdateDataInTable(data);

}
choice++;

}
sortByCountryCases=(data)=>{

if(choice==0)
data.sort(function(a, b) {
  //Descending order, for ascending a[1] - b[1]
  return b[1] - a[1];
})
if(choice==1){
  choice = -1;
  data.sort(function(a, b) {
    
    return a[1] - b[1];
    
})

}
choice++;

showUpdateDataInTable(data);

}
sortByCountryRecovered=(data)=>{

if(choice==0){
  
data.sort(function(a, b) {
  //Descending order, for ascending a[2] - b[2]
  return b[2] - a[2];
  
})
}
if(choice==1){
  choice=-1;
  data.sort(function(a, b) {
    //Descending order, for ascending a[2] - b[2]
    return a[2] - b[2];
    
})

}
choice++;

showUpdateDataInTable(data);

} 
sortByCountryDeaths=(data)=>{
if(choice==0){
  data.sort(function(a, b) {
    //Descending order, for ascending a[3] - b[3]
    return b[3] - a[3];
})
}

if(choice==1){
  choice=-1;
  data.sort(function(a, b) {
    //Descending order, for ascending a[3] - b[3]
    return a[3] - b[3];
})

}
choice++;

showUpdateDataInTable(data);

}  

function numberWithCommas(x) {
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const getHistoricalData = () => {

fetch('https://corona.lmao.ninja/v2/historical/all?lastdays=120')
.then((response)=>{
  return response.json();
  
}).then((data)=>{
let chartDataCases = buildchartDataCases(data);
 buildChartCases(chartDataCases);  

let chartDataRecovered = buildchartDataRecovered(data);
buildChartRecovered(chartDataRecovered);

let chartDataDeaths = buildchartDataDeaths(data);
buildChartDeaths(chartDataDeaths);
})
}

const buildchartDataCases = (data) =>{
let chartDataCases = [];

for(let date in data.cases){
  let newDates = {
    x: date,
    y: data.cases[date]
  }
  chartDataCases.push(newDates);
  
}
return chartDataCases;
}
const buildchartDataRecovered = (data) =>{
  let chartDataRecovered = [];
  
  for(let date in data.recovered){
    let newDates = {
      x: date,
      y: data.recovered[date]
    }
    chartDataRecovered.push(newDates);
    
  }
  return chartDataRecovered;
  }
  const buildchartDataDeaths = (data) =>{
    let chartDataDeaths = [];
    
    for(let date in data.deaths){
      let newDates = {
        x: date,
        y: data.deaths[date]
      }
      chartDataDeaths.push(newDates);
      
    }
    return chartDataDeaths;
    }

const buildChartCases = (chartDataCases) =>{


var timeFormat = 'MM/DD/YY';
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    
      datasets: [{
          label: 'World COVID-19 Cases',
          backgroundColor: 'orange',  
          borderColor: 'purple',
          borderWidth: 1,
          data: chartDataCases,
          pointRadius: 5,
          pointHoverRadius: 6,
          
      }]
  },

  // Configuration options go here
  options: {
    
    
    scales:     {
      xAxes: [{
          type:     "time",
          
          time:       {
              format: timeFormat,
              tooltipFormat: 'll'
          },
        
          ticks: {
            // This more specific font property overrides the global property
            fontColor: 'black',
            fontSize: 20
            
        },
        gridLines: {
          color: "black",
      }  
      }],
      yAxes: [{
        ticks: {
          // Include a dollar sign in the ticks
          fontSize: 20,
          callback: function(value) {
              return numberWithCommas(value);
             
          },
          fontColor: 'black',     
        },
        
      gridLines: {
        color: "black",
    }  
      
    }]
  },
  legend: {
    labels: {
      fontSize: 20,
    fontColor: 'black'
    }
    
  }
 
  }
});
}
const buildChartRecovered = (chartDataRecovered) =>{


  var timeFormat = 'MM/DD/YY';
  var ctx = document.getElementById('myChart-r').getContext('2d');
  var chart = new Chart(ctx, {
    type: 'line',
    data: {
      
        datasets: [{
            label: 'World COVID-19 Recovered',
            backgroundColor: 'green',  
            borderColor: 'black',
            borderWidth: 1,
            data: chartDataRecovered,
            pointRadius: 5,
            pointHoverRadius: 6,
            
        }]
    },
    options: {
      
      
      scales:     {
        xAxes: [{
            type:     "time",
            
            time:       {
                format: timeFormat,
                tooltipFormat: 'll'
            },
          
            ticks: {
              fontColor: 'black',
              fontSize: 20        
          },
          gridLines: {
            color: "black",
        }  
        }],
        yAxes: [{
          ticks: {
            fontSize: 20,
            callback: function(value) {
                return numberWithCommas(value);
               
            },
            fontColor: 'black',     
          },
          
        gridLines: {
          color: "black",
      }  
        
      }]
    },
    legend: {
      labels: {
        fontSize: 20,
        fontColor: 'black'
      }
      
    }
   
    }
  });
  }
  const buildChartDeaths = (chartDataDeaths) =>{


    var timeFormat = 'MM/DD/YY';
    var ctx = document.getElementById('myChart-d').getContext('2d');
    var chart = new Chart(ctx, {
      type: 'line',
      data: {
        
          datasets: [{
              label: 'World COVID-19 Deaths',
              backgroundColor: 'red',  
              borderColor: 'black',
              borderWidth: 1,
              data: chartDataDeaths,
              pointRadius: 5,
              pointHoverRadius: 6,
              
          }]
      },
      options: {
        
        
        scales:     {
          xAxes: [{
              type:     "time",
              
              time:       {
                  format: timeFormat,
                  tooltipFormat: 'll'
              },
            
              ticks: {
                fontColor: 'black',
                fontSize: 20        
            },
            gridLines: {
              color: "black",
          }  
          }],
          yAxes: [{
            ticks: {
              fontSize: 20,
              callback: function(value) {
                  return numberWithCommas(value);
                 
              },
              fontColor: 'black',     
            },
            
          gridLines: {
            color: "black",
        }  
          
        }]
      },
      legend: {
        labels: {
          fontSize: 20,
        fontColor: 'black'
        }
        
      }
     
      }
    });
    }