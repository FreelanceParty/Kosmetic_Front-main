import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineMenu, AiOutlineClose, AiOutlineDown } from "react-icons/ai";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { menuData } from "../Menu"; // масив з mobileText
import categoryData from "../menuItems.json"; // лише для "#category"
import {
  selectBrandsItems,
  selectedBrand,
} from "../../../redux/brands/selectors";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../../redux/filter/slice";
import { transliterate } from "../../transliterate";
import { fetchBrands } from "../../../redux/brands/operation";

// ==== Styled ====
const BurgerWrapper = styled.div`
  position: relative;
  z-index: 1000;
`;
const BurgerIcon = styled.button`
	font-size:  28px;
	background: none;
	border:     none;
	cursor:     pointer;
	color:      #616161;
	
	&:hover,
	&:focus {
		color: ${(p) => p.theme.colors.accentColor};
	}
`;
const MobileMenuWrapper = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  width: 100%;
  height: 100vh;
  background: #fff;
  padding: 20px;
  transition: left 0.3s ease;
  z-index: 999;
  overflow-y: auto;
`;
const CloseBtn = styled.button`
  font-size: 28px;
  background: none;
  border: none;
  float: right;
  cursor: pointer;
`;
const MobileNav = styled.ul`
  list-style: none;
  padding: 20px 0;
`;
const NavItem = styled.li`
  padding: 7px 0;
`;
const NavLinkStyled = styled(NavLink)`
  font-family: "Mulish", sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.57;
  text-transform: lowercase;
  text-align: center;
  color: #616161;

  text-decoration: none;

  &.active {
    color: #ff63b8;
  }
  &:hover {
    color: #ff63b8;
  }
`;
const LinkStyled = styled.a`
  font-family: "Mulish", sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.57;
  text-transform: lowercase;
  text-align: center;
  color: #616161;

  text-decoration: none;
  &.active {
    color: #ff63b8;
  }
  &:hover {
    color: #ff63b8;
  }
`;
const AnchorStyled = styled.a`
  font-family: "Mulish", sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.57;
  text-transform: lowercase;
  text-align: center;
  color: #616161;

  text-decoration: none;
  &.active {
    color: #ff63b8;
  }
  &:hover {
    color: #ff63b8;
  }
`;
const ExpandButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  color: #555;
  margin-left: 8px;
  cursor: pointer;
  &:hover {
    color: #ff63b8;
  }
`;
const SubMenu = styled.ul`
  list-style: none;
  padding-left: 15px;
  padding-top: 8px;
`;
export const BrandStyleLink = styled(NavLink)`
  font-family: "Mulish", sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.57;
  text-transform: uppercase;
  text-align: center;
  color: #616161;

  text-decoration: none;

  padding: 7px 0;
  &:hover,
  &:focus {
    color: #ff96cf;
  }
  &.active {
    color: #ff96cf;
  }
`;
export const DownIcon = styled(AiOutlineDown)`
  width: 22px;
  height: 22px;
  padding: 5px;
  margin-left: 5px;
  cursor: pointer;
  &:hover,
  &:focus {
    color: #ff96cf;
  }
`;

// ==== Рекурсивне меню категорій ====
const RecursiveMobileMenu = ({ items, parentPath = "", toggleMenu }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigate = useNavigate();

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <SubMenu>
      {items.map((item, index) => {
        const currentPath = `${parentPath}/${transliterate(item.text)}`;
        const hasChildren = item.children?.length > 0;

        return (
          <NavItem key={index}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <NavLinkStyled
                to={`/katehorii${currentPath}`}
                onClick={() => toggleMenu()}
              >
                {item.text}
              </NavLinkStyled>
              {hasChildren && (
                <ExpandButton onClick={() => toggleExpand(index)}>
                  {hasChildren && expandedIndex === index ? (
                    <DownIcon
                      style={{ transform: "rotate(-90deg)", color: "#ff63b8" }}
                    />
                  ) : (
                    <DownIcon />
                  )}
                </ExpandButton>
              )}
            </div>
            {hasChildren && expandedIndex === index && (
              <RecursiveMobileMenu
                items={item.children}
                parentPath={currentPath}
              />
            )}
          </NavItem>
        );
      })}
    </SubMenu>
  );
};

const MobileMenu = ({ isOpen, setIsOpen }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isBrandActive = location.pathname.startsWith("/brands/");
  const isCategoryActive = location.pathname.startsWith("/katehorii/");

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);
  const toggleMenu = () => {
    setIsOpen((prev) => {
      const newState = !prev;

      if (!newState) {
        // коли закривається меню
        setShowCategory(false);
        setShowBrands(false);
      }

      return newState;
    });
  };

  const brands = useSelector(selectedBrand);

  const handleClickBrand = (e) => {
    const name = e.target.innerText;
    console.log("name", name);
    dispatch(setFilter(name.toLowerCase().trim()));
    // setIsOpen(false);
  };
  const handleAnchorClick = (href) => {
    setIsOpen(false);
    // setShowCategory(false);
    // setShowBrands(false);
    if (href.startsWith("/")) {
      navigate(href);
    } else {
      navigate("/");
      setExpandedIndex(null);
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <BurgerWrapper>
      <MobileMenuWrapper isOpen={isOpen}>
        <CloseBtn onClick={toggleMenu}>
          <AiOutlineClose />
        </CloseBtn>

        <MobileNav>
          {menuData.map((item, index) => {
            const key = item.to || item.href || item.mobileTo;

            // === Категорії ===
            if (item.mobileTo === "#category") {
              return (
                <NavItem key={key}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <LinkStyled
                      className={isCategoryActive ? "active" : ""}
                      href="#category"
                      onClick={() => {
                        //   setShowCategory((prev) => !prev);
                        toggleMenu();
                        navigate("/");
                        setTimeout(() => {
                          const categoryElement =
                            document.getElementById("category");
                          if (categoryElement) {
                            categoryElement.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                        });
                      }}
                    >
                      {item.mobileText}
                    </LinkStyled>
                    <ExpandButton
                      onClick={() => {
                        setShowCategory((prev) => !prev);
                      }}
                    >
                      {showCategory ? (
                        <DownIcon
                          style={{
                            transform: "rotate(-90deg)",
                            color: "#ff63b8",
                          }}
                        />
                      ) : (
                        <DownIcon />
                      )}
                    </ExpandButton>
                  </div>

                  {showCategory && (
                    <RecursiveMobileMenu
                      items={categoryData[0].children}
                      toggleMenu={toggleMenu}
                    />
                  )}
                </NavItem>
              );
            }

            // === Бренди ===
            if (item.to === "/brands") {
              return (
                <NavItem key={key}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <NavLinkStyled
                      to={item.to}
                      className={isBrandActive ? "active" : ""}
                      onClick={() => {
                        toggleMenu();
                        navigate("/brands");
                      }}
                    >
                      {item.mobileText}
                    </NavLinkStyled>
                    <ExpandButton
                      onClick={() => {
                        setShowBrands((prev) => !prev);
                      }}
                    >
                      {showBrands ? (
                        <DownIcon
                          style={{
                            transform: "rotate(-90deg)",
                            color: "#ff63b8",
                          }}
                        />
                      ) : (
                        <DownIcon />
                      )}
                    </ExpandButton>
                  </div>

                  {showBrands &&
                    Array.isArray(brands.items) &&
                    brands.items.length > 0 && (
                      <SubMenu>
                        {brands.items
                          .flatMap(({ brandsName }) => brandsName)
                          .map((name) => (
                            <NavItem key={name}>
                              <BrandStyleLink
                                to={`/brands/${name.toLowerCase().trim()}`}
                                onClick={(e) => {
                                  handleClickBrand(e);
                                  toggleMenu();
                                }}
                              >
                                {name}
                              </BrandStyleLink>
                            </NavItem>
                          ))}
                      </SubMenu>
                    )}
                </NavItem>
              );
            }

            // === Якорі або прості посилання ===
            if (item.href || item.mobileTo) {
              return (
                <NavItem key={key}>
                  <AnchorStyled
                    href={item.href || item.mobileTo}
                    onClick={() =>
                      handleAnchorClick(item.href || item.mobileTo)
                    }
                  >
                    {item.mobileText}
                  </AnchorStyled>
                </NavItem>
              );
            }

            // === Стандартне NavLink ===
            return (
              <NavItem key={key}>
                <NavLinkStyled
                  to={item.to}
                  onClick={() => {
                    toggleMenu();
                  }}
                >
                  {item.mobileText}
                </NavLinkStyled>
              </NavItem>
            );
          })}
        </MobileNav>
      </MobileMenuWrapper>
    </BurgerWrapper>
  );
};

export default MobileMenu;
