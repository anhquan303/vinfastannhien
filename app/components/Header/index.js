import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Badge from '@mui/material/Badge';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CartPreview from './component/CartPreview';

function Header(props) {
  const { window } = props;
  const drawerWidth = 240;
  const navItems = [
    {
      name: 'Trang chủ',
      href: '/home',
    },
    {
      name: 'Giới thiệu',
      href: '/introduce',
    },
    {
      name: 'Sản phẩm',
      href: '/product',
    },
    {
      name: 'Hệ thống cửa hàng',
      href: '/showroom',
    },
    {
      name: 'Tin tức',
      href: '/news',
    },
    {
      name: 'Giỏ hàng',
      href: '/cart',
      isCart: true,
    },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartItem, setCartItem] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
  const totalQuantity = cartItem.reduce((sum, item) => sum + item.quantityCart, 0);
  const [showPopup, setShowPopup] = useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link to="/home" style={{ textDecoration: 'none' }}>
          <Box
            component="img"
            src={logo}
            alt="logo"
            sx={{ height: { xs: 150, sm: 200 } }}
          />
        </Link>
      </Typography>
      <Divider />
      <List>
        {navItems.map(item => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {/* <HeaderLink to={item.href}>
                <ListItemText style={{ color: '#6E6565' }}>
                  {item.name}
                </ListItemText>
              </HeaderLink> */}
              <Button
                key={item.href}
                component={NavLink}
                to={item.href}
                sx={{
                  color: '#6E6565',
                  fontSize: '16px',
                  textTransform: 'uppercase',
                  '&.active': {
                    color: '#F44336',
                    fontWeight: 'bold',
                  },
                }}
              >
                {item.name}
              </Button>
            </ListItemButton>
          </ListItem>
        ))}
        <Box position="relative" onMouseLeave={() => setShowPopup(false)}>
          <IconButton onMouseEnter={() => setShowPopup(true)}>
            <Badge badgeContent={totalQuantity} color="error">
              <ShoppingBagIcon />
            </Badge>
          </IconButton>
          {showPopup && <CartPreview onClose={() => setShowPopup(false)} />}
        </Box>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      {/* <A href="https://www.reactboilerplate.com/">
        <Img src={Banner} alt="react-boilerplate - Logo" />
      </A>
      <NavBar>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        <HeaderLink to="/features">
          <FormattedMessage {...messages.features} />
        </HeaderLink>
      </NavBar> */}

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" style={{ backgroundColor: '#fff' }}>
          <Toolbar>
            <IconButton
              color="#000"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Box
              sx={{
                display: { xs: 'block', sm: 'none' },
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              <Link to="/home" style={{ textDecoration: 'none' }}>
                <Box
                  component="img"
                  src={logo}
                  alt="logo"
                  sx={{ height: 100, padding: '10px' }}
                />
              </Link>
            </Box>

            <Typography
              variant="h6"
              component="div"
              color="black"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <Link to="/home" style={{ textDecoration: 'none' }}>
                <Box
                  component="img"
                  src={logo}
                  alt="logo"
                  sx={{ height: { xs: 50, sm: 70 } }}
                />
              </Link>
            </Typography>

            {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map(item => (
                <Button
                  key={item.href}
                  component={NavLink}
                  to={item.href}
                  sx={{
                    color: '#6E6565',
                    fontSize: '16px',
                    textTransform: 'uppercase',
                    '&.active': {
                      color: '#F44336',
                      fontWeight: 'bold',
                    },
                  }}
                >
                  {item.name}
                </Button>
              ))}
              <Box position="relative" onMouseLeave={() => setShowPopup(false)}>
                <IconButton onMouseEnter={() => setShowPopup(true)}>
                  <Badge badgeContent={totalQuantity} color="error">
                    <ShoppingBagIcon />
                  </Badge>
                </IconButton>
                {showPopup && <CartPreview onClose={() => setShowPopup(false)} />}
              </Box>
            </Box> */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
              {navItems.map(item =>
                item.isCart ? (
                  <Button
                    key={item.href}
                    component={NavLink}
                    to={item.href}
                    sx={{
                      color: '#6E6565',
                      fontSize: '16px',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      '&.active': {
                        color: '#F44336',
                        fontWeight: 'bold',
                      },
                    }}

                    onMouseEnter={() => setShowPopup(true)}
                    onMouseLeave={() => setShowPopup(false)}
                  >
                    <Badge badgeContent={totalQuantity} color="error">
                      <ShoppingBagIcon />
                    </Badge>
                    {showPopup && <CartPreview onClose={() => setShowPopup(false)} />}
                    Giỏ hàng
                  </Button>
                ) : (
                  <Button
                    key={item.href}
                    component={NavLink}
                    to={item.href}
                    sx={{
                      color: '#6E6565',
                      fontSize: '16px',
                      textTransform: 'uppercase',
                      '&.active': {
                        color: '#F44336',
                        fontWeight: 'bold',
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                )
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </div>
  );
}

export default Header;
