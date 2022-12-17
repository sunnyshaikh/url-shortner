import { useEffect, useState } from "react";
import Main from "./components/Main"
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark")

  const handleToggle = () => {
    setTheme(theme => (theme === "light" ? "dark" : "light"))
  }

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <div className="app" data-theme={theme}>
      <div className="theme-toggle">
        {
          theme === "dark" ?
            <button className="toggle-button" onClick={handleToggle}><DarkModeOutlinedIcon /></button> :
            <button className="toggle-button" onClick={handleToggle}><WbSunnyOutlinedIcon /></button>
        }
      </div>
      <Main />
    </div>
  )
}

export default App
