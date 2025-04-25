import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  Assignment as AssignmentIcon,
  Domain as DomainIcon,
  Group as GroupIcon,
  Class as ClassIcon,
  Home as HomeIcon,
  MenuBook as MenuBookIcon,
  PersonAdd as PersonAddIcon,
  PeopleAlt as PeopleAltIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const Sidebar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const Logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const menuItems = [
    { text: 'Admission Form', icon: <AssignmentIcon />, path: '/adm_form' },
    { text: 'Applicant Form', icon: <PersonAddIcon />, path: '/applicant' },
    { text: 'Applicant Requirements', icon: <AssignmentIcon />, path: '/applicant_requirement' },
    { text: 'Room Registration', icon: <HomeIcon />, path: '/room_registration' },
    { text: 'Course Registration', icon: <MenuBookIcon />, path: '/course_registration' },
    { text: 'Course Management', icon: <MenuBookIcon />, path: '/course_management' },
    { text: 'Department Sections', icon: <DomainIcon />, path: '/department_section_panel' },
    { text: 'Department Registration', icon: <DomainIcon />, path: '/department_registration' },
    { text: 'Section Panel', icon: <ClassIcon />, path: '/section_panel' },
    { text: 'Professor Registration', icon: <GroupIcon />, path: '/professor_registration' },
    { text: 'Admission Dashboard', icon: <DashboardIcon />, path: '/admission_dashboard' },
    { text: 'Enrollment Dashboard', icon: <DashboardIcon />, path: '/enrollment_dashboard' },
    { text: 'Enrolled Students', icon: <PeopleAltIcon />, path: '/enrolled_student' },
    { text: 'Certificate Of Registration', icon: <DescriptionIcon />, path: '/CertificateOfRegistration' },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'white', // black background
            color: '#ffffff', // white text
            position: 'fixed',
            top: '5rem',
            left: 0,
            height: 'calc(100vh - 8rem)',
            zIndex: 1200,
            overflowY: 'auto',
          },
        }}
      >
        <List disablePadding>
          {menuItems.map((item) => {
            const selected = location.pathname === item.path;
            return (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                selected={selected}
                sx={{
                  // default (unselected) vs selected
                  backgroundColor: selected ? '#6D2323' : 'white',
                  '& .MuiListItemIcon-root, & .MuiListItemText-root': {
                    color: selected ? '#fff' : '#000',
                  },
                  // hover (always)
                  '&:hover': {
                    backgroundColor: '#6D2323',
                    '& .MuiListItemIcon-root, & .MuiListItemText-root': {
                      color: '#fff',
                    },
                  },
                  // keep dark when selected
                  '&.Mui-selected': {
                    backgroundColor: '#6D2323',
                    '& .MuiListItemIcon-root, & .MuiListItemText-root': {
                      color: '#fff',
                    },
                  },
                  py: 1,
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            );
          })}
          <Divider sx={{ borderColor: '#444444', my: 2 }} />
          <ListItem
            button
            onClick={Logout}
            sx={{
              color: '#ff4d4f', // red logout text/icon
              '&:hover': {
                backgroundColor: '#1a1a1a',
                '& .MuiListItemIcon-root, & .MuiListItemText-root': {
                  color: '#ff4d4f',
                },
              },
              py: 1,
            }}
          >
            <ListItemIcon sx={{ color: '#ff4d4f' }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{ color: '#ff4d4f' }}
            />
          </ListItem>
        </List>
      </Drawer>
      <main
        style={{
          flexGrow: 1,
          marginLeft: drawerWidth,
          marginTop: '4rem',
          marginBottom: '4rem',
          padding: '20px',
          overflowY: 'auto',
        }}
      >
        {/* Routed components render here */}
      </main>
    </div>
  );
};

export default Sidebar;
