// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import { setfilter } from "../../../../redux/filter/slice";
// import { selectGoods } from "../../../../redux/products/selectors";

// import {
//   MenuLevel,
//   LinkWrap,
//   RightIcon,
//   DownIcon,
//   StyleLink,
//   BrandStyleLink,
//   LinkHref,
// } from "./BurgerMenuItem.styled";

// const BurgerMenuItem = ({ item, level, closeMenu }) => {
//   const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
//   const items = useSelector(selectGoods);
//   const { pathname } = useLocation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const brand = items
//     ?.map((item) => item.brand.toUpperCase())
//     .reduce((accumulator, current) => {
//       if (!accumulator.includes(current)) {
//         accumulator.push(current);
//       }
//       return accumulator;
//     }, [])
//     .sort();
//   const toggleSubMenu = () => {
//     setIsSubMenuOpen(!isSubMenuOpen);
//   };

//   const handleClick = (e) => {
//     const name = e.target.innerText;
//     if (name === "категорії") {
//       navigate("/");
//       setTimeout(() => {
//         const categoryElement = document.getElementById("category");
//         if (categoryElement) {
//           categoryElement.scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           });
//         }
//       }, 10);
//     } else {
//       dispatch(setfilter(name));
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <MenuLevel className={`menu-level-${level}`}>
//       <LinkWrap>
//         {(item.to === "#category" && (
//           <LinkHref
//             className={pathname.includes("category") ? "active" : ""}
//             href={item.to}
//             onClick={(e) => {
//               toggleSubMenu();
//               closeMenu();
//               handleClick(e);
//             }}
//           >
//             {item.textMobile ? item.textMobile : item.text}
//           </LinkHref>
//         )) || (
//           <StyleLink
//             className={pathname === item.to ? "active" : ""}
//             to={item.to}
//             onClick={(e) => {
//               toggleSubMenu();
//               closeMenu();
//               handleClick(e);
//             }}
//           >
//             {item.textMobile ? item.textMobile : item.text}
//           </StyleLink>
//         )}

//         {(item.children.length === 0 && item.to !== "/brands") ||
//           (isSubMenuOpen ? (
//             <RightIcon
//               onClick={(e) => {
//                 toggleSubMenu();
//                 e.preventDefault();
//               }}
//             />
//           ) : (
//             <DownIcon
//               onClick={(e) => {
//                 toggleSubMenu();

//                 e.preventDefault();
//               }}
//             />
//           ))}
//       </LinkWrap>

//       {item.to !== "/brands" && item.children && isSubMenuOpen && (
//         <div className="submenu">
//           {item.children.map((child, index) => (
//             <BurgerMenuItem
//               key={index}
//               item={child}
//               level={level + 1}
//               closeMenu={closeMenu}
//             />
//           ))}
//         </div>
//       )}
//       {item.to === "/brands" && isSubMenuOpen && (
//         <div className="submenu">
//           {brand.map((child, index) => (
//             <MenuLevel className={`menu-level-${level + 1}`}>
//               <LinkWrap key={index}>
//                 <BrandStyleLink
//                   key={index}
//                   to={`/brands/${child.toLowerCase().trim()}`}
//                   onClick={(e) => {
//                     closeMenu();
//                     handleClick(e);
//                   }}
//                 >
//                   {child}
//                 </BrandStyleLink>
//               </LinkWrap>
//             </MenuLevel>
//           ))}
//         </div>
//       )}
//     </MenuLevel>
//   );
// };

// export default BurgerMenuItem;
