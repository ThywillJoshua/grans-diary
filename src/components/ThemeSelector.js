import { useTheme } from "../hooks/useTheme";

//assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdjust } from "@fortawesome/free-solid-svg-icons";

//style
import "./ThemeSelector.css";

const themeColors = ["#3D56B2", "#249c6b", "#b70233"];

export default function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme();

  //handler
  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <div className="theme-selector">
      <FontAwesomeIcon
        icon={faAdjust}
        onClick={toggleMode}
        className="mode-toggle"
        style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
      />
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
