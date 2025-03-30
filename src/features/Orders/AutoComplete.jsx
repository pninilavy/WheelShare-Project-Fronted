import { useState } from "react";
import {
  TextField,
  Paper,
  List,
  ListItem,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const Autocomplete = ({ onSelect, textInput, type }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (input) => {
    if (input.length < 2) {
      setSuggestions([]);
      return;
    }

    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(input + "*")}&lang=he&limit=5&result_type=street&apiKey=cfe943c834bb4747b0073fa86f710d4c`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (data && Array.isArray(data.features)) {
        const filteredResults = data.features.map((item) => {
          const formattedAddress = item.properties.formatted;
          return {
            display_name: formattedAddress || "כתובת לא זמינה",
            road: item.properties.street || "",
            house_number: item.properties.housenumber || "",
            city: item.properties.city || "",
            country: item.properties.country || "",
          };
        });
        setSuggestions(filteredResults);
      }
    } catch (error) {
      console.error("Error fetching autocomplete data:", error);
      alert("שגיאה בהבאת נתונים מה-API"); // הצגת הודעת שגיאה למשתמש
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    fetchSuggestions(input);
  };

  const handleSelect = (address) => {
    setQuery(address);
    setSuggestions([]);
    onSelect(address, type);
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div style={{ position: "relative" }}>
      <TextField
        value={query}
        onChange={handleChange}
        label={textInput}
        variant="outlined"
        fullWidth
        style={{ marginBottom: "10px" }}
        InputLabelProps={{
          shrink: false,
          sx: {
            "&.MuiInputLabel-root": {
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              textAlign: "right",
              color: "#a0a0a0",
              pointerEvents: "none",
              transition: "opacity 0.2s ease-in-out",
              opacity: query ? 0 : 1,
            },
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#f0f0f0",
            borderRadius: "7px",
            padding: "0 8px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiInputLabel-root": {
              display: "none",
            },
            "&.Mui-focused:after": {
              content: '""',
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "1.5px",
              backgroundColor: "#3a87cb",
            },
            fontFamily: "'Roboto', sans-serif",
          },
        }}
        InputProps={{
          sx: {
            textAlign: "right",
            "& input": {
              textAlign: "right",
            },
          },
          startAdornment: (
            <InputAdornment position="end">
              {query ? (
                <ClearIcon
                  style={{ color: "rgb(74 74 74 / 54%)", cursor: "pointer" }}
                  onClick={handleClear} // כאשר לוחצים על ה-X, מנקים את הטקסט
                />
              ) : (
                <SearchIcon style={{ color: "rgb(74 74 74 / 54%)" }} />
              )}
            </InputAdornment>
          ),
        }}
      />
      {suggestions.length > 0 && (
        <Paper style={{ position: "absolute", width: "100%", zIndex: 1000 }}>
          <List>
            {textInput === "בחרו נקודת התחלה" && (
              <ListItem
                button
                onClick={() => handleSelect("המיקום שלך")}
                sx={{
                  textAlign: "right", // יישור טקסט מימין לשמאל
                  direction: "rtl",
                }}
              >
                המיקום שלך
              </ListItem>
            )}
            {suggestions.map((item, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleSelect(item.display_name)}
                sx={{
                  textAlign: "right", // יישור טקסט מימין לשמאל
                  direction: "rtl",
                }}
              >
                <div style={{ fontSize: "1.1rem" }}>
                  {/* הצגת הרחוב ומספר הבית אם יש */}
                  <div style={{ fontWeight: "normal" }}>
                    {item.road && item.road}{" "}
                    {item.house_number && item.house_number}
                    {!item.road && item.city}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: "lighter",
                    marginTop: "5px",
                  }}
                >
                  <div>
                    {item.road && item.city && item.city}{" "}
                    {item.country && item.country}
                  </div>
                </div>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default Autocomplete;
