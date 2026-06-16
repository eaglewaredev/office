import { Box, Chip, FormControl, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import ThemeToggle from "../ThemeToggle";
import { SearchRounded } from "@mui/icons-material";
import BDepartmentProp from "@/data/blog/BDepartmentProp";

 function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRounded fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

export default function BAppBar({
    departments,
    menu,
}:{
    departments: BDepartmentProp[];
    menu: string;
}) {
    const handleClick = () => {
        console.info('You clicked the filter chip.');
    };

    return (
        <>
            <div>
                <Typography variant="h1" color='primary' gutterBottom>
                Aqademic Blog
                </Typography>
                <Typography>Stay in the loop with the latest in education</Typography>
            </div>
            <Box
                sx={{
                display: { xs: 'flex', sm: 'none' },
                flexDirection: 'row',
                gap: 1,
                width: { xs: '100%', md: 'fit-content' },
                overflow: 'auto',
                }}
            >
                <Search />
                {/* <IconButton size="small" aria-label="RSS feed">
                <RssFeedRoundedIcon />
                </IconButton> */}
                <ThemeToggle/>
            </Box>

            <Box
                sx={{
                display: 'flex',
                flexDirection: { xs: 'column-reverse', md: 'row' },
                width: '100%',
                justifyContent: 'space-between',
                alignItems: { xs: 'start', md: 'center' },
                gap: 4,
                overflow: 'auto',
                }}
            >
                <Box
                sx={{
                    display: 'inline-flex',
                    flexDirection: 'row',
                    gap: 3,
                    overflow: 'auto',
                }}
                >
                <Chip
                onClick={handleClick}
                size="medium"
                color='primary'
                variant='filled'
                label="All" />
                {
                    departments.map((department)=>{
                        return (
                            <Chip
                            onClick={handleClick}
                            size="medium"
                            label={department.name}
                            color={menu==department.name ? 'primary' : 'default'}
                            sx={{
                            // backgroundColor: 'transparent',
                            border: 'none',
                            }}
                        />
                        )
                    })
                }
                {/* <Search /> */}

                </Box>
                <ThemeToggle/>
            </Box>
        </>
    )
}
