import axios from "axios";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Loader} from "../../components/Loader/Loader";
import {
	AboutProductText,
	AboutProductWrapper,
	AboutProductWrapperMobile,
	Breadcrumbs,
	CounterBlock,
	Image,
	ImageContainer,
	InfoContainer,
	InputIncDec,
	LiHistoryItem,
	LinkHistoryLink,
	ProductAdminForm,
	ProductBuyWrapper,
	ProductContainer,
	ProductDescriptionItem,
	ProductDescriptionList,
	ProductDescriptionTitle,
	ProductDescriptionWrap,
	ProductFeaturesWrapper,
	ProductInner,
	ProductName,
	ProductNameWrapper,
	ProductPrice,
	ProductPriceName,
	ProductPriceSale,
	ProductPriceWrapper,
	ProductTags,
	UlHistoryList,
} from "./ProductPage.styled";
import Sticker from "../../components/Sticker/Sticker";
import Button from "../../components/Button/Button";
import {useMedia} from "../../utils/hooks/useMedia";

const ProductPage = () => {
	const {id} = useParams();
	const [loading, setLoading] = useState(true);
	const [product, setProduct] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isOptUser, setIsOptUser] = useState(false);
	const {isDesktopScreen, screenType} = useMedia();

	useEffect(() => {
		const fetchProduct = async () => {
			setLoading(true);
			try {
				const response = await axios.get(
					`https://kosmetic-back.onrender.com/api/products/${id}`
				);
				setLoading(false);
				setProduct(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchProduct();
	}, [id]);

	return (
		<>
			{loading ? (
				<Loader/>
			) : (
				<section>
					<Breadcrumbs>
						<UlHistoryList>
							<LiHistoryItem>
								<LinkHistoryLink to="/">головна сторінка</LinkHistoryLink>
								<span>/</span>
							</LiHistoryItem>
							{product.category ? (
								<LiHistoryItem>
									<LinkHistoryLink
										to={`/category/${product.category.toLowerCase().trim()}`}
									>
										{product.category.toLowerCase().trim()}
									</LinkHistoryLink>
									<span>/</span>
								</LiHistoryItem>
							) : null}
							{product.subCategory ? (
								<LiHistoryItem>
									<LinkHistoryLink
										to={`/category/${product.category
											.toLowerCase()
											.trim()}/${product.subCategory.toLowerCase().trim()}`}
									>
										{product.subCategory.toLowerCase().trim()}
									</LinkHistoryLink>
									<span>/</span>
								</LiHistoryItem>
							) : null}
							{product.subSubCategory ? (
								<LiHistoryItem>
									<LinkHistoryLink
										to={`/category/${product.category
											.toLowerCase()
											.trim()}/${product.subCategory
											.toLowerCase()
											.trim()}/${product.subSubCategory.toLowerCase().trim()}`}
									>
										{product.subSubCategory.toLowerCase().trim()}
									</LinkHistoryLink>
									<span>/</span>
								</LiHistoryItem>
							) : null}
							{product.brand ? (
								<LiHistoryItem>
									<LinkHistoryLink
										to={`/brands/${product.brand.toLowerCase().trim()}`}
									>
										{product.brand.toLowerCase().trim()}
									</LinkHistoryLink>
								</LiHistoryItem>
							) : null}
						</UlHistoryList>
					</Breadcrumbs>
					<ProductContainer>
						{/* image */}
						<ImageContainer>
							<Image itemProp="image" src={product.images} alt={product.name}/>
							<ProductTags>
								{product.newness && <Sticker text="New" product/>}
								{product.newness && <Sticker text="Sale" product sale/>}
							</ProductTags>
						</ImageContainer>
						{/* info */}
						<InfoContainer>
							<ProductNameWrapper>
								<div itemScope itemType="https://schema.org/Product"></div>
								<ProductName itemProp="name">{product.name}</ProductName>
							</ProductNameWrapper>
							<ProductFeaturesWrapper>
								<ProductInner className="inner">
									{isOptUser ? (
										<ProductPriceWrapper>
											<ProductPriceName>оптова ціна</ProductPriceName>
											<div>
												{product.priceOldOPT && product.sale === true && (
													<ProductPriceSale>
														{product.priceOldOPT} грн
													</ProductPriceSale>
												)}
												<ProductPrice>
													{product.priceOPT}
													<span>грн</span>
												</ProductPrice>
											</div>
										</ProductPriceWrapper>
									) : (
										<ProductPriceWrapper>
											<ProductPriceName>роздрібна ціна</ProductPriceName>
											<div>
												{product.priceOldOPT && product.sale === true && (
													<ProductPriceSale>
														{product.priceOld} грн
													</ProductPriceSale>
												)}

												<ProductPrice>
													{product.price}
													<span>грн</span>
												</ProductPrice>
											</div>
										</ProductPriceWrapper>
									)}
									<AboutProductWrapperMobile>
										<div>
											<AboutProductText>Бренд :</AboutProductText>
											<AboutProductText>Країна :</AboutProductText>
											<AboutProductText>Штрихкод :</AboutProductText>
											<AboutProductText>Артикул :</AboutProductText>
											<AboutProductText>Наявність :</AboutProductText>
										</div>
										<div>
											<AboutProductText> {product.brand}</AboutProductText>
											<AboutProductText> {product.country}</AboutProductText>
											<AboutProductText>{product.code}</AboutProductText>
											<AboutProductText>{product.article}</AboutProductText>
											{product.amount > 0 ? (
												<AboutProductText style={{color: "#008205"}}>
													в наявності
												</AboutProductText>
											) : (
												<AboutProductText>немає в наявності</AboutProductText>
											)}
										</div>
									</AboutProductWrapperMobile>
									<ProductBuyWrapper>
										{/* {product.amount <= 0 ||
                      (!productCartFind && (
                        <CounterBlock>
                          <ButtonIncDec onClick={decrementQuantity}>
                            –
                          </ButtonIncDec>
                          <InputIncDec
                            type="number"
                            min="1"
                            max={product.amount}
                            value={quantity}
                            onChange={handleQuantityChange}
                            // readOnly={true}
                          />
                          <ButtonIncDec onClick={incrementQuantity}>
                            +
                          </ButtonIncDec>
                        </CounterBlock>
                      ))} */}

										{/* <Button
                      goods
                      text={
                        product.amount <= 0
                          ? "немає в наявності"
                          : productCartFind
                          ? "у кошику"
                          : "додати до кошика"
                      }
                      onClick={handleAddToCart}
                      disabled={productCartFind || product.amount <= 0}
                    /> */}
									</ProductBuyWrapper>
									{/* {isAdmin && (
                    <ProductAdminForm onSubmit={handleChange}>
                      <CounterBlock>
                        <InputIncDec
                          type="number"
                          value={amount}
                          onChange={changeAmount}
                        />
                      </CounterBlock>
                      <Button
                        type="submit"
                        list
                        text={"оновити"}
                        // onClick={handleChange}
                      />
                    </ProductAdminForm>
                  )} */}
								</ProductInner>
								<AboutProductWrapper>
									<div>
										<AboutProductText>Бренд :</AboutProductText>
										<AboutProductText>Країна :</AboutProductText>
										<AboutProductText>Штрихкод :</AboutProductText>
										<AboutProductText>Артикул :</AboutProductText>
										<AboutProductText>Наявність :</AboutProductText>
									</div>
									<div style={{marginLeft: "20px"}}>
										<AboutProductText> {product.brand}</AboutProductText>
										<AboutProductText> {product.country}</AboutProductText>
										<AboutProductText>{product.code}</AboutProductText>
										<AboutProductText>{product.article}</AboutProductText>
										{product.amount > 0 ? (
											<AboutProductText style={{color: "#008205"}}>
												в наявності
											</AboutProductText>
										) : (
											<AboutProductText style={{color: "#FF0000"}}>
												немає в наявності
											</AboutProductText>
										)}
									</div>
								</AboutProductWrapper>
							</ProductFeaturesWrapper>
							{/* {product.compound ? (
                <ProductDescriptionWrap>
                  <ProductDescriptionTitle
                    className={isDescription && "active"}
                    onClick={() => {
                      setiIsDescription(true);
                    }}
                  >
                    опис товару
                  </ProductDescriptionTitle>
                  <ProductDescriptionTitle
                    className={!isDescription && "active"}
                    onClick={() => {
                      setiIsDescription(false);
                    }}
                  >
                    склад
                  </ProductDescriptionTitle>
                </ProductDescriptionWrap>
              ) : (
                <ProductDescriptionWrap>
                  <ProductDescriptionTitle
                    onClick={() => {
                      setiIsDescription(true);
                    }}
                  >
                    опис товару
                  </ProductDescriptionTitle>
                </ProductDescriptionWrap>
              )} */}

							{/* {isDescription ? (
                <ProductDescriptionList itemProp="description">
                  {paragraphs.map((paragraph, index) => (
                    <React.Fragment key={index}>
                      {paragraph.map((p, i) => (
                        <ProductDescriptionItem key={i}>
                          {p}
                        </ProductDescriptionItem>
                      ))}
                    </React.Fragment>
                  ))}
                </ProductDescriptionList>
              ) : (
                <ProductDescriptionList itemProp="compound">
                  <ProductDescriptionItem>
                    <p>{product.compound}</p>
                  </ProductDescriptionItem>
                </ProductDescriptionList>
              )} */}

							{/* {product && (
                <SimilarProducts
                  setQuantity={setQuantity}
                  brand={product.brand}
                  productId={product.id}
                />
              )} */}
							{/* {isModalOpen && <QuickOrderModal onClose={toggleModal} />} */}
						</InfoContainer>
					</ProductContainer>
				</section>
			)}
		</>
	);
};

export default ProductPage;
