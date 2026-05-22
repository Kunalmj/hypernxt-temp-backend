const fs = require('fs');
const path = require('path');

const files = [
  "WomenChildSchemes.jsx",
  "UtilitySchemes.jsx",
  "TravelSchemes.jsx",
  "TransportSchemes.jsx",
  "SportsSchemes.jsx",
  "SocialSchemes.jsx",
  "SkillsSchemes.jsx",
  "ScienceSchemes.jsx",
  "SafetySchemes.jsx",
  "HousingSchemes.jsx",
  "HealthSchemes.jsx",
  "BankingSchemes.jsx"
];

const dir = path.join(__dirname, 'src', 'pages');

for (const file of files) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Add CASTES if not exists
  if (!content.includes('const CASTES =')) {
    content = content.replace(
      /(const SPONSORS = .*?;)/,
      '$1\nconst CASTES = ["All Categories", "General", "SC", "ST", "OBC", "Minority"];'
    );
  }

  // Update initial state
  if (!content.includes('caste: "All Categories"')) {
    content = content.replace(
      /sponsor: "All Sponsors",\s*\}\);/,
      'sponsor: "All Sponsors",\n    caste: "All Categories",\n  });'
    );
  }

  // Update Reset Filters
  if (content.includes('setFilters({ state: "All States", beneficiaryType: "All Beneficiaries", gender: "All Genders", sponsor: "All Sponsors" })')) {
    content = content.replace(
      /setFilters\(\{ state: "All States", beneficiaryType: "All Beneficiaries", gender: "All Genders", sponsor: "All Sponsors" \}\)/,
      'setFilters({ state: "All States", beneficiaryType: "All Beneficiaries", gender: "All Genders", sponsor: "All Sponsors", caste: "All Categories" })'
    );
  }

  // Add the FilterSelect component
  if (!content.includes('setFilter("caste"')) {
    content = content.replace(
      /(<FilterSelect label="Sponsored By".*\/>)/,
      '$1\n            <FilterSelect label="Caste / Category"  value={filters.caste}           onChange={(v) => setFilter("caste", v)}           options={CASTES} />'
    );
  }

  // Add the filter logic
  if (!content.includes('filters.caste !== "All Categories"')) {
    content = content.replace(
      /(if \(filters\.sponsor !== "All Sponsors" && s\.sponsor !== filters\.sponsor\) return false;)/,
      '$1\n      const schemeCaste = s.caste || "All Categories";\n      if (filters.caste !== "All Categories" && schemeCaste !== filters.caste && schemeCaste !== "All Categories") return false;'
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
}
