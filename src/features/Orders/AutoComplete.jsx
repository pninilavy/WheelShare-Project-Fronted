import { useState } from "react";

const Autocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // שליחת בקשה ל-Nominatim API עם הכתובת שהמשתמש מקליד
  const fetchSuggestions = async (input) => {
    if (input.length < 3) {
      setSuggestions([]); // לא מחפש לפני 3 תווים
      return;
    }

    // בקשה ל-OpenStreetMap
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&addressdetails=1&countrycodes=IL&limit=5`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // עיבוד התוצאות לסינון הרחוב, מספר הבניין, עיר וארץ
      const filteredResults = data.map((item) => {
        return {
          display_name: `${item.address.road || ""} ${item.address.house_number || ""}, ${item.address.city || ""}, ${item.address.country || ""}`,
          road: item.address.road || "",
          house_number: item.address.house_number || "",
          city: item.address.city || "",
          country: item.address.country || "",
        };
      });

      setSuggestions(filteredResults); // הצגת התוצאות
    } catch (error) {
      console.error("Error fetching autocomplete data:", error);
    }
  };

  // עדכון טקסט חיפוש
  const handleChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    fetchSuggestions(input);
  };

  // בחירת כתובת מהתוצאות
  const handleSelect = (address) => {
    setQuery(address);
    setSuggestions([]);
    onSelect(address); // שולח את הכתובת לקומפוננטה ההורה
  };

  return (
    <div style={{ position: "relative", width: "300px" }}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="הקלד כתובת..."
        style={{ width: "100%", padding: "8px", fontSize: "16px" }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            width: "100%",
            background: "white",
            border: "1px solid #ccc",
            listStyleType: "none",
            padding: "0",
            margin: "0",
            zIndex: "1000",
          }}
        >
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item.display_name)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
