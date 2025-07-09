import Contacts from "../../Contacts/Contacts";

import {
	TitleWrap,
	ContactGroup,
	Title,
	ContactWraper,
	Wrap,
} from "./footerContacts.styled";

export const FooterContacts = () => {
	return (
		<Wrap id="contacts">
			<TitleWrap>
				<Title>Контакти</Title>
			</TitleWrap>
			<ContactWraper>
				<ContactGroup>
					<Contacts
						title="+ 380 50 052 9100"
						to="tel:+380500529100"
						icon="phone"
					/>
				</ContactGroup>
				<ContactGroup style={{marginBottom: "28px"}}>
					<Contacts
						title="beautyblossom@gmail.com"
						to="mailto:beautyblossom@gmail.com"
						// icon="instagram"
					/>
					<Contacts
						title="instagram beauty_blossom_ua"
						to="https://www.instagram.com/beauty_blossom_ua"
						// icon="instagram"
					/>
					<Contacts
						title="telegram beauty_blossom"
						to="https://t.me/+Eejgotzs-ktiMTIy"
						// icon="telegram"
					/>
				</ContactGroup>
			</ContactWraper>
		</Wrap>
	);
};
