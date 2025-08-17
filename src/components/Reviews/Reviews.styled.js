import styled from "styled-components";

export const ReviewsSection = styled.section`
	padding:          60px 0;
	background-color: #FFFFFF;
	
	.swiper {
		padding: 0px 20px 16px;
	}
	
	.swiper-button-next,
	.swiper-button-prev {
		color: ${(p) => p.theme.colors.primary_text};
		
		&:after {
			font-size: 24px;
		}
	}
	
	.swiper-pagination-bullet {
		background: ${(p) => p.theme.colors.primary_text};
		width:      10px;
	}
`;

export const ReviewsTitle = styled.h2`
  text-align: center;
  text-transform: uppercase;
  color: ${(p) => p.theme.colors.primary_text};
  font-size: 18px;
  font-weight: 600;
  line-height: 25.2px;
  word-wrap: break-word;
  padding: 10px;
  margin-bottom: 32px;
  margin-left: 20.5px;
  margin-right: 20.5px;
  border-bottom: 1px solid ${(p) => p.theme.colors.neutural_ligth_gray};
  @media (max-width: 768px) {
    /* font-size: 24px;
    margin-bottom: 20px; */
  }
`;

export const ReviewCard = styled.div`
  background: #fff;
  border-radius: 16px;
  /* padding: 21px; */
  /* box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); */
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ProductCart = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 20px;
  padding-bottom: 20px;
  background: #edf8ff;
  overflow: hidden;
  border-radius: 8px;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  display: inline-flex;
`;
export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BrandName = styled.span`
  color: ${(p) => p.theme.colors.primary_text};
  font-size: 16px;
  font-weight: 600;
  line-height: 22.4px;
  word-wrap: break-word;
`;

export const ProductName = styled.h3`
  color: ${(p) => p.theme.colors.primary_text};
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  word-wrap: break-word;
`;
export const ReviewContainer = styled.div`
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const ReviewInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 8px;
  border-top: 1px solid #eee;
  gap: 16px;
`;

export const ReviewWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ReviewerName = styled.span`
  color: ${(p) => p.theme.colors.primary_text};
  font-size: 16px;
  font-weight: 600;
  line-height: 22.4px;
  word-wrap: break-word;
`;

export const ReviewDate = styled.span`
  color: ${(p) => p.theme.colors.primary_text};
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  word-wrap: break-word;
`;

export const ReviewText = styled.p`
  color: ${(p) => p.theme.colors.primary_text};
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  word-wrap: break-word;
`;

export const ReviewRating = styled.div`
  display: flex;
  gap: 4px;
`;

export const HeartIcon = styled.img`
  width: 16px;
  height: 16px;
  opacity: ${(props) => (props.filled ? 1 : 0.3)};
`;
