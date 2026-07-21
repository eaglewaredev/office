import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { BugReportOutlined, Close, EditOutlined, HelpOutlined, HelpOutlineOutlined, LockClockOutlined, LockOutlined, MoreVert, PriorityHighOutlined, ReportGmailerrorredOutlined, WarningAmberOutlined } from "@mui/icons-material";

export default function HeaderVert(){
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
        <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        >
            <MoreVert/>
        </IconButton>
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
            paper: {
                elevation: 0,
                sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                },
                '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                },
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleClose}>
                <HelpOutlineOutlined /> Help
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <BugReportOutlined /> Report an issue
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
                <ReportGmailerrorredOutlined /> Suggest improvements
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <PriorityHighOutlined /> Suggest feature
            </MenuItem>
        </Menu>
        </>
    )
}
