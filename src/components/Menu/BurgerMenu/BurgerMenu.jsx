// import React, { useState } from "react";

// import Contacts from "../Contacts/Contacts";
// import BurgerMenuItem from "./BurgerMenuItem/BurgerMenuItem";

// import {
//   MobileMenuContainer,
//   InfoLink,
//   AuthenticatedLink,
//   ContactBtn,
// } from "./BurgerMenu.styled";
// import { useSelector } from "react-redux";
// import { loggedInSelector } from "../../../redux/auth/selectors";

// const BurgerMenu = ({ items, handleClick, setIsMenuOpen, isMenuOpen }) => {
//   // eslint-disable-next-line
//   const [menuOpen, setMenuOpen] = useState(true);
//   const [contacts, setContacts] = useState(false);

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//     setMenuOpen(false);
//   };
//   const handleContactTogle = () => {
//     setContacts(!contacts);
//   };
//   const isLogin = useSelector(loggedInSelector);

//   return (
//     <MobileMenuContainer
//       customCrossIcon={false}
//       isOpen={isMenuOpen}
//       onStateChange={handleClick}
//       left
//       width={270}
//     >
//       {items.map(
//         (item, index) =>
//           item.to !== "#contacts" && (
//             <BurgerMenuItem
//               key={index}
//               item={item}
//               level={1}
//               closeMenu={handleClick}
//             />
//           )
//       )}

//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           marginTop: "45px",
//         }}
//       >
//         {isLogin && (
//           <>
//             <AuthenticatedLink to="/cabinet/userData">
//               Особистий кабінет
//             </AuthenticatedLink>

//             <AuthenticatedLink onClick={closeMenu} to="/cabinet/history">
//               Історія замовлень
//             </AuthenticatedLink>
//           </>
//         )}
//         <InfoLink onClick={closeMenu} href="/wholesaleProgram/#return">
//           Повернення та обмін
//         </InfoLink>
//         <InfoLink onClick={closeMenu} href="/wholesaleProgram/#payment">
//           Оплата і доставка
//         </InfoLink>
//         <InfoLink onClick={closeMenu} href="/wholesaleProgram/#about">
//           Про нас
//         </InfoLink>
//         <ContactBtn onClick={handleContactTogle}>Контакти</ContactBtn>
//         {contacts && (
//           <>
//             <Contacts
//               burger
//               title="+ 380 50 052 9100"
//               to="tel:+380500529100"
//               icon="phone"
//             />
//             <Contacts
//               burger
//               title="beautyblossom.opt@gmail.com"
//               to="mailto:beautyblossom.opt@gmail.com"
//               icon="mail"
//             />
//             <Contacts
//               burger
//               title="beauty_blossom_opt"
//               to="https://www.instagram.com/beauty_blossom_opt"
//               icon="instagram"
//             />
//             <Contacts
//               burger
//               title="beauty_blossom"
//               to="https://t.me/+Eejgotzs-ktiMTIy"
//               icon="telegram"
//             />
//           </>
//         )}
//       </div>
//     </MobileMenuContainer>
//   );
// };

// export default BurgerMenu;
