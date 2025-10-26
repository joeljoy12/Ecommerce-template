import type { Rule } from "sanity"
import { defineType, defineField } from "sanity"
import { useState } from "react"
import { set, unset, PatchEvent } from "sanity"
 

export default defineType({
  name: "storeSettings",
  title: "Store Settings",
  type: "document",
  fields: [
    defineField({
      name: "storeName",
      title: "Store Name",
      type: "string",
      description: "Name of your store — used in site title and metadata.",
    validation: (Rule) => Rule.required().min(1),

    }),

    defineField({
      name: "siteUrl",
      title: "Website URL",
      type: "url",
      description: "Used for SEO and social sharing (e.g. https://yourstore.com)",
      initialValue: "https://your-vercel-site-url.vercel.app",
    validation: (Rule) => Rule.required(),

    }),

    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 3,
      description: "Meta description for Google search results.",
      initialValue:
        "Shop premium quality products with fast checkout and worldwide shipping.",
    }),

    defineField({
      name: "ogImage",
      title: "Social Share Image (OG Image)",
      type: "image",
      description:
        "Image shown when sharing on social media (recommended 1200x630).",
      options: { hotspot: true },
    }),

    defineField({
      
  name: "stripeSection",
  title: "💳 Stripe Configuration",
  type: "object",
  fields: [
    {
      name: "publishableKey",
      title: "Stripe Publishable Key",
      type: "string",
      description: "Starts with pk_live_ or pk_test_. Paste from Stripe Dashboard → Developers → API Keys",
    },
    {
      name: "secretKey",
      title: "Stripe Secret Key",
      type: "string",
      description: "Starts with sk_live_ or sk_test_.",
    },
    {
      name: "webhookSecret",
      title: "Stripe Webhook Secret",
      type: "string",
      description: "Paste from your Stripe Webhook endpoint settings.",
    },
  ],
},

),

    // 🌍 Enhanced Country Picker
    defineField({
      name: "allowedCountries",
      title: "Allowed Shipping Countries",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Select countries where shipping is available. You can search or expand to view all.",
      components: {
        input: CountrySelectorInput, // 👈 Custom component defined below
      },
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})

/* -------------------------------
   ✅ Custom Country Selector Input
----------------------------------*/
function CountrySelectorInput(props: any) {
  const { value = [], onChange } = props
  const [query, setQuery] = useState("")
  const [showAll, setShowAll] = useState(false)

  const allCountries = [
  { title: "Afghanistan", value: "AF" },
    { title: "Albania", value: "AL" },
    { title: "Algeria", value: "DZ" },
    { title: "Andorra", value: "AD" },
    { title: "Angola", value: "AO" },
    { title: "Antigua and Barbuda", value: "AG" },
    { title: "Argentina", value: "AR" },
    { title: "Armenia", value: "AM" },
    { title: "Australia", value: "AU" },
    { title: "Austria", value: "AT" },
    { title: "Azerbaijan", value: "AZ" },
    { title: "Bahamas", value: "BS" },
    { title: "Bahrain", value: "BH" },
    { title: "Bangladesh", value: "BD" },
    { title: "Barbados", value: "BB" },
    { title: "Belarus", value: "BY" },
    { title: "Belgium", value: "BE" },
    { title: "Belize", value: "BZ" },
    { title: "Benin", value: "BJ" },
    { title: "Bhutan", value: "BT" },
    { title: "Bolivia", value: "BO" },
    { title: "Bosnia and Herzegovina", value: "BA" },
    { title: "Botswana", value: "BW" },
    { title: "Brazil", value: "BR" },
    { title: "Brunei Darussalam", value: "BN" },
    { title: "Bulgaria", value: "BG" },
    { title: "Burkina Faso", value: "BF" },
    { title: "Burundi", value: "BI" },
    { title: "Cambodia", value: "KH" },
    { title: "Cameroon", value: "CM" },
    { title: "Canada", value: "CA" },
    { title: "Cape Verde", value: "CV" },
    { title: "Central African Republic", value: "CF" },
    { title: "Chad", value: "TD" },
    { title: "Chile", value: "CL" },
    { title: "China", value: "CN" },
    { title: "Colombia", value: "CO" },
    { title: "Comoros", value: "KM" },
    { title: "Congo (Brazzaville)", value: "CG" },
    { title: "Congo (Kinshasa)", value: "CD" },
    { title: "Costa Rica", value: "CR" },
    { title: "Croatia", value: "HR" },
    { title: "Cuba", value: "CU" },
    { title: "Cyprus", value: "CY" },
    { title: "Czech Republic", value: "CZ" },
    { title: "Denmark", value: "DK" },
    { title: "Djibouti", value: "DJ" },
    { title: "Dominica", value: "DM" },
    { title: "Dominican Republic", value: "DO" },
    { title: "Ecuador", value: "EC" },
    { title: "Egypt", value: "EG" },
    { title: "El Salvador", value: "SV" },
    { title: "Equatorial Guinea", value: "GQ" },
    { title: "Eritrea", value: "ER" },
    { title: "Estonia", value: "EE" },
    { title: "Eswatini", value: "SZ" },
    { title: "Ethiopia", value: "ET" },
    { title: "Fiji", value: "FJ" },
    { title: "Finland", value: "FI" },
    { title: "France", value: "FR" },
    { title: "Gabon", value: "GA" },
    { title: "Gambia", value: "GM" },
    { title: "Georgia", value: "GE" },
    { title: "Germany", value: "DE" },
    { title: "Ghana", value: "GH" },
    { title: "Greece", value: "GR" },
    { title: "Grenada", value: "GD" },
    { title: "Guatemala", value: "GT" },
    { title: "Guinea", value: "GN" },
    { title: "Guinea-Bissau", value: "GW" },
    { title: "Guyana", value: "GY" },
    { title: "Haiti", value: "HT" },
    { title: "Honduras", value: "HN" },
    { title: "Hong Kong", value: "HK" },
    { title: "Hungary", value: "HU" },
    { title: "Iceland", value: "IS" },
    { title: "India", value: "IN" },
    { title: "Indonesia", value: "ID" },
    { title: "Iran", value: "IR" },
    { title: "Iraq", value: "IQ" },
    { title: "Ireland", value: "IE" },
    { title: "Israel", value: "IL" },
    { title: "Italy", value: "IT" },
    { title: "Jamaica", value: "JM" },
    { title: "Japan", value: "JP" },
    { title: "Jordan", value: "JO" },
    { title: "Kazakhstan", value: "KZ" },
    { title: "Kenya", value: "KE" },
    { title: "Kiribati", value: "KI" },
    { title: "Kuwait", value: "KW" },
    { title: "Kyrgyzstan", value: "KG" },
    { title: "Laos", value: "LA" },
    { title: "Latvia", value: "LV" },
    { title: "Lebanon", value: "LB" },
    { title: "Lesotho", value: "LS" },
    { title: "Liberia", value: "LR" },
    { title: "Libya", value: "LY" },
    { title: "Liechtenstein", value: "LI" },
    { title: "Lithuania", value: "LT" },
    { title: "Luxembourg", value: "LU" },
    { title: "Macau", value: "MO" },
    { title: "Madagascar", value: "MG" },
    { title: "Malawi", value: "MW" },
    { title: "Malaysia", value: "MY" },
    { title: "Maldives", value: "MV" },
    { title: "Mali", value: "ML" },
    { title: "Malta", value: "MT" },
    { title: "Marshall Islands", value: "MH" },
    { title: "Mauritania", value: "MR" },
    { title: "Mauritius", value: "MU" },
    { title: "Mexico", value: "MX" },
    { title: "Moldova", value: "MD" },
    { title: "Monaco", value: "MC" },
    { title: "Mongolia", value: "MN" },
    { title: "Montenegro", value: "ME" },
    { title: "Morocco", value: "MA" },
    { title: "Mozambique", value: "MZ" },
    { title: "Myanmar", value: "MM" },
    { title: "Namibia", value: "NA" },
    { title: "Nepal", value: "NP" },
    { title: "Netherlands", value: "NL" },
    { title: "New Zealand", value: "NZ" },
    { title: "Nicaragua", value: "NI" },
    { title: "Niger", value: "NE" },
    { title: "Nigeria", value: "NG" },
    { title: "North Macedonia", value: "MK" },
    { title: "Norway", value: "NO" },
    { title: "Oman", value: "OM" },
    { title: "Pakistan", value: "PK" },
    { title: "Palestine", value: "PS" },
    { title: "Panama", value: "PA" },
    { title: "Papua New Guinea", value: "PG" },
    { title: "Paraguay", value: "PY" },
    { title: "Peru", value: "PE" },
    { title: "Philippines", value: "PH" },
    { title: "Poland", value: "PL" },
    { title: "Portugal", value: "PT" },
    { title: "Qatar", value: "QA" },
    { title: "Romania", value: "RO" },
    { title: "Russia", value: "RU" },
    { title: "Rwanda", value: "RW" },
    { title: "Saint Kitts and Nevis", value: "KN" },
    { title: "Saint Lucia", value: "LC" },
    { title: "Saint Vincent and the Grenadines", value: "VC" },
    { title: "Samoa", value: "WS" },
    { title: "San Marino", value: "SM" },
    { title: "Sao Tome and Principe", value: "ST" },
    { title: "Saudi Arabia", value: "SA" },
    { title: "Senegal", value: "SN" },
    { title: "Serbia", value: "RS" },
    { title: "Seychelles", value: "SC" },
    { title: "Sierra Leone", value: "SL" },
    { title: "Singapore", value: "SG" },
    { title: "Slovakia", value: "SK" },
    { title: "Slovenia", value: "SI" },
    { title: "Solomon Islands", value: "SB" },
    { title: "Somalia", value: "SO" },
    { title: "South Africa", value: "ZA" },
    { title: "South Korea", value: "KR" },
    { title: "Spain", value: "ES" },
    { title: "Sri Lanka", value: "LK" },
    { title: "Sudan", value: "SD" },
    { title: "Suriname", value: "SR" },
    { title: "Sweden", value: "SE" },
    { title: "Switzerland", value: "CH" },
    { title: "Syria", value: "SY" },
    { title: "Taiwan", value: "TW" },
    { title: "Tajikistan", value: "TJ" },
    { title: "Tanzania", value: "TZ" },
    { title: "Thailand", value: "TH" },
    { title: "Togo", value: "TG" },
    { title: "Tonga", value: "TO" },
    { title: "Trinidad and Tobago", value: "TT" },
    { title: "Tunisia", value: "TN" },
    { title: "Turkey", value: "TR" },
    { title: "Turkmenistan", value: "TM" },
    { title: "Tuvalu", value: "TV" },
    { title: "Uganda", value: "UG" },
    { title: "Ukraine", value: "UA" },
    { title: "United Arab Emirates", value: "AE" },
    { title: "United Kingdom", value: "GB" },
    { title: "United States", value: "US" },
    { title: "Uruguay", value: "UY" },
    { title: "Uzbekistan", value: "UZ" },
    { title: "Vanuatu", value: "VU" },
    { title: "Vatican City", value: "VA" },
    { title: "Venezuela", value: "VE" },
    { title: "Vietnam", value: "VN" },
    { title: "Yemen", value: "YE" },
    { title: "Zambia", value: "ZM" },
    { title: "Zimbabwe", value: "ZW" },
  ]

  // Filter countries by search
  const filtered = allCountries.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  )

  const visibleCountries = showAll ? filtered : filtered.slice(0, 5)

  return (
    <div style={{ padding: "0.5rem 0" }}>
      {/* 🔍 Search bar */}
      <input
        type="text"
        placeholder="Search countries..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "6px 10px",
          borderRadius: "6px",
          border: "1px solid #ddd",
          marginBottom: "10px",
        }}
      />

      {/* ✅ Country list */}


<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
  {visibleCountries.map((country) => {
    const selected = value.includes(country.value)
    return (
      <label
        key={country.value}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => {
            const newValue = e.target.checked
              ? [...value, country.value]
              : value.filter((v: string) => v !== country.value)

            // ✅ Proper Sanity Patch update
            onChange(
              PatchEvent.from(
                newValue.length > 0 ? set(newValue) : unset()
              )
            )
          }}
        />
        {country.title}
      </label>
    )
  })}
</div>


      {/* 🔽 Show more / less button */}
      {filtered.length > 5 && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          style={{
            marginTop: "10px",
            color: "#0070f3",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {showAll ? "Show less ▲" : "Show more ▼"}
        </button>
      )}
    </div>
  )
}
