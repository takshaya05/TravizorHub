import React, { useState, useEffect } from "react";
import { Plane, Search, X} from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import countriesData from "./CountriesData.json";

const DashboardContent = () => {

const countries = countriesData.map(c => c.country);

const topics = [
"Transportation",
"Safety and security",
"Entry and exit requirements",
"Health",
"Laws and culture",
"Natural disasters and climate"
];

const touristPlacesData = {
India: ["Taj Mahal","Jaipur","Goa","Kerala Backwaters","Varanasi","Leh Ladakh","Mysore Palace","Hampi","Rishikesh","Andaman Islands"],
USA: ["Grand Canyon","Statue of Liberty","Yellowstone","Las Vegas","Disney World","San Francisco","Niagara Falls","Hawaii","New York City","Los Angeles"],
UK: ["London","Stonehenge","Edinburgh","Lake District","Oxford","Cambridge","Bath","Liverpool","York","Windsor Castle"],
Australia: ["Sydney Opera House","Great Barrier Reef","Uluru","Melbourne","Gold Coast","Tasmania","Brisbane","Perth","Blue Mountains","Bondi Beach"],
Canada: ["Niagara Falls","Banff National Park","Toronto","Vancouver","Quebec City","Montreal","Jasper","Ottawa","Whistler","Calgary"]
};

const countryCodes = {
India: "IN",
USA: "US",
UK: "GB",
Australia: "AU",
Canada: "CA"
};

const riskColors = {
Low: "#22c55e",
Medium: "#eab308",
High: "#f97316",
Danger: "#ef4444"
};

const [searchQuery, setSearchQuery] = useState("");
const [suggestions, setSuggestions] = useState([]);
const [searchResults, setSearchResults] = useState(null);
const [loading, setLoading] = useState(false);
const [waiting, setWaiting] = useState(false);

const [selectedCountry, setSelectedCountry] = useState(null);
const [riskScore, setRiskScore] = useState(null);
const [emergency, setEmergency] = useState(null);

const [geoData, setGeoData] = useState(null);
const [riskMap, setRiskMap] = useState({});
const [hovered, setHovered] = useState(null);

const [homeCountry, setHomeCountry] = useState("");
const [destinationCountry, setDestinationCountry] = useState("");
const [selectedTopic, setSelectedTopic] = useState("All Topics");
const [comparisonTable, setComparisonTable] = useState([]);

const [checklist, setChecklist] = useState([]);
const [newItem, setNewItem] = useState("");

const [lawData, setLawData] = useState([]);
const [selectedTouristCountry, setSelectedTouristCountry] = useState(null);

const [showMap, setShowMap] = useState(false);

useEffect(() => {
const saved = localStorage.getItem("travelChecklist");
setChecklist(saved ? JSON.parse(saved) : [
{ name: "Passport", checked: false },
{ name: "Visa", checked: false }
]);

fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
.then(res => res.json())
.then(data => {
setGeoData(data);
let temp = {};
for (let f of data.features) {
temp[f.properties.name] = ["Low", "Medium", "High", "Danger"][Math.floor(Math.random() * 4)];
}
setRiskMap(temp);
});
}, []);

useEffect(() => {
localStorage.setItem("travelChecklist", JSON.stringify(checklist));
}, [checklist]);

const handleSearchInput = (val) => {
setSearchQuery(val);
if (!val) {
setSuggestions([]);
return;
}
setSuggestions(countries.filter(c => c.toLowerCase().includes(val.toLowerCase())));
};

const handleSuggestionClick = (c) => {
setSearchQuery(c);
setSuggestions([]);
handleSearch(c);
};

const handleSearch = (customQuery) => {
const q = customQuery || searchQuery;
if (!q.trim()) return;

setLoading(true);
setWaiting(true);
setSearchResults(null);
setRiskScore(null);
setEmergency(null);
setSuggestions([]);
setLawData([]);

setTimeout(() => setWaiting(false), 500);

const result = countriesData.find(c =>
c.country.toLowerCase() === q.toLowerCase()
);

if (result) {
setSearchResults(result);
setSelectedCountry(result.country);
setEmergency(result.emergency_contacts);
setRiskScore({
score: Math.floor(Math.random() * 100),
category: result.risk_level
});

if (result.law_simplified) {
const formatted = topics.map(t => ({
topic: t,
point: result.law_simplified[t] || "No data"
}));
setLawData(formatted);
} else {
setLawData(topics.map(t => ({ topic: t, point: "No data" })));
}
}

setLoading(false);
};

const handleCompare = () => {
if (!homeCountry || !destinationCountry) return;

const home = countriesData.find(c => c.country === homeCountry);
const dest = countriesData.find(c => c.country === destinationCountry);

let selectedTopics = selectedTopic === "All Topics" ? topics : [selectedTopic];

let rows = selectedTopics.map(t => {
const homeLaw = home?.law_simplified?.[t] || "No data";
const destLaw = dest?.law_simplified?.[t] || "No data";

let diff = "Similar";
if (homeLaw !== destLaw) {
diff = `Different rules: ${homeLaw.substring(0,50)} vs ${destLaw.substring(0,50)}`;
}

return {
topic: t,
home: homeLaw,
destination: destLaw,
difference: diff
};
});

setComparisonTable(rows);
};

const toggleChecklist = (i) => {
const updated = [...checklist];
updated[i].checked = !updated[i].checked;
setChecklist(updated);
};

const addItem = () => {
if (!newItem.trim()) return;
setChecklist([...checklist, { name: newItem, checked: false }]);
setNewItem("");
};

const removeItem = (i) => {
setChecklist(checklist.filter((_, idx) => idx !== i));
};

const styleFeature = (feature) => {
const name = feature.properties.name;
const risk = riskMap[name] || "Low";
return { fillColor: riskColors[risk], weight: 0.5, color: "#222", fillOpacity: 0.7 };
};

const onEachCountry = (feature, layer) => {
layer.on({
click: () => handleSuggestionClick(feature.properties.name),
mouseover: (e) => {
setHovered({ name: feature.properties.name, risk: riskMap[feature.properties.name] });
e.target.setStyle({ weight: 2 });
},
mouseout: (e) => {
setHovered(null);
e.target.setStyle({ weight: 0.5 });
}
});
};

return (
<div className="min-h-screen bg-[#0b1924] text-white p-6 flex flex-col gap-8 overflow-y-auto max-h-screen">

<h1 className="text-2xl flex items-center gap-2">
<Plane /> Travel Intelligence Dashboard
</h1>

<p className="text-sm text-gray-300">
Search any country to explore laws, risks, emergency info and travel details.
</p>

<div className="relative bg-white/5 border border-white/10 p-4 rounded-xl">
<div className="flex">
<input
value={searchQuery}
onChange={(e) => handleSearchInput(e.target.value)}
onKeyDown={(e) => e.key === "Enter" && handleSearch()}
placeholder="Search country..."
className="w-full p-2 bg-transparent border border-white/20 rounded-l"
/>
<button onClick={() => handleSearch()} className="px-3 bg-blue-500 rounded-r">
<Search size={18} />
</button>
<button onClick={() => setSearchQuery("")} className="ml-2 px-3 border border-white/20 rounded">
<X size={16} />
</button>
</div>

{suggestions.length > 0 && (
<div className="absolute w-full bg-[#0b1924] mt-1 border border-white/10 rounded z-50">
{suggestions.map((c, i) => (
<div key={i} onClick={() => handleSuggestionClick(c)} className="p-2 hover:bg-white/10 cursor-pointer">
{c}
</div>
))}
</div>
)}
</div>

{waiting && <p className="text-yellow-400">Processing...</p>}
{loading && <p className="text-blue-400">Loading...</p>}

{searchResults && (
<div className="bg-white/5 border border-white/10 p-4 rounded-xl">
<h2 className="flex items-center gap-2">
<ReactCountryFlag countryCode={countryCodes[selectedCountry]} svg />
{searchResults.country}
</h2>
<p>{searchResults.location_summary}</p>
<p>Currency: {searchResults.currency} ({searchResults.currency_code})</p>
<p>Capital: {searchResults.capital}</p>
<p>Language: {searchResults.language}</p>
<p>Risk: {searchResults.risk_level}</p>
<p>{searchResults.visa_rules}</p>
<p>{searchResults.safety_advice}</p>
<p>Best Time to Travel: {searchResults.best_time_to_travel}</p>
<ul className="mt-2 list-disc pl-5">
{searchResults.travel_tips?.map((t, i) => <li key={i}>{t}</li>)}
</ul>
</div>
)}

<div className="grid md:grid-cols-3 gap-4">
<div className="bg-white/5 border border-white/10 p-4 rounded-xl">
<h2>Risk Score</h2>
{riskScore && <p>{riskScore.score} - {riskScore.category}</p>}
</div>

<div className="bg-white/5 border border-white/10 p-4 rounded-xl">
<h2>Best Time to Travel</h2>
{searchResults && <p>{searchResults.best_time_to_travel}</p>}
</div>

<div className="bg-white/5 border border-white/10 p-4 rounded-xl">
<h2>Emergency Contacts</h2>
{emergency && (
<div>
<p>Police: {emergency.police}</p>
<p>Ambulance: {emergency.ambulance}</p>
<p>Embassy: {emergency.embassy_general}</p>
</div>
)}
</div>
</div>

<div className="bg-white/5 border border-white/10 p-4 rounded-xl">
<h2>Smart Law Simplifier</h2>
{lawData.length > 0 && lawData.map((section, i) => (
<div key={i} className="mb-3">
<h3 className="font-semibold">{section.topic}</h3>
<ul className="list-disc pl-5">
<li>{section.point}</li>
</ul>
</div>
))}
</div>

<div className="bg-white/5 border border-white/10 p-4 rounded-xl">
<h2>Law Comparison Table</h2>

<div className="flex gap-2 mt-2">
<select onChange={(e) => setHomeCountry(e.target.value)} className="bg-black p-2">
<option>Home</option>
{countries.map(c => <option key={c}>{c}</option>)}
</select>

<select onChange={(e) => setDestinationCountry(e.target.value)} className="bg-black p-2">
<option>Destination</option>
{countries.map(c => <option key={c}>{c}</option>)}
</select>

<select onChange={(e) => setSelectedTopic(e.target.value)} className="bg-black p-2">
<option>All Topics</option>
{topics.map(t => <option key={t}>{t}</option>)}
</select>

<button onClick={handleCompare} className="bg-blue-500 px-3 rounded">Compare</button>
</div>

{comparisonTable.length > 0 && (
<div className="overflow-x-auto mt-4">
<table className="w-full border border-white/20">
<thead>
<tr>
<th className="border p-2">Legal Topic / Rule</th>
<th className="border p-2">{homeCountry}</th>
<th className="border p-2">{destinationCountry}</th>
<th className="border p-2">Differences / Restrictions / Penalties</th>
</tr>
</thead>
<tbody>
{comparisonTable.map((row, i) => (
<tr key={i}>
<td className="border p-2">{row.topic}</td>
<td className="border p-2">{row.home}</td>
<td className="border p-2">{row.destination}</td>
<td className="border p-2">{row.difference}</td>
</tr>
))}
</tbody>
</table>
</div>
)}
</div>

<div className="bg-white/5 border border-white/10 p-4 rounded-xl">
<h2>Tourist Places</h2>

<p className="text-sm text-gray-300 mb-3">
Click on a country name to view tourist places of that country.
</p>

<div className="flex gap-4 mb-4">
{Object.keys(touristPlacesData).map((country, i) => (
<button
key={i}
onClick={() => setSelectedTouristCountry(selectedTouristCountry === country ? null : country)}
className="px-3 py-1 border border-white/20 rounded"
>
{country}
</button>
))}
</div>

{selectedTouristCountry && (
<div>
<h3 className="font-semibold mb-2">{selectedTouristCountry}</h3>
<ul className="list-disc pl-4">
{touristPlacesData[selectedTouristCountry].map((place, idx) => (
<li key={idx}>{place}</li>
))}
</ul>
</div>
)}

<div className="mt-6">
<h2>Checklist</h2>
<div className="flex gap-2 mb-3">
<input value={newItem} onChange={(e) => setNewItem(e.target.value)} className="bg-transparent border p-1" />
<button onClick={addItem} className="bg-green-500 px-2">Add</button>
</div>

{checklist.map((item, i) => (
<div key={i} className="flex justify-between">
<div onClick={() => toggleChecklist(i)} className="flex gap-2 cursor-pointer">
<input type="checkbox" checked={item.checked} readOnly />
<span>{item.name}</span>
</div>
<button onClick={() => removeItem(i)} className="text-red-400">Remove</button>
</div>
))}
</div>
</div>

<div className="bg-white/5 border border-white/10 p-4 rounded-xl">
<h2>Travel Risk Map</h2>

<button
onClick={() => setShowMap(!showMap)}
className="mt-2 mb-2 px-3 py-1 bg-blue-500 rounded"
>
Click here to view map
</button>

<p className="text-sm text-gray-300 mt-1">
Click the button above to view the world risk map.
</p>

{showMap && (
<div className="mt-4 rounded-xl overflow-hidden relative">
<MapContainer center={[20, 0]} zoom={2} style={{ height: "400px" }}>
<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
{geoData && <GeoJSON data={geoData} style={styleFeature} onEachFeature={onEachCountry} />}
</MapContainer>

{hovered && (
<div className="absolute top-3 left-3 bg-black/70 p-2 rounded text-sm">
{hovered.name} - {hovered.risk}
</div>
)}
</div>
)}
</div>

</div>
);
};

export default DashboardContent;