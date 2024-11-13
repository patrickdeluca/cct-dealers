import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface StyledContainerProps {
    isScrolled: boolean;
    children?: React.ReactNode;
}

const HeaderContainer = styled.header<StyledContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  background: ${props => props.isScrolled ? props.theme.colors.white : 'transparent'};
  padding: ${props => props.theme.spacing.md} 0;
  box-shadow: ${props => props.isScrolled ? props.theme.shadows.small : 'none'};
`;

const Nav = styled.div`
  max-width: ${props => props.theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing.sm};
  }
`;

const LogoLink = styled(Link)`
  display: block;
  z-index: 1001;
`;

interface LogoContainerProps {
    isScrolled: boolean;
    children?: React.ReactNode;
}

const LogoContainer = styled.div<LogoContainerProps>`
  position: relative;
  height: 40px;
  width: 131px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 32px;
    width: 105px;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    transition: all 0.3s ease;
    filter: ${props => props.isScrolled ? 'brightness(0.2)' : 'brightness(1)'};
  }
`;

interface MenuItemsProps {
    isOpen: boolean;
    children?: React.ReactNode;
}

const MenuItems = styled.div.attrs<MenuItemsProps>(() => ({
    role: 'navigation'
})) <MenuItemsProps>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    background: ${props => props.theme.colors.white};
    flex-direction: column;
    justify-content: center;
    transform: translateX(${props => props.isOpen ? '0' : '100%'});
    transition: transform 0.3s ease;
    padding: ${props => props.theme.spacing.xl};
  }
`;

interface MenuItemProps {
    isActive?: boolean;
    isScrolled: boolean;
    children?: React.ReactNode;
    to: string;
}

const MenuItem = styled(Link) <MenuItemProps>`
  color: ${props => props.isScrolled ? props.theme.colors.textDark : props.theme.colors.white};
  text-decoration: none;
  font-weight: 500;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  position: relative;
  transition: color 0.3s ease;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    color: ${props => props.theme.colors.textDark};
    font-size: 1.2rem;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: ${props => props.theme.spacing.sm};
    right: ${props => props.theme.spacing.sm};
    height: 2px;
    background: ${props => props.theme.colors.primary};
    transform: scaleX(${props => props.isActive ? 1 : 0});
    transition: transform 0.3s ease;
  }

  &:hover:after {
    transform: scaleX(1);
  }
`;

interface LoginButtonProps {
    isScrolled: boolean;
    children?: React.ReactNode;
    to: string;
}

const LoginButton = styled(Link) <LoginButtonProps>`
  background: ${props => props.isScrolled ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.isScrolled ? props.theme.colors.white : props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.small};
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    width: 100%;
    text-align: center;
    padding: ${props => props.theme.spacing.sm};
  }
`;

interface MenuToggleProps {
    isOpen: boolean;
    onClick: () => void;
    children?: React.ReactNode;
}

const MenuToggle = styled.button.attrs<MenuToggleProps>(() => ({
    'aria-label': 'Toggle menu'
})) <MenuToggleProps>`
  display: none;
  z-index: 1001;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }

  span {
    display: block;
    width: 24px;
    height: 2px;
    background: ${props => props.isOpen ? props.theme.colors.textDark : props.theme.colors.primary};
    margin: 5px 0;
    transition: all 0.3s ease;

    &:first-child {
      transform: ${props => props.isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'};
    }

    &:nth-child(2) {
      opacity: ${props => props.isOpen ? '0' : '1'};
    }

    &:last-child {
      transform: ${props => props.isOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none'};
    }
  }
`;

const Logo: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => (
    <LogoLink to="/">
        <LogoContainer isScrolled={isScrolled}>
            <img
                src="/assets/images/carcapital-logo-500x153.png"
                alt="Car Capital"
            />
        </LogoContainer>
    </LogoLink>
);

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    React.useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    return (
        <HeaderContainer isScrolled={isScrolled}>
            <Nav>
                <Logo isScrolled={isScrolled} />
                <MenuToggle
                    isOpen={isMenuOpen}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span />
                    <span />
                    <span />
                </MenuToggle>
                <MenuItems isOpen={isMenuOpen}>
                    <MenuItem to="/" isScrolled={isScrolled}>Home</MenuItem>
                    <MenuItem to="/get-pre-qualified" isScrolled={isScrolled}>Get Pre-Qualified</MenuItem>
                    <MenuItem to="/about" isScrolled={isScrolled}>About</MenuItem>
                    <MenuItem to="/dealers" isScrolled={isScrolled} isActive>Dealers</MenuItem>
                    <MenuItem to="/contact" isScrolled={isScrolled}>Contact</MenuItem>
                    <LoginButton to="/login" isScrolled={isScrolled}>Log in</LoginButton>
                </MenuItems>
            </Nav>
        </HeaderContainer>
    );
};

export default Header;
