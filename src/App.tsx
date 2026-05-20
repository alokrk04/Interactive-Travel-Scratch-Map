import { useState, useEffect, useCallback } from "react";
import WorldMap from "react-svg-worldmap";
import confetti from "canvas-confetti";
import type { DataItem } from "react-svg-worldmap";
import { CheckCircle2, Trash2, Search, Globe2, RefreshCw, Award, MapPin } from "lucide-react";
import { cn } from "./utils/cn";

interface Country {
  code: string;
  name: string;
}

interface VisitDate {
  [key: string]: string;
}

const allCountries: Country[] = [
  { code: "AD", name: "Andorra" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "AF", name: "Afghanistan" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AI", name: "Anguilla" },
  { code: "AL", name: "Albania" },
  { code: "AM", name: "Armenia" },
  { code: "AO", name: "Angola" },
  { code: "AQ", name: "Antarctica" },
  { code: "AR", name: "Argentina" },
  { code: "AS", name: "American Samoa" },
  { code: "AT", name: "Austria" },
  { code: "AU", name: "Australia" },
  { code: "AW", name: "Aruba" },
  { code: "AX", name: "Åland Islands" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BB", name: "Barbados" },
  { code: "BD", name: "Bangladesh" },
  { code: "BE", name: "Belgium" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BG", name: "Bulgaria" },
  { code: "BH", name: "Bahrain" },
  { code: "BI", name: "Burundi" },
  { code: "BJ", name: "Benin" },
  { code: "BL", name: "Saint Barthélemy" },
  { code: "BM", name: "Bermuda" },
  { code: "BN", name: "Brunei" },
  { code: "BO", name: "Bolivia" },
  { code: "BQ", name: "Caribbean Netherlands" },
  { code: "BR", name: "Brazil" },
  { code: "BS", name: "Bahamas" },
  { code: "BT", name: "Bhutan" },
  { code: "BV", name: "Bouvet Island" },
  { code: "BW", name: "Botswana" },
  { code: "BY", name: "Belarus" },
  { code: "BZ", name: "Belize" },
  { code: "CA", name: "Canada" },
  { code: "CC", name: "Cocos Islands" },
  { code: "CD", name: "DR Congo" },
  { code: "CF", name: "Central African Republic" },
  { code: "CG", name: "Republic of the Congo" },
  { code: "CH", name: "Switzerland" },
  { code: "CI", name: "Côte d'Ivoire" },
  { code: "CK", name: "Cook Islands" },
  { code: "CL", name: "Chile" },
  { code: "CM", name: "Cameroon" },
  { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" },
  { code: "CR", name: "Costa Rica" },
  { code: "CU", name: "Cuba" },
  { code: "CV", name: "Cape Verde" },
  { code: "CW", name: "Curaçao" },
  { code: "CX", name: "Christmas Island" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czechia" },
  { code: "DE", name: "Germany" },
  { code: "DJ", name: "Djibouti" },
  { code: "DK", name: "Denmark" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "DZ", name: "Algeria" },
  { code: "EC", name: "Ecuador" },
  { code: "EE", name: "Estonia" },
  { code: "EG", name: "Egypt" },
  { code: "EH", name: "Western Sahara" },
  { code: "ER", name: "Eritrea" },
  { code: "ES", name: "Spain" },
  { code: "ET", name: "Ethiopia" },
  { code: "FI", name: "Finland" },
  { code: "FJ", name: "Fiji" },
  { code: "FK", name: "Falkland Islands" },
  { code: "FM", name: "Micronesia" },
  { code: "FO", name: "Faroe Islands" },
  { code: "FR", name: "France" },
  { code: "GA", name: "Gabon" },
  { code: "GB", name: "United Kingdom" },
  { code: "GD", name: "Grenada" },
  { code: "GE", name: "Georgia" },
  { code: "GF", name: "French Guiana" },
  { code: "GG", name: "Guernsey" },
  { code: "GH", name: "Ghana" },
  { code: "GI", name: "Gibraltar" },
  { code: "GL", name: "Greenland" },
  { code: "GM", name: "Gambia" },
  { code: "GN", name: "Guinea" },
  { code: "GP", name: "Guadeloupe" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "GR", name: "Greece" },
  { code: "GS", name: "South Georgia" },
  { code: "GT", name: "Guatemala" },
  { code: "GU", name: "Guam" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HK", name: "Hong Kong" },
  { code: "HM", name: "Heard Island" },
  { code: "HN", name: "Honduras" },
  { code: "HR", name: "Croatia" },
  { code: "HT", name: "Haiti" },
  { code: "HU", name: "Hungary" },
  { code: "ID", name: "Indonesia" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "IM", name: "Isle of Man" },
  { code: "IN", name: "India" },
  { code: "IO", name: "British Indian Ocean Territory" },
  { code: "IQ", name: "Iraq" },
  { code: "IR", name: "Iran" },
  { code: "IS", name: "Iceland" },
  { code: "IT", name: "Italy" },
  { code: "JE", name: "Jersey" },
  { code: "JM", name: "Jamaica" },
  { code: "JO", name: "Jordan" },
  { code: "JP", name: "Japan" },
  { code: "KE", name: "Kenya" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "KH", name: "Cambodia" },
  { code: "KI", name: "Kiribati" },
  { code: "KM", name: "Comoros" },
  { code: "KN", name: "Saint Kitts and Nevis" },
  { code: "KP", name: "North Korea" },
  { code: "KR", name: "South Korea" },
  { code: "KW", name: "Kuwait" },
  { code: "KY", name: "Cayman Islands" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "LA", name: "Laos" },
  { code: "LB", name: "Lebanon" },
  { code: "LC", name: "Saint Lucia" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LK", name: "Sri Lanka" },
  { code: "LR", name: "Liberia" },
  { code: "LS", name: "Lesotho" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "LV", name: "Latvia" },
  { code: "LY", name: "Libya" },
  { code: "MA", name: "Morocco" },
  { code: "MC", name: "Monaco" },
  { code: "MD", name: "Moldova" },
  { code: "ME", name: "Montenegro" },
  { code: "MF", name: "Saint Martin" },
  { code: "MG", name: "Madagascar" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MK", name: "North Macedonia" },
  { code: "ML", name: "Mali" },
  { code: "MM", name: "Myanmar" },
  { code: "MN", name: "Mongolia" },
  { code: "MO", name: "Macao" },
  { code: "MP", name: "Northern Mariana Islands" },
  { code: "MQ", name: "Martinique" },
  { code: "MR", name: "Mauritania" },
  { code: "MS", name: "Montserrat" },
  { code: "MT", name: "Malta" },
  { code: "MU", name: "Mauritius" },
  { code: "MV", name: "Maldives" },
  { code: "MW", name: "Malawi" },
  { code: "MX", name: "Mexico" },
  { code: "MY", name: "Malaysia" },
  { code: "MZ", name: "Mozambique" },
  { code: "NA", name: "Namibia" },
  { code: "NC", name: "New Caledonia" },
  { code: "NE", name: "Niger" },
  { code: "NF", name: "Norfolk Island" },
  { code: "NG", name: "Nigeria" },
  { code: "NI", name: "Nicaragua" },
  { code: "NL", name: "Netherlands" },
  { code: "NO", name: "Norway" },
  { code: "NP", name: "Nepal" },
  { code: "NR", name: "Nauru" },
  { code: "NU", name: "Niue" },
  { code: "NZ", name: "New Zealand" },
  { code: "OM", name: "Oman" },
  { code: "PA", name: "Panama" },
  { code: "PE", name: "Peru" },
  { code: "PF", name: "French Polynesia" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PH", name: "Philippines" },
  { code: "PK", name: "Pakistan" },
  { code: "PL", name: "Poland" },
  { code: "PM", name: "Saint Pierre and Miquelon" },
  { code: "PN", name: "Pitcairn Islands" },
  { code: "PR", name: "Puerto Rico" },
  { code: "PS", name: "Palestine" },
  { code: "PT", name: "Portugal" },
  { code: "PW", name: "Palau" },
  { code: "PY", name: "Paraguay" },
  { code: "QA", name: "Qatar" },
  { code: "RE", name: "Réunion" },
  { code: "RO", name: "Romania" },
  { code: "RS", name: "Serbia" },
  { code: "RU", name: "Russia" },
  { code: "RW", name: "Rwanda" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SB", name: "Solomon Islands" },
  { code: "SC", name: "Seychelles" },
  { code: "SD", name: "Sudan" },
  { code: "SE", name: "Sweden" },
  { code: "SG", name: "Singapore" },
  { code: "SH", name: "Saint Helena" },
  { code: "SI", name: "Slovenia" },
  { code: "SJ", name: "Svalbard and Jan Mayen" },
  { code: "SK", name: "Slovakia" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SM", name: "San Marino" },
  { code: "SN", name: "Senegal" },
  { code: "SO", name: "Somalia" },
  { code: "SR", name: "Suriname" },
  { code: "SS", name: "South Sudan" },
  { code: "ST", name: "São Tomé and Príncipe" },
  { code: "SV", name: "El Salvador" },
  { code: "SX", name: "Sint Maarten" },
  { code: "SY", name: "Syria" },
  { code: "SZ", name: "Eswatini" },
  { code: "TC", name: "Turks and Caicos Islands" },
  { code: "TD", name: "Chad" },
  { code: "TF", name: "French Southern Territories" },
  { code: "TG", name: "Togo" },
  { code: "TH", name: "Thailand" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TK", name: "Tokelau" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TM", name: "Turkmenistan" },
  { code: "TN", name: "Tunisia" },
  { code: "TO", name: "Tonga" },
  { code: "TR", name: "Turkey" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TV", name: "Tuvalu" },
  { code: "TW", name: "Taiwan" },
  { code: "TZ", name: "Tanzania" },
  { code: "UA", name: "Ukraine" },
  { code: "UG", name: "Uganda" },
  { code: "UM", name: "U.S. Minor Outlying Islands" },
  { code: "US", name: "United States" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VA", name: "Vatican City" },
  { code: "VC", name: "Saint Vincent and the Grenadines" },
  { code: "VE", name: "Venezuela" },
  { code: "VG", name: "British Virgin Islands" },
  { code: "VI", name: "U.S. Virgin Islands" },
  { code: "VN", name: "Vietnam" },
  { code: "VU", name: "Vanuatu" },
  { code: "WF", name: "Wallis and Futuna" },
  { code: "WS", name: "Samoa" },
  { code: "YE", name: "Yemen" },
  { code: "YT", name: "Mayotte" },
  { code: "ZA", name: "South Africa" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
  // Additional countries to reach 197
  { code: "XK", name: "Kosovo" },
  { code: "TW", name: "Taiwan" }, // Alternative entry
];

const TOTAL_COUNTRIES = allCountries.length;
const STORAGE_KEY = "scratchmap-visited";
const DATES_KEY = "scratchmap-dates";

function App() {
  const [visited, setVisited] = useState<string[]>([]);
  const [visitDates, setVisitDates] = useState<VisitDate>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // Load from localStorage
  useEffect(() => {
    const savedVisited = localStorage.getItem(STORAGE_KEY);
    const savedDates = localStorage.getItem(DATES_KEY);

    if (savedVisited) {
      setVisited(JSON.parse(savedVisited));
    }
    if (savedDates) {
      setVisitDates(JSON.parse(savedDates));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visited));
  }, [visited]);

  useEffect(() => {
    localStorage.setItem(DATES_KEY, JSON.stringify(visitDates));
  }, [visitDates]);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const markVisited = useCallback((countryCode: string, countryName: string) => {
    const upperCode = countryCode.toUpperCase();
    if (visited.includes(upperCode)) {
      showToast(`${countryName} is already scratched off!`, "error");
      return;
    }

    const newVisited = [...visited, upperCode];
    setVisited(newVisited);

    const today = new Date().toISOString().split("T")[0];
    setVisitDates(prev => ({ ...prev, [upperCode]: today }));

    // Confetti celebration
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#10b981", "#22d3ee", "#eab308"],
    });

    showToast(`🎉 ${countryName} scratched off the map!`);

    // Clear selection
    setSelectedCountry(null);
  }, [visited]);

  const unmarkVisited = useCallback((countryCode: string) => {
    const upperCode = countryCode.toUpperCase();
    setVisited(prev => prev.filter(code => code !== upperCode));
    setVisitDates(prev => {
      const updated = { ...prev };
      delete updated[upperCode];
      return updated;
    });
    showToast("Country unmarked");
  }, []);

  const resetAll = () => {
    if (!confirm("Reset all progress? This cannot be undone.")) return;
    setVisited([]);
    setVisitDates({});
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DATES_KEY);
    showToast("Map reset to unexplored state");
  };

  const markRandom = () => {
    const unvisited = allCountries.filter(c => !visited.includes(c.code));
    if (unvisited.length === 0) {
      showToast("You've visited them all!", "error");
      return;
    }
    const randomIndex = Math.floor(Math.random() * unvisited.length);
    const randomCountry = unvisited[randomIndex];
    markVisited(randomCountry.code, randomCountry.name);
  };

  const visitedCount = visited.length;
  const percentage = Math.round((visitedCount / TOTAL_COUNTRIES) * 100);

  // Prepare data for the map
  const mapData: DataItem<number>[] = visited.map(code => ({
    country: code.toLowerCase(),
    value: 100,
  }));

  const stylingFunction = ({ countryValue, countryCode }: any) => {
    const isVisited = visited.includes(countryCode.toUpperCase());
    return {
      fill: isVisited ? "#10b981" : "#475569",
      fillOpacity: isVisited ? 0.85 : 0.35,
      stroke: isVisited ? "#052e16" : "#1e2937",
      strokeWidth: isVisited ? 1.2 : 0.75,
      strokeOpacity: 0.9,
      cursor: "pointer",
    };
  };

  const filteredCountries = allCountries
    .filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const visitedList = allCountries
    .filter(c => visited.includes(c.code))
    .sort((a, b) => {
      const dateA = visitDates[a.code] || "";
      const dateB = visitDates[b.code] || "";
      return dateB.localeCompare(dateA); // newest first
    });

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950 py-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
              <Globe2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">ScratchMap</h1>
              <p className="text-xs text-zinc-500 -mt-1">scratch • explore • remember</p>
            </div>
          </div>

          <div className="flex items-center gap-x-6">
            <div className="flex items-center gap-x-2 bg-zinc-900 rounded-3xl px-5 py-2 text-sm border border-zinc-800">
              <div className="px-3 py-0.5 bg-emerald-500 text-emerald-950 rounded-3xl font-semibold flex items-center gap-x-1">
                <Award className="w-3.5 h-3.5" />
                {percentage}%
              </div>
              <span className="text-zinc-400 hidden sm:inline">coverage</span>
            </div>

            <button
              onClick={resetAll}
              className="flex items-center gap-x-2 px-4 py-2 text-sm rounded-2xl border border-zinc-700 hover:bg-zinc-900 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl w-full mx-auto px-6 lg:px-8 py-6 flex gap-6 flex-1 min-h-0">

        {/* Left Sidebar - Stats */}
        <div className="w-72 flex-shrink-0 flex flex-col gap-6 overflow-y-auto custom-scroll pr-2">
          {/* Progress Circle */}
          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 flex flex-col items-center">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full -rotate-12" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#27272a" strokeWidth="14" />
                <circle
                  cx="60" cy="60" r="52" fill="none" stroke="#10b981" strokeWidth="14"
                  strokeDasharray={`${percentage * 3.27} 327`}
                  strokeLinecap="round" transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-6xl font-bold text-emerald-400 tabular-nums">{visitedCount}</div>
                <div className="text-xs uppercase tracking-[2px] text-zinc-500 mt-1">of {TOTAL_COUNTRIES}</div>
                <div className="text-emerald-400/70 text-sm font-medium mt-4">COUNTRIES</div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-x-2 text-emerald-400 bg-emerald-950/60 px-6 py-2 rounded-3xl text-sm">
                <CheckCircle2 className="w-4 h-4" />
                {percentage}% SCRATCHED
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
              <div className="text-emerald-400 text-xs font-medium mb-2 flex items-center gap-x-1.5">
                <MapPin className="w-3.5 h-3.5" /> VISITED
              </div>
              <div className="text-3xl font-semibold text-white tabular-nums">{visitedCount}</div>
              <div className="text-xs text-zinc-500 mt-1">countries</div>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
              <div className="text-amber-400 text-xs font-medium mb-2 flex items-center gap-x-1.5">
                <Globe2 className="w-3.5 h-3.5" /> REMAINING
              </div>
              <div className="text-3xl font-semibold text-white tabular-nums">{TOTAL_COUNTRIES - visitedCount}</div>
              <div className="text-xs text-zinc-500 mt-1">to explore</div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-5 space-y-4">
            <button
              onClick={markRandom}
              className="w-full bg-white text-zinc-900 hover:bg-amber-300 transition-all py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-x-2 active:scale-[0.985]"
            >
              <span>✨ Surprise Me</span>
              <span className="text-lg">🎲</span>
            </button>
            <div className="text-[10px] text-center text-zinc-500">
              Click countries on the map or use search
            </div>
          </div>
        </div>

        {/* Main Map Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-2 shadow-2xl flex-1 flex flex-col overflow-hidden relative">

            {/* Top Left Badge */}
            <div className="absolute top-6 left-6 z-20 bg-black/70 text-xs px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-x-2 backdrop-blur">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              INTERACTIVE WORLD MAP
            </div>

            {/* Top Right Legend */}
            <div className="absolute top-6 right-6 z-20 bg-black/70 border border-zinc-700 text-xs px-5 py-3 rounded-2xl flex items-center gap-3 backdrop-blur shadow-lg">
              <div className="flex items-center gap-x-2">
                <div className="w-3 h-3 rounded bg-emerald-500"></div>
                <span className="text-emerald-300">Scratched</span>
              </div>
              <div className="h-3 w-px bg-zinc-700"></div>
              <div className="flex items-center gap-x-2">
                <div className="w-3 h-3 rounded bg-slate-600"></div>
                <span className="text-slate-400">Unexplored</span>
              </div>
            </div>

            {/* Map Canvas */}
            <div className="flex-1 w-full h-full flex items-center justify-center p-4" style={{ background: 'radial-gradient(circle at center, #18181b 0%, #09090b 70%)' }}>
              <div className="w-full h-full">
                <WorldMap
                  data={mapData}
                  size="responsive"
                  styleFunction={stylingFunction}
                  backgroundColor="transparent"
                  title=""
                  onClickFunction={({ countryCode }) => {
                    const country = allCountries.find(c => c.code === countryCode.toUpperCase());
                    if (country) {
                      markVisited(country.code, country.name);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="text-center text-zinc-500 text-xs mt-3 flex items-center justify-center gap-x-5 flex-shrink-0">
            <div className="flex items-center gap-x-1.5">
              <div className="px-2.5 py-1 bg-zinc-900 rounded">CLICK ON MAP</div>
              <span>or select from list</span>
            </div>
            <div>•</div>
            <div>Scratch countries you've visited</div>
          </div>
        </div>

        {/* Right Sidebar - Visited List */}
        <div className="w-80 flex-shrink-0 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col overflow-hidden">
          <div className="p-6 border-b border-zinc-800">
            <div className="flex justify-between items-center mb-4">
              <div className="font-semibold flex items-center gap-x-2">
                <CheckCircle2 className="text-emerald-400 w-5 h-5" />
                SCRATCHED OFF
              </div>
              <div className="text-xs font-mono bg-zinc-800 px-2.5 py-1 rounded-lg text-emerald-300">
                {visitedCount}/{TOTAL_COUNTRIES}
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search countries..."
                className="w-full bg-zinc-950 border border-zinc-700 focus:border-emerald-500 transition-colors pl-11 py-3 rounded-2xl text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto p-3 custom-scroll">
            {visitedList.length > 0 ? (
              <div className="space-y-1">
                {visitedList.map((country) => {
                  const date = visitDates[country.code];
                  const formattedDate = date
                    ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(date))
                    : 'Unknown';

                  return (
                    <div
                      key={country.code}
                      className="group bg-zinc-950 hover:bg-zinc-900 border border-transparent hover:border-zinc-700 rounded-2xl px-5 py-4 flex items-center justify-between transition-all"
                    >
                      <div className="flex items-center gap-x-4">
                        <div className="text-emerald-400">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{country.name}</div>
                          <div className="text-[10px] text-zinc-500 font-mono">{country.code} • {formattedDate}</div>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          unmarkVisited(country.code);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400 p-2 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center px-10">
                <div className="w-20 h-20 mx-auto mb-6 opacity-40">
                  <Globe2 className="w-full h-full text-zinc-600" />
                </div>
                <p className="text-zinc-400 text-lg font-light">No countries scratched yet</p>
                <p className="text-xs text-zinc-600 mt-3 leading-snug">
                  The world is waiting.<br />Start scratching off the countries you've visited
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Country Selector */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-700 rounded-3xl shadow-2xl p-2.5 flex items-center">
          <div className="flex items-center px-5 text-xs uppercase tracking-widest text-zinc-400 mr-2 font-medium">
            SELECT COUNTRY
          </div>

          <select
            value={selectedCountry?.code || ""}
            onChange={(e) => {
              const selected = allCountries.find(c => c.code === e.target.value);
              setSelectedCountry(selected || null);
            }}
            className="bg-zinc-800 border border-zinc-700 text-sm py-3 px-6 rounded-2xl focus:outline-none focus:border-emerald-500 cursor-pointer w-64 appearance-none"
          >
            <option value="">Choose a country to scratch...</option>
            {filteredCountries
              .filter(c => !visited.includes(c.code))
              .map(country => (
                <option key={country.code} value={country.code}>
                  {country.name} ({country.code})
                </option>
              ))}
          </select>

          <button
            onClick={() => {
              if (selectedCountry) markVisited(selectedCountry.code, selectedCountry.name);
            }}
            disabled={!selectedCountry}
            className="ml-3 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-800 disabled:text-zinc-500 transition-colors rounded-2xl text-sm font-semibold text-emerald-950 disabled:border-zinc-700 border border-transparent"
          >
            SCRATCH
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={cn(
            "fixed bottom-32 left-1/2 -translate-x-1/2 px-8 py-4 rounded-2xl shadow-xl flex items-center gap-x-3 text-sm z-[100] border transition-all animate-in fade-in slide-in-from-bottom-4",
            toast.type === "success"
              ? "bg-emerald-900/90 border-emerald-700 text-emerald-100 backdrop-blur-sm"
              : "bg-red-900/90 border-red-700 text-red-100 backdrop-blur-sm"
          )}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default App;
