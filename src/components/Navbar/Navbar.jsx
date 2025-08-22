import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./config";
import { NavContainer, NavButtons, NavButton, Label } from "./style";

export default function Navbar() {
  const location = useLocation();
  return (
    <NavContainer elevation={6}>
      <NavButtons>
        {navItems.map((item) => {
          const active =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <NavButton
              key={item.id}
              component={Link}
              to={item.path}
              data-active={active ? 1 : 0}
              size="small"
            >
              {Icon ? <Icon fontSize="small" /> : null}
              <Label>{item.name}</Label>
            </NavButton>
          );
        })}
      </NavButtons>
    </NavContainer>
  );
}
