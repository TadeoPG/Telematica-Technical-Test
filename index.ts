async function initMap() {
  const { Map } = (await google.maps.importLibrary(
    "maps"
  )) as google.maps.MapsLibrary;
  const { AdvancedMarkerElement } = (await google.maps.importLibrary(
    "marker"
  )) as google.maps.MarkerLibrary;

  const center = { lat: -12.046374, lng: -77.042793 }; // Centro de Lima
  const map = new Map(document.getElementById("map") as HTMLElement, {
    zoom: 10.4,
    center,
    mapId: "DEMO_MAP_ID",
  });

  for (const poi of pointsOfInterest) {
    const AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
      map,
      content: buildContent(poi),
      position: poi.position,
      title: poi.name,
    });

    AdvancedMarkerElement.addListener("click", () => {
      toggleHighlight(AdvancedMarkerElement, poi);
    });
  }

  const legend = document.getElementById("legend-content");
  addLegend(legend);
}

function addLegend(legend) {
  const types = [
    { type: "Hospital", color: "var(--hospital-color)" },
    { type: "Comisaría", color: "var(--police-color)" },
    { type: "Colegio", color: "var(--school-color)" },
    { type: "Área de riesgo", color: "var(--risk-area-color)" },
    { type: "Incidente delictivo", color: "var(--crime-incident-color)" },
  ];

  types.forEach((item) => {
    const div = document.createElement("div");
    div.className = "legend-item";
    div.innerHTML = `
      <span class="legend-color" style="background-color: ${item.color}"></span>
      <span class="legend-label">${item.type}</span>
    `;
    legend.appendChild(div);
  });
}

function toggleHighlight(markerView, poi) {
  if (markerView.content.classList.contains("highlight")) {
    markerView.content.classList.remove("highlight");
    markerView.zIndex = null;
  } else {
    markerView.content.classList.add("highlight");
    markerView.zIndex = 1;
  }
}

function buildContent(poi) {
  const content = document.createElement("div");
  content.classList.add("poi");
  content.innerHTML = `
    <div class="icon">
        <i aria-hidden="true" class="fa ${getIcon(poi.type)} fa-lg" title="${
    poi.type
  }"></i>
        <span class="fa-sr-only">${poi.type}</span>
    </div>
    <div class="details">
        <div class="name">${poi.name}</div>
        <div class="address">${poi.address}</div>
        <div class="type">${poi.type}</div>
        ${poi.phone ? `<div class="phone">📞 ${poi.phone}</div>` : ""}
        ${
          poi.website
            ? `<div class="website"><a href="${poi.website}" target="_blank">🌐 Sitio web</a></div>`
            : ""
        }
        ${
          poi.emergencyServices
            ? `<div class="emergency">🚑 Servicios de emergencia 24/7</div>`
            : ""
        }
        ${
          poi.specialties
            ? `<div class="specialties">🏥 Especialidades: ${poi.specialties.join(
                ", "
              )}</div>`
            : ""
        }
        ${
          poi.jurisdiction
            ? `<div class="jurisdiction">🚔 Jurisdicción: ${poi.jurisdiction}</div>`
            : ""
        }
        ${
          poi.educationLevels
            ? `<div class="education">🎓 Niveles: ${poi.educationLevels.join(
                ", "
              )}</div>`
            : ""
        }
        ${
          poi.disasterType
            ? `<div class="disaster">⚠️ Tipo de desastre: ${poi.disasterType}</div>`
            : ""
        }
        ${
          poi.riskLevel
            ? `<div class="risk">🔔 Nivel de riesgo: ${poi.riskLevel}</div>`
            : ""
        }
        ${
          poi.crimeType
            ? `<div class="crime">🚨 Tipo de delito: ${poi.crimeType}</div>`
            : ""
        }
        ${poi.date ? `<div class="date">📅 Fecha: ${poi.date}</div>` : ""}
    </div>
    `;
  return content;
}

function getIcon(type) {
  switch (type) {
    case "Hospital":
      return "fa-hospital";
    case "Comisaría":
      return "fa-building-shield";
    case "Colegio":
      return "fa-school";
    case "Área de riesgo":
      return "fa-triangle-exclamation";
    case "Incidente delictivo":
      return "fa-circle-exclamation";
    default:
      return "fa-map-marker";
  }
}

const pointsOfInterest = [
  {
    name: "Hospital Nacional Dos de Mayo",
    address: "Av. Grau 1300, Cercado de Lima 15003",
    type: "Hospital",
    phone: "(01) 328-0028",
    website: "http://www.hdosdemayo.gob.pe/",
    emergencyServices: true,
    specialties: ["Medicina Interna", "Cirugía", "Pediatría", "Ginecología"],
    position: { lat: -12.057636, lng: -77.01558 },
  },
  {
    name: "Zona de deslizamientos en Chosica",
    address: "Distrito de Lurigancho-Chosica",
    type: "Área de riesgo",
    disasterType: "Deslizamientos e inundaciones",
    riskLevel: "Alto",
    website: "https://portal.indeci.gob.pe/emergencias/",
    position: { lat: -11.943324, lng: -76.710708 },
  },
  {
    name: "Incidente de robo en Miraflores",
    address: "Calle Berlín, Miraflores",
    type: "Incidente delictivo",
    crimeType: "Robo al paso",
    date: "15/05/2023",
    position: { lat: -12.119815, lng: -77.030739 },
  },
  {
    name: "Colegio Nuestra Señora del Carmen",
    address: "Jr. Julián Piñeiro 124, Rimac 15094",
    type: "Colegio",
    phone: "(01) 381-4440",
    website: "http://www.carmelitas.edu.pe/",
    educationLevels: ["Inicial", "Primaria", "Secundaria"],
    position: { lat: -12.029978, lng: -77.023716 },
  },
  {
    name: "Comisaría de Miraflores",
    address: "Av. Arequipa 5095, Miraflores 15074",
    type: "Comisaría",
    phone: "(01) 242-4222",
    website: "https://www.policia.gob.pe/",
    jurisdiction: "Distrito de Miraflores",
    position: { lat: -12.118622, lng: -77.030303 },
  },
  {
    name: "Hospital Edgardo Rebagliati Martins",
    address: "Av. Edgardo Rebagliati 490, Jesús María 15072",
    type: "Hospital",
    phone: "(01) 265-4901",
    website: "http://www.essalud.gob.pe/hospital-rebagliati/",
    emergencyServices: true,
    specialties: ["Cardiología", "Oncología", "Neurología", "Traumatología"],
    position: { lat: -12.078091, lng: -77.039604 },
  },
  {
    name: "Colegio San Agustín",
    address: "Av. Javier Prado Este 980, San Isidro 15046",
    type: "Colegio",
    phone: "(01) 224-0361",
    website: "https://www.sanagustin.edu.pe/",
    educationLevels: ["Inicial", "Primaria", "Secundaria"],
    position: { lat: -12.090945, lng: -77.036351 },
  },
  {
    name: "Zona de riesgo sísmico en La Punta",
    address: "Distrito de La Punta, Callao",
    type: "Área de riesgo",
    disasterType: "Terremoto y tsunami",
    riskLevel: "Muy Alto",
    website: "https://www.regioncallao.gob.pe/defensa-civil/",
    position: { lat: -12.071736, lng: -77.167037 },
  },
  {
    name: "Comisaría de San Borja",
    address: "Av. San Borja Sur 1080, San Borja 15037",
    type: "Comisaría",
    phone: "(01) 225-1155",
    website: "https://www.policia.gob.pe/",
    jurisdiction: "Distrito de San Borja",
    position: { lat: -12.101635, lng: -76.995936 },
  },
  {
    name: "Incidente de asalto en San Juan de Lurigancho",
    address: "Av. Próceres de la Independencia, San Juan de Lurigancho",
    type: "Incidente delictivo",
    crimeType: "Asalto a mano armada",
    date: "03/10/2023",
    position: { lat: -11.976012, lng: -77.005945 },
  },
];

initMap();
