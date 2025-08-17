import { createGlobalStyle } from "styled-components";
import "modern-normalize";

export const GlobalStyle = createGlobalStyle`
	html,
	body {
		height:                  100%;
		font-size:               18px;
		font-weight:             400;
		line-height:             1;
		-webkit-font-smoothing:  antialiased;
		-moz-osx-font-smoothing: grayscale;
		color:                   #504056;
		scroll-behavior:         smooth;
	}
	#root {
		min-height:     100%;
		display:        flex;
		flex-direction: column;
	}
	body.modal-open {
		overflow: hidden;
	}
	*,
	::after,
	::before {
		box-sizing: border-box;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p {
		margin: 0;
	}
	ul,
	ol {
		list-style: none;
		margin:     0;
		padding:    0;
	}
	img {
		display:   block;
		max-width: 100%;
		height:    auto;
	}
	button {
		cursor: pointer;
	}
	a,
	button,
	input {
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
	.Pagination {
		display:         flex;
		justify-content: center;
		align-items:     center;
		list-style:      none;
		outline:         transparent;
		gap:             10px;
		margin-top:      20px;
		
		& > li {
			width:  40px;
			height: 40px;
		}
		
		& > li > a {
			display:          flex;
			justify-content:  center;
			align-items:      center;
			width:            40px;
			height:           40px;
			background-color: #FFFFFF;
			color:            #000000;
			border:           1px solid #CCCCCC;
			border-radius:    2px;
			cursor:           pointer;
			
			&:hover {
				background: #CCCCCC;
			}
		}
		
		& > &__active > a {
			display:         flex;
			justify-content: center;
			align-items:     center;
			width:           40px;
			height:          40px;
			background:      #FF69B4;
			color:           #FFFFFF;
			border:          1px solid #CCCCCC;
			border-radius:   2px;
			cursor:          pointer;
			
			&:hover,
			&:focus {
				background: #FF69B4;
				cursor:     default;
			}
		}
		
		& > .disabled > a {
			opacity: 0.5;
			cursor:  default;
			
			&:hover,
			&:focus {
				background: #FFFFFF;
			}
		}
	}
	.WrapListProduct {
		transition: transform 0.5s linear;
	}
	.WrapListProduct.active {
		transform: translateY(-100%);
}
`;
