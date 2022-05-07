import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import UserManagermentPages from '../Pages/UserManagermentPages';
import EditForm from '../Component/EditForm';
import CreateProject from '../Pages/CreateProject';
import CyberBoard from '../Pages/CyberBoard';
import ProjectManagerment from '../Pages/ProjectManagerment'
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { USER_LOGIN } from '../ultilities/SettingSystem';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { OPEN_MODAL_LOGOUT } from '../ultilities/TypeServiceContanst';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
const { name, avatar } = localStorage.getItem(USER_LOGIN) ? JSON.parse(localStorage.getItem(USER_LOGIN)) : { "name": "Temp", "avatar": "Temp" }
console.log('name', name, avatar)
export default function UserTemplate() {
    const { id } = useParams()
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(true)
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch()



    const navigate = useNavigate()
    return (
        <Box Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}
            
               
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{  ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div style={{ position: 'absolute', right: '90px', width: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>



                        <div style={{ position: 'relative' }}>
                            <Avatar alt="Remy Sharp" src={avatar} style={{}} />

                        </div>
                        <div className='ml-2'>
                            Hi , {name}
                        </div>



                        {/* <Menu
                            style={{}}
                            id="fade-menu"
                            MenuListProps={{
                                "aria-labelledby": "fade-button"
                            }}
                            open={userOpen}
                        // onClose={false}
                        // TransitionComponent={Fade}
                        >
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>My account</MenuItem>
                            <MenuItem >Logout</MenuItem>
                        </Menu> */}
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <h4>DashBoard</h4>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Cyber Board', 'Project Management', 'Create Project', 'User Management'].map((text, index) => (
                        <ListItem button key={text} onClick={() => {
                            let tempPath = text.replace(/\s+/g, '')
                            navigate(text !== 'User Management' ? `/managerment/${id}/${tempPath}` : '')
                        }}>
                            <ListItemIcon >
                                <MailIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                    <ListItem button onClick={() => {
                        dispatch({
                            type: OPEN_MODAL_LOGOUT
                        })
                        
                    }}>
                        <ListItemIcon >
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Log Out'} />
                    </ListItem>
                </List>


            </Drawer>
            <Main open={open}>
                <DrawerHeader />

                <Typography paragraph>
                    <Routes>
                        <Route exact path='/CreateProject' element={<CreateProject></CreateProject>}></Route>
                        <Route exact path='/CyberBoard' element={<CyberBoard></CyberBoard>}></Route>
                        <Route exact path='/ProjectManagement' element={<ProjectManagerment></ProjectManagerment>}></Route>

                        <Route exact path='/' element={<UserManagermentPages></UserManagermentPages>}></Route>

                    </Routes>

                </Typography>

                <EditForm></EditForm>
            </Main>
        </Box >

    )
}
