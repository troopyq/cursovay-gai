import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    
  },
  components:{
    MuiButton: {
      styleOverrides: {
        root: {
          paddingInline: 40
        }
      }
    }
  }
})