import { HeaderContainer } from "./styles";

import logoIgnite from '../../assets/logo-ignite.svg';
import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";
export function Header() {
// navlink == a -> mesma coisa porem com a função de cada um levar a algum lugar diferente dependendo da pagina acessada e o to == href
  return (
  <HeaderContainer>
    <img src={logoIgnite} alt="" title="Timer"/>
    <nav>
      <NavLink to="/">
        <Timer size={24}/>
      </NavLink>
      <NavLink to="/history" title="Histórico">
        <Scroll size={24} />
      </NavLink>
    </nav>
  </HeaderContainer> 
  ) 
}
