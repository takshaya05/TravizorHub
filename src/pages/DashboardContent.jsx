import React, { useEffect, useMemo, useState } from "react";
import { Plane } from "lucide-react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import ReactCountryFlag from "react-country-flag";
import "leaflet/dist/leaflet.css";
import countriesData from "./CountriesData.json";

const DashboardContent = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [serviceType, setServiceType] = useState("common_hotels");
  const [geoData, setGeoData] = useState(null);
  const [riskMap, setRiskMap] = useState({});
  const [showRiskMap, setShowRiskMap] = useState(false);
  const [advisory, setAdvisory] = useState({});
  const [loading, setLoading] = useState(false);

  const [home, setHome] = useState("");
  const [dest, setDest] = useState("");
  const [topic, setTopic] = useState("All");
  const [comparisonResult, setComparisonResult] = useState([]);

  const countryCodes = {
    India: "IN",
    USA: "US",
    "United Kingdom": "GB",
    Australia: "AU",
    Canada: "CA"
  };

  const topics = [
    "Visa/Permits",
    "Document Copies",
    "Vaccinations & Medications",
    "Prohibited Items",
    "Local Laws",
    "Apps & Technology",
    "Culture & Customs",
    "Safety and security",
    "Climatic Conditions"
  ];

  const countries = useMemo(
    () =>
      countriesData.map((c) => ({
        name: c.country_name,
        code: countryCodes[c.country_name] || "IN"
      })),
    []
  );

  const country = useMemo(
    () => countriesData.find((c) => c.country_name === selectedCountry),
    [selectedCountry]
  );

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
      .then((r) => r.json())
      .then((d) => {
        setGeoData(d);
        const temp = {};
        d.features.forEach((f) => {
          temp[f.properties.name] =
            ["Low", "Medium", "High"][Math.floor(Math.random() * 3)];
        });
        setRiskMap(temp);
      });
  }, []);

  const riskColors = {
    Low: "#4ade80",
    Medium: "#facc15",
    High: "#ef4444"
  };

  const services = country ? country[serviceType] || [] : [];

  const serviceMarkers = useMemo(() => {
    if (!country) return [];
    return (country[serviceType] || [])
      .map((item) => ({
        name: item.name,
        lat: item.coordinates?.[0],
        lon: item.coordinates?.[1]
      }))
      .filter((m) => typeof m.lat === "number" && typeof m.lon === "number");
  }, [country, serviceType]);

  const handleAdvisory = async () => {
    if (!country) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/advisory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: country.country_name })
      });

      const data = await res.json();
      setAdvisory(data.advisory || {});
    } catch {
      setAdvisory({});
    }

    setLoading(false);
  };

  const generateComparison = async () => {
    if (!home || !dest) return;

    try {
      const res = await fetch("http://localhost:5000/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ home, dest, topic })
      });

      const data = await res.json();
      setComparisonResult(data.result || []);
    } catch {
      setComparisonResult([]);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-[#010b13] text-[#f5f7fa]">
      <div className="p-4 border-b border-[rgba(93,125,150,0.3)] flex items-center gap-2 text-[#a4d5f1] bg-[#0b1924]">
        <Plane />
        Travel Intelligence Dashboard
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="p-4 rounded-xl bg-[rgba(93,125,150,0.3)]">
          <h2 className="text-lg font-semibold text-[#a4d5f1] mb-2">Select Country</h2>
          <select
            className="w-full p-2 rounded bg-[#010b13] text-[#f5f7fa] border border-[#5d7d96]"
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Select</option>
            {countries.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {country && (
          <div className="p-4 rounded-xl space-y-2 bg-[rgba(93,125,150,0.3)]">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-[#a4d5f1]">
              <ReactCountryFlag countryCode={countryCodes[country.country_name]} svg />
              Basic Information
            </h2>

            <p className="text-[#f5f7fa]">Capital: <span className="text-[#b3d1e2]">{country.capital}</span></p>
            <p className="text-[#f5f7fa]">Currency: <span className="text-[#bba8a1]">{country.currency}</span></p>
            <p className="text-[#f5f7fa]">Code: <span className="text-[#dfcfc9]">{country.currency_code}</span></p>
            <p className="text-[#f5f7fa]">Exchange: <span className="text-[#eecdcd]">{country.currency_value_wrt_dollar}</span></p>
            <p className="text-[#f5f7fa]">Languages: <span className="text-[#b3d1e2]">{country.common_languages.join(", ")}</span></p>
            <p className="text-[#f5f7fa]">Transport: <span className="text-[#bba8a1]">{country.common_transport.join(", ")}</span></p>
            <p className="text-[#f5f7fa]">Police: <span className="text-[#a4d5f1]">{country.emergency_contacts.police}</span></p>
            <p className="text-[#f5f7fa]">Ambulance: <span className="text-[#eecdcd]">{country.emergency_contacts.ambulance}</span></p>
            <p className="text-[#f5f7fa]">Fire: <span className="text-[#dfcfc9]">{country.emergency_contacts.fire}</span></p>
          </div>
        )}

        {country && (
          <div className="p-4 rounded-xl bg-[rgba(93,125,150,0.3)]">
            <h2 className="text-[#a4d5f1] mb-2">Services</h2>

            <select
              className="p-2 mb-3 rounded bg-[#010b13] text-[#f5f7fa] border border-[#5d7d96]"
              onChange={(e) => setServiceType(e.target.value)}
            >
              <option value="common_hotels">Hotels</option>
              <option value="common_restaurants">Restaurants</option>
              <option value="common_hospitals">Hospitals</option>
              <option value="common_banks">Banks</option>
              <option value="common_tourist_places">Tourist Places</option>
            </select>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="max-h-60 overflow-y-auto text-[#f5f7fa]">
                {services.map((s, i) => (
                  <p key={i} className="py-1 border-b border-[rgba(93,125,150,0.3)] text-[#b3d1e2]">
                    {s.name}
                  </p>
                ))}
              </div>

              <div className="h-60 rounded-xl overflow-hidden border border-[#5d7d96]">
                <MapContainer center={country.capital_coordinates} zoom={5} style={{ height: "100%", width: "100%" }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {serviceMarkers.map((m, i) => (
                    <Marker key={i} position={[m.lat, m.lon]}>
                      <Popup>{m.name}</Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 rounded-xl bg-[rgba(93,125,150,0.3)]">
          <h2 className="text-[#a4d5f1]">Risk Map</h2>

          <button onClick={() => setShowRiskMap(!showRiskMap)} className="mt-2 px-3 py-1 rounded bg-[#926a42] text-[#f5f7fa]">
            Toggle Map
          </button>

          {showRiskMap && geoData && (
            <div className="mt-4 h-96 rounded-xl overflow-hidden border border-[#5d7d96]">
              <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <GeoJSON
                  data={geoData}
                  style={(f) => ({
                    fillColor: riskColors[riskMap[f.properties.name]] || "#4ade80",
                    fillOpacity: 0.7,
                    weight: 0.5
                  })}
                />
              </MapContainer>
            </div>
          )}
        </div>

        <div className="p-4 rounded-xl bg-[rgba(93,125,150,0.3)]">
          <h2 className="text-[#a4d5f1]">Travel Advisory</h2>

          <button onClick={handleAdvisory} className="mt-2 px-3 py-1 rounded bg-[#5d7d96] text-[#f5f7fa]">
            Generate
          </button>

          {loading && <p className="text-[#dfcfc9]">Loading...</p>}

          <div className="mt-3 space-y-3 text-sm">
            {Object.entries(advisory || {}).map(([key, value]) => (
              <div key={key} className="p-3 border border-[rgba(93,125,150,0.3)] rounded">
                <div className="text-[#a4d5f1] font-semibold">{key}</div>
                <div className="text-[#b3d1e2] mt-1">{value?.summary}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl overflow-x-auto bg-[rgba(93,125,150,0.3)]">
          <h2 className="text-[#a4d5f1]">Comparison</h2>

          <div className="flex gap-2 mb-3">
            <select onChange={(e) => setHome(e.target.value)} className="p-2 bg-[#010b13] text-[#f5f7fa] border border-[#5d7d96] rounded">
              <option value="">Home</option>
              {countries.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            <select onChange={(e) => setDest(e.target.value)} className="p-2 bg-[#010b13] text-[#f5f7fa] border border-[#5d7d96] rounded">
              <option value="">Destination</option>
              {countries.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            <select onChange={(e) => setTopic(e.target.value)} className="p-2 bg-[#010b13] text-[#f5f7fa] border border-[#5d7d96] rounded">
              <option value="All">All</option>
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <button onClick={generateComparison} className="px-3 py-1 rounded bg-[#bba8a1] text-[#010b13]">
              Generate
            </button>
          </div>

          <table className="w-full border border-[rgba(93,125,150,0.3)] text-sm">
            <thead>
              <tr className="text-[#a4d5f1]">
                <th className="p-2 border border-[rgba(93,125,150,0.3)]">Topic</th>
                <th className="p-2 border border-[rgba(93,125,150,0.3)]">Home</th>
                <th className="p-2 border border-[rgba(93,125,150,0.3)]">Destination</th>
              </tr>
            </thead>
            <tbody className="text-[#f5f7fa]">
              {comparisonResult.map((r, i) => (
                <tr key={i}>
                  <td className="p-2 border border-[rgba(93,125,150,0.3)] text-[#b3d1e2]">{r.topic}</td>
                  <td className="p-2 border border-[rgba(93,125,150,0.3)] text-[#dfcfc9]">{r.home}</td>
                  <td className="p-2 border border-[rgba(93,125,150,0.3)] text-[#eecdcd]">{r.dest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;