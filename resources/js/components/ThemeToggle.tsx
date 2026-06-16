import { IconButton } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import { useColorScheme } from '@mui/material';
import React from "react";

export default function ThemeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();

  const toggleMode = () => {
    // setAnchorEl(event.currentTarget)
    const targetMode = mode === 'dark'? 'light' : 'dark'
    console.log(targetMode)
    setMode(targetMode);
  }

  const resolvedMode = (systemMode || mode) as 'light' | 'dark'
  const icon = {
    light: <LightModeIcon/>,
    dark: <DarkModeIcon/>
  }[resolvedMode]

  return (
    <IconButton
      data-screenshot="toggle-mode"
      onClick = {toggleMode}
      disableRipple
      size="small"
      color="primary"
    >
      {icon}
    </IconButton>
  )
}
