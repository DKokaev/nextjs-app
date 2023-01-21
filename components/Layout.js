import Header from "./page_components/Header";
import { Box } from "@mui/material";
export default function Layout({children}){
  return(
    <Box display='flex' flexDirection={'row'}>
    <Header/>
    <Box component={'main'} width="100%">
    {children}
    </Box>
    </Box>
  )
}