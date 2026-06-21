const DB_URL = "https://dht22records-default-rtdb.europe-west1.firebasedatabase.app";

// SVG Icons
const thermometerIcon = `
<svg version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <path style="fill:#FFFFFF;" d="M298.464,54.972c0-23.452-19.011-42.464-42.464-42.464c-23.452,0-42.464,19.011-42.464,42.464V186.35h84.927V54.972H298.464z"/>
  <path style="fill:#FF7876;" d="M298.464,358.076V186.348h-84.927v171.727c-20.857,13.796-34.623,37.449-34.623,64.33c0,42.574,34.512,77.087,77.087,77.087s77.087-34.512,77.087-77.087C333.087,395.526,319.321,371.872,298.464,358.076z"/>
  <path style="fill:#58595B;" d="M310.972,351.666c0-10.297,0-286.396,0-296.693C310.972,24.661,286.311,0,256,0s-54.972,24.661-54.972,54.972c0,10.305,0,286.4,0,296.693c-21.798,16.933-34.623,42.898-34.623,70.739C166.405,471.807,206.598,512,256,512s89.595-40.193,89.595-89.595C345.595,394.564,332.77,368.6,310.972,351.666z M226.044,54.972c0-16.517,13.439-29.956,29.956-29.956s29.956,13.439,29.956,29.956V86.92h-25.795c-6.91,0-12.508,5.599-12.508,12.508s5.599,12.508,12.508,12.508h25.795v12.975h-25.795c-6.91,0-12.508,5.599-12.508,12.508s5.599,12.508,12.508,12.508h25.795v23.912h-59.912L226.044,54.972L226.044,54.972z M256,486.984c-35.61,0-64.579-28.969-64.579-64.579c0-21.731,10.847-41.881,29.014-53.898c3.502-2.317,5.607-6.232,5.607-10.432V198.856h59.912v159.219c0,4.199,2.106,8.115,5.607,10.432c18.168,12.018,29.014,32.168,29.014,53.898C320.579,458.015,291.61,486.984,256,486.984z"/>
  <path style="fill:#58595B;" d="M293.001,409.897c-6.91,0-12.508,5.599-12.508,12.508c0,13.505-10.987,24.493-24.493,24.493c-6.91,0-12.508,5.599-12.508,12.508s5.599,12.508,12.508,12.508c27.299,0,49.509-22.208,49.509-49.509C305.509,415.497,299.909,409.897,293.001,409.897z"/>
</svg>
`;

const humidityIcon = `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.0066 3.25608C16.8483 2.85737 19.1331 2.8773 22.2423 3.65268C22.7781 3.78629 23.1038 4.32791 22.9699 4.86241C22.836 5.39691 22.2931 5.7219 21.7573 5.58829C18.8666 4.86742 16.9015 4.88747 15.4308 5.20587C13.9555 5.52524 12.895 6.15867 11.7715 6.84363L11.6874 6.89494C10.6044 7.55565 9.40515 8.28729 7.82073 8.55069C6.17734 8.82388 4.23602 8.58235 1.62883 7.54187C1.11607 7.33724 0.866674 6.75667 1.0718 6.24513C1.27692 5.73359 1.85889 5.48479 2.37165 5.68943C4.76435 6.6443 6.32295 6.77699 7.492 6.58265C8.67888 6.38535 9.58373 5.83916 10.7286 5.14119C11.855 4.45445 13.1694 3.6538 15.0066 3.25608Z" fill="#3498db"/>
  <path d="M22.2423 7.64302C19.1331 6.86765 16.8483 6.84772 15.0066 7.24642C13.1694 7.64415 11.855 8.44479 10.7286 9.13153C9.58373 9.8295 8.67888 10.3757 7.492 10.573C6.32295 10.7673 4.76435 10.6346 2.37165 9.67977C1.85889 9.47514 1.27692 9.72393 1.0718 10.2355C0.866674 10.747 1.11607 11.3276 1.62883 11.5322C4.23602 12.5727 6.17734 12.8142 7.82073 12.541C9.40515 12.2776 10.6044 11.546 11.6874 10.8853L11.7715 10.834C12.895 10.149 13.9555 9.51558 15.4308 9.19621C16.9015 8.87781 18.8666 8.85777 21.7573 9.57863C22.2931 9.71224 22.836 9.38726 22.9699 8.85275C23.1038 8.31825 22.7781 7.77663 22.2423 7.64302Z" fill="#3498db"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9998 10.0266C18.6526 10.0266 18.3633 10.2059 18.1614 10.4772C18.0905 10.573 17.9266 10.7972 17.7089 11.111C17.4193 11.5283 17.0317 12.1082 16.6424 12.7555C16.255 13.3996 15.8553 14.128 15.5495 14.8397C15.2567 15.5213 14.9989 16.2614 14.9999 17.0117C15.0006 17.2223 15.0258 17.4339 15.0604 17.6412C15.1182 17.9872 15.2356 18.4636 15.4804 18.9521C15.7272 19.4446 16.1131 19.9674 16.7107 20.3648C17.3146 20.7664 18.0748 21 18.9998 21C19.9248 21 20.685 20.7664 21.2888 20.3648C21.8864 19.9674 22.2724 19.4446 22.5192 18.9522C22.764 18.4636 22.8815 17.9872 22.9393 17.6413C22.974 17.4337 22.9995 17.2215 22.9998 17.0107C23.0001 16.2604 22.743 15.5214 22.4501 14.8397C22.1444 14.128 21.7447 13.3996 21.3573 12.7555C20.968 12.1082 20.5803 11.5283 20.2907 11.111C20.073 10.7972 19.909 10.573 19.8382 10.4772C19.6363 10.2059 19.3469 10.0266 18.9998 10.0266ZM20.6119 15.6257C20.3552 15.0281 20.0049 14.3848 19.6423 13.782C19.4218 13.4154 19.2007 13.0702 18.9998 12.7674C18.7989 13.0702 18.5778 13.4154 18.3573 13.782C17.9948 14.3848 17.6445 15.0281 17.3878 15.6257L17.3732 15.6595C17.1965 16.0704 16.9877 16.5562 17.0001 17.0101C17.0121 17.3691 17.1088 17.7397 17.2693 18.0599C17.3974 18.3157 17.574 18.5411 17.8201 18.7048C18.06 18.8643 18.4248 19.0048 18.9998 19.0048C19.5748 19.0048 19.9396 18.8643 20.1795 18.7048C20.4256 18.5411 20.6022 18.3156 20.7304 18.0599C20.8909 17.7397 20.9876 17.3691 20.9996 17.01C21.0121 16.5563 20.8032 16.0705 20.6265 15.6597L20.6119 15.6257Z" fill="#3498db"/>
  <path d="M14.1296 11.5308C14.8899 11.2847 15.4728 12.076 15.1153 12.7892C14.952 13.1151 14.7683 13.3924 14.4031 13.5214C13.426 13.8666 12.6166 14.3527 11.7715 14.8679L11.6874 14.9192C10.6044 15.5799 9.40516 16.3115 7.82074 16.5749C6.17735 16.8481 4.23604 16.6066 1.62884 15.5661C1.11608 15.3615 0.866688 14.7809 1.07181 14.2694C1.27694 13.7578 1.8589 13.509 2.37167 13.7137C4.76436 14.6685 6.32297 14.8012 7.49201 14.6069C8.67889 14.4096 9.58374 13.8634 10.7286 13.1654C11.8166 12.5021 12.9363 11.9171 14.1296 11.5308Z" fill="#3498db"/>
</svg>
`;

// Global State
let sensors = [];
let tempChart = null;
let humidityChart = null;
const palette = ['#c01754', '#2ca02c', '#3498db', '#f39c12', '#9b59b6', '#1abc9c', '#d35400'];

// Open-Meteo API Caching
let lastCurrentWeather = null;
let lastCurrentWeatherTime = 0;
const weatherHistoryCache = {};

document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initDateSelectors();
  loadCurrentData();
  
  // Refresh current data every 60 seconds
  setInterval(loadCurrentData, 60000);
});

// 1. Navigation Tabs Setup
function initTabs() {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
      
      btn.classList.add("active");
      const tabId = btn.getAttribute("data-tab");
      document.getElementById(`tab-${tabId}`).classList.add("active");
      
      if (tabId === "history") {
        // Redraw/Initialize charts when history pane is loaded
        loadHistoryData();
      }
    });
  });
}

// 2. Date Selection Logic
function initDateSelectors() {
  const rangeSelect = document.getElementById("history-range-select");
  const customInputs = document.getElementById("custom-date-inputs");
  const startInput = document.getElementById("start-date");
  const endInput = document.getElementById("end-date");
  const applyBtn = document.getElementById("apply-custom-dates");

  // Set default custom dates to last 2 days
  const now = new Date();
  const twoDaysAgo = new Date(now.getTime() - (2 * 24 * 60 * 60 * 1000));
  
  // Format for datetime-local input (YYYY-MM-DDThh:mm)
  const formatDateTimeLocal = (date) => {
    const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, 16);
    return localISOTime;
  };

  startInput.value = formatDateTimeLocal(twoDaysAgo);
  endInput.value = formatDateTimeLocal(now);

  rangeSelect.addEventListener("change", () => {
    if (rangeSelect.value === "custom") {
      customInputs.classList.remove("hidden");
    } else {
      customInputs.classList.add("hidden");
      loadHistoryData();
    }
  });

  applyBtn.addEventListener("click", loadHistoryData);
}

// Helper: Format UNIX timestamp to local human-readable time
function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

// Helper: Format UNIX timestamp to YYYY-MM-DD in local time
function formatDateISO(timestamp) {
  const date = new Date(timestamp * 1000);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// 3. Fetch Current Mesures (Temps Réel)
async function loadCurrentData() {
  const loader = document.getElementById("loading-current");
  const grid = document.getElementById("sensor-cards-grid");

  try {
    // Step 3a: Get list of sensors, excluding outside_data from Firebase keys
    if (sensors.length === 0) {
      const listResponse = await fetch(`${DB_URL}/dht_readings.json?shallow=true`);
      if (!listResponse.ok) throw new Error("Impossible de récupérer la liste des capteurs");
      const listData = await listResponse.json();
      sensors = Object.keys(listData).filter(s => s !== "outside_data");
    }

    // Step 3b: Fetch last record for each sensor in parallel + Open-Meteo current weather
    const fetches = sensors.map(async (sensor) => {
      const res = await fetch(`${DB_URL}/dht_readings/${sensor}.json?orderBy="$key"&limitToLast=1`);
      if (!res.ok) return { sensor, data: null };
      const val = await res.json();
      if (!val) return { sensor, data: null };
      
      const key = Object.keys(val)[0];
      return { sensor, data: val[key] };
    });

    const weatherFetch = async () => {
      const nowMs = Date.now();
      // Only request new current weather if cache doesn't exist or is older than 15 minutes
      if (lastCurrentWeather && (nowMs - lastCurrentWeatherTime < 15 * 60 * 1000)) {
        return lastCurrentWeather;
      }
      try {
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=48.69642424920413&longitude=2.1054503941243166&current=temperature_2m,relative_humidity_2m&timezone=auto");
        if (!res.ok) return lastCurrentWeather;
        const data = await res.json();
        lastCurrentWeather = {
          sensor: "Météo Extérieure",
          isWeatherApi: true,
          data: {
            temperature: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            timestamp: Math.floor(new Date(data.current.time).getTime() / 1000)
          }
        };
        lastCurrentWeatherTime = nowMs;
        return lastCurrentWeather;
      } catch (err) {
        console.error("Failed to fetch weather from Open-Meteo", err);
        return lastCurrentWeather; // Return stale cache if API request fails
      }
    };

    const results = await Promise.all([...fetches, weatherFetch()]);
    
    // Step 3c: Render UI
    loader.classList.add("hidden");
    grid.innerHTML = "";

    results.forEach((result) => {
      if (!result || !result.data) return;
      const { sensor, data, isWeatherApi } = result;
      
      const displayName = isWeatherApi ? "Extérieur (Météo)" : sensor;
      
      const card = document.createElement("div");
      card.className = "sensor-widget-card";
      
      const tempVal = typeof data.temperature === "number" ? data.temperature.toFixed(1) : "--";
      const humVal = typeof data.humidity === "number" ? data.humidity.toFixed(1) : "--";
      const timeStr = formatTimestamp(data.timestamp);

      card.innerHTML = `
        <div class="sensor-title ${isWeatherApi ? 'outside' : ''}">${displayName}</div>
        <div class="sensor-values-row">
          <div class="value-col">
            <div class="value-icon">${thermometerIcon}</div>
            <div class="value-num">${tempVal} °C</div>
            <div class="value-label">Température</div>
          </div>
          <div class="value-col">
            <div class="value-icon">${humidityIcon}</div>
            <div class="value-num">${humVal} %</div>
            <div class="value-label">Humidité</div>
          </div>
        </div>
        <div class="sensor-footer">
          Dernière màj : ${timeStr}
        </div>
      `;
      grid.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading current readings:", error);
    loader.innerHTML = `<p style="color: red;">Erreur : ${error.message}</p>`;
  }
}

// 4. Fetch and Plot History Data
async function loadHistoryData() {
  const rangeSelect = document.getElementById("history-range-select");
  const loader = document.getElementById("loading-history");
  
  let startTs, endTs;
  
  if (rangeSelect.value === "custom") {
    const startVal = document.getElementById("start-date").value;
    const endVal = document.getElementById("end-date").value;
    if (!startVal || !endVal) return;
    
    startTs = Math.floor(new Date(startVal).getTime() / 1000);
    endTs = Math.floor(new Date(endVal).getTime() / 1000);
  } else {
    const hours = parseInt(rangeSelect.value) * 24;
    const now = new Date();
    const past = new Date(now.getTime() - (hours * 60 * 60 * 1000));
    
    startTs = Math.floor(past.getTime() / 1000);
    endTs = Math.floor(now.getTime() / 1000);
  }

  loader.classList.remove("hidden");

  try {
    // Step 4a: Get list of sensors if not loaded
    if (sensors.length === 0) {
      const listResponse = await fetch(`${DB_URL}/dht_readings.json?shallow=true`);
      if (!listResponse.ok) throw new Error("Impossible de récupérer la liste des capteurs");
      const listData = await listResponse.json();
      sensors = Object.keys(listData).filter(s => s !== "outside_data");
    }

    // Step 4b: Query each sensor for the selected date range in Firebase
    const fetches = sensors.map(async (sensor) => {
      const url = `${DB_URL}/dht_readings/${sensor}.json?orderBy=%22$key%22&startAt=%22${startTs}%22&endAt=%22${endTs}%22`;
      const res = await fetch(url);
      if (!res.ok) return { sensor, data: [] };
      const val = await res.json();
      if (!val) return { sensor, data: [] };

      const items = Object.values(val)
        .map(d => ({
          timestamp: parseInt(d.timestamp),
          temperature: parseFloat(d.temperature),
          humidity: parseFloat(d.humidity)
        }))
        .sort((a, b) => a.timestamp - b.timestamp);

      return { sensor, data: items };
    });

    // Step 4c: Fetch historical weather from Open-Meteo (checking cache first)
    const weatherFetch = async () => {
      const cacheKey = `${startTs}_${endTs}`;
      if (weatherHistoryCache[cacheKey]) {
        return weatherHistoryCache[cacheKey];
      }
      try {
        const ninetyDaysAgo = Math.floor(Date.now() / 1000) - (90 * 24 * 60 * 60);
        const isArchive = startTs < ninetyDaysAgo;
        const baseUrl = isArchive ? "https://archive-api.open-meteo.com/v1/archive" : "https://api.open-meteo.com/v1/forecast";
        
        const weatherUrl = `${baseUrl}?latitude=48.69642424920413&longitude=2.1054503941243166&start_date=${formatDateISO(startTs)}&end_date=${formatDateISO(endTs)}&hourly=temperature_2m,relative_humidity_2m&timezone=auto`;
        const res = await fetch(weatherUrl);
        if (!res.ok) return null;
        const data = await res.json();
        
        // Cache the weather data in memory
        weatherHistoryCache[cacheKey] = data;
        return data;
      } catch (err) {
        console.error("Failed to fetch historical weather", err);
        return null;
      }
    };

    const [results, weatherData] = await Promise.all([Promise.all(fetches), weatherFetch()]);
    loader.classList.add("hidden");

    // Step 4d: Prepare Series for ApexCharts
    const tempSeries = [];
    const humiditySeries = [];

    // Add sensor data
    results.forEach(({ sensor, data }) => {
      const tempData = [];
      const humData = [];

      data.forEach(item => {
        const ms = item.timestamp * 1000;
        if (!isNaN(item.temperature)) tempData.push([ms, item.temperature]);
        if (!isNaN(item.humidity)) humData.push([ms, item.humidity]);
      });

      tempSeries.push({
        name: sensor,
        data: tempData
      });

      humiditySeries.push({
        name: sensor,
        data: humData
      });
    });

    // Add Open-Meteo comparison data
    if (weatherData && weatherData.hourly) {
      const hourly = weatherData.hourly;
      const tempData = [];
      const humData = [];

      for (let i = 0; i < hourly.time.length; i++) {
        const ms = new Date(hourly.time[i]).getTime();
        // Only include weather data within the selected time window to align charts
        const tsSec = ms / 1000;
        if (tsSec >= startTs && tsSec <= endTs) {
          if (hourly.temperature_2m && hourly.temperature_2m[i] !== undefined) {
            tempData.push([ms, hourly.temperature_2m[i]]);
          }
          if (hourly.relative_humidity_2m && hourly.relative_humidity_2m[i] !== undefined) {
            humData.push([ms, hourly.relative_humidity_2m[i]]);
          }
        }
      }

      tempSeries.push({
        name: "Extérieur (Météo)",
        data: tempData
      });

      humiditySeries.push({
        name: "Extérieur (Météo)",
        data: humData
      });
    }

    // Step 4e: Draw or Update Charts
    updateCharts(tempSeries, humiditySeries);

  } catch (error) {
    console.error("Error loading historical data:", error);
    loader.innerHTML = `<p style="color: red;">Erreur : ${error.message}</p>`;
  }
}

// 5. Render/Update ApexCharts
function updateCharts(tempSeries, humiditySeries) {
  const chartOptions = {
    chart: {
      type: 'line',
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      },
      animations: {
        enabled: false // Disable animation for performance with larger datasets
      }
    },
    colors: palette,
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2.5
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false, // Show in local time
      }
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy HH:mm:ss'
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center'
    }
  };

  // Temperature Chart
  if (tempChart) {
    tempChart.updateSeries(tempSeries);
  } else {
    const tempOptions = {
      ...chartOptions,
      series: tempSeries,
      yaxis: {
        title: { text: 'Température (°C)' }
      }
    };
    tempChart = new ApexCharts(document.querySelector("#temp-chart"), tempOptions);
    tempChart.render();
  }

  // Humidity Chart
  if (humidityChart) {
    humidityChart.updateSeries(humiditySeries);
  } else {
    const humidityOptions = {
      ...chartOptions,
      series: humiditySeries,
      yaxis: {
        title: { text: 'Humidité (%)' }
      }
    };
    humidityChart = new ApexCharts(document.querySelector("#humidity-chart"), humidityOptions);
    humidityChart.render();
  }
}
