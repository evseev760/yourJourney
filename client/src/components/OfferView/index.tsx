import { Skeleton } from "@material-ui/lab";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import { Avatar } from "components/Avatar";
import { MainButton } from "components/MainButton";
import Price from "components/Price";
import { useAppSelector } from "hooks/redux";
import { useCurrencies } from "hooks/useCurrencies";
import { Rating } from "@material-ui/lab";
import { OfferData } from "models/IOffer";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "router";
import styled, { DefaultTheme, css } from "styled-components";
import { getLabel } from "utils/Currency";
import { Numeral } from "components/Numeral";
import EditIcon from "@mui/icons-material/Edit";

interface OfferViewProps {
  offer: OfferData;
  isMy?: boolean;
}
export const OfferView = (props: OfferViewProps) => {
  const navigate = useNavigate();
  const { forPaymentArr } = useCurrencies();
  const { price } = useAppSelector((state) => state.currencyReducer);

  const { offer, isMy } = props;

  const getCurrencyPaymentMethods = () => {
    return (
      forPaymentArr.find((item) => item.code === offer.forPayment)
        ?.paymentMethodsList || []
    );
  };
  const isRevers = !(offer.price > 100);
  const getViewPrice = () => {
    const shouldReversePrice = isRevers;
    return shouldReversePrice ? 1 / offer.price : offer.price;
  };

  const getMainUnit = () => {
    return (
      forPaymentArr.find(
        (item) => item.code === (isRevers ? offer.forPayment : offer.currency)
      )?.label || <Skeleton width={50} />
    );
  };

  const getSecondUnit = () => {
    return (
      forPaymentArr.find(
        (item) => item.code === (isRevers ? offer.currency : offer.forPayment)
      )?.label || <Skeleton width={50} />
    );
  };
  const onGoToEditOffer = () => {
    navigate(`${RouteNames.EDITOFFER}/${offer._id}`);
  };
  const onGoToOffer = () => {
    navigate(`${RouteNames.OFFER}/${offer._id}`);
  };
  const getDistance = () => {
    if (!offer.distance) return 0;
    return Number(
      offer.distance % 1 === 0
        ? (offer.distance / 1000).toFixed(0)
        : (offer.distance / 1000).toFixed(1)
    );
  };
  console.log(222, offer);
  return (
    <Container>
      <StyledHeader>
        <ColumnContainer>
          <PriceRow>
            <Price value={getViewPrice()} />
            <span>{getMainUnit()}</span>
          </PriceRow>
          <Label>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <span>Цена за 1 {getSecondUnit()}</span>

              <IconsContainer>
                {offer.sellerData.isAnOffice && <BusinessOutlinedIcon />}
                {offer.delivery.isDelivered && (
                  <DeliveryDiningOutlinedIcon sx={{ marginBottom: "-3px" }} />
                )}
              </IconsContainer>
            </div>
          </Label>
        </ColumnContainer>
        <ButtonContainer>
          {isMy ? (
            <MainButton
              handleClick={onGoToEditOffer}
              text=""
              icon={<EditIcon />}
            />
          ) : (
            <MainButton handleClick={onGoToOffer} text="Купить" />
          )}
        </ButtonContainer>
      </StyledHeader>
      <StyledBody>
        {!isMy && (
          <InfoRow>
            <LeftBlock>
              <Label>
                <Avatar avatar={offer?.sellerData?.avatar || ""} size={24} />
                {offer?.sellerData?.nickname}
              </Label>
            </LeftBlock>
            <RightBlock>
              <Value>
                {!!offer?.sellerData?.ratings?.average && (
                  <Grade>
                    <Price value={offer.sellerData.ratings.average} />
                  </Grade>
                )}
                <ColumnContainer style={{ gap: 0 }}>
                  <StyledRating
                    defaultValue={5}
                    value={offer.sellerData.ratings.average}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                  <GradeCount>
                    Всего оценок{" "}
                    <Secondary>
                      <Price value={offer.sellerData.ratings.count} />
                    </Secondary>
                  </GradeCount>
                </ColumnContainer>
              </Value>
            </RightBlock>
          </InfoRow>
        )}
        {!!offer.comment && (
          <InfoRow>
            <LeftBlock>
              <Label>
                <Comment>{offer.comment}</Comment>
              </Label>
            </LeftBlock>
          </InfoRow>
        )}
        <div style={{ marginBottom: "8px" }}></div>
        {!!offer.paymentMethods?.length && (
          <InfoRow>
            <LeftBlock>
              <Label>Оплата</Label>
            </LeftBlock>
            <RightBlock>
              <GradeCount>
                {offer.paymentMethods.map((item) => (
                  <span>{getLabel(getCurrencyPaymentMethods(), item)}</span>
                ))}
              </GradeCount>
            </RightBlock>
          </InfoRow>
        )}
        <InfoRow>
          <LeftBlock>
            <Label>Лимиты</Label>
          </LeftBlock>
          <RightBlock>
            <Value>
              {/* <Price value={offer.minQuantity} /> */}
              <Numeral value={offer.minQuantity} />
              {" - "}
              {/* <Price value={offer.quantity} /> */}
              <Numeral value={offer.quantity} />
              <span>{!isRevers ? getMainUnit() : getSecondUnit()}</span>
            </Value>
          </RightBlock>
        </InfoRow>

        {offer.distance && (
          <InfoRow>
            <LeftBlock>
              <Label>От вас</Label>
            </LeftBlock>
            <RightBlock>
              <Value>
                <span>≈</span>
                <Price value={getDistance()} />
                <span>km</span>
              </Value>
            </RightBlock>
          </InfoRow>
        )}
        {offer?.delivery?.distance && (
          <InfoRow>
            <LeftBlock>
              <Label>Доставка</Label>
            </LeftBlock>
            <RightBlock>
              <Value>
                <span>до</span>
                <Price value={offer?.delivery?.distance} />
                <span>km</span>
                {offer?.delivery.price ? (
                  <Label>
                    <Secondary>
                      <Price value={offer?.delivery?.price} />
                    </Secondary>
                    <span>{isRevers ? getMainUnit() : getSecondUnit()}</span>
                  </Label>
                ) : (
                  <Label></Label>
                )}
              </Value>
            </RightBlock>
          </InfoRow>
        )}
      </StyledBody>
    </Container>
  );
};

const Container = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    color: ${theme.palette.text.primary};
    display: flex;
    flex-direction: column;
    gap: 1px;
    position: relative;
  `}
`;
const StyledHeader = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    background-color: ${theme.palette.background.secondary};

    border-radius: 12px 12px 0 0;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `}
`;
const StyledBody = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    background-color: ${theme.palette.background.secondary};
    /* min-height: 128px; */
    border-radius: 0 0 12px 12px;
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  `}
`;
const PriceRow = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    color: ${theme.palette.text.primary};
    font-size: 28px;
    display: flex;
    gap: 8px;
    & * {
      font-family: ui-rounded, sans-serif !important;
    }
  `}
`;
const ColumnContainer = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `}
`;

const ButtonContainer = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    display: flex;
  `}
`;
const InfoRow = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `}
`;
const Value = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    color: ${theme.palette.text.primary};
    font-weight: 300;
    font-size: 16px;
    flex: 1;
    display: flex;
    gap: 8px;
    align-items: center;
  `}
`;
const Label = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    color: ${theme.palette.text.secondary};
    font-size: 16px;
    font-weight: 300;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 4px;
  `}
`;
const Comment = styled.div`
  white-space: normal;
  line-height: 16px;
`;
const GradeCount = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    color: ${theme.palette.text.secondary};
    font-size: 13px;
    font-weight: 300;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
  `}
`;

const Secondary = styled.span`
  ${({ theme }: { theme: DefaultTheme }) => css`
    & * {
      color: ${theme.palette.text.secondary} !important;
    }
  `}
`;
const Grade = styled.div`
  & {
    font-size: 28px;
  }
`;
const StyledRating = styled(Rating)(({ theme }) => ({
  "&": {
    fontSize: "12px",
  },
  "& .MuiRating-iconFilled": {
    color: theme.palette.button.primary,
  },
  "& .MuiRating-iconHover": {
    color: theme.palette.button.primary,
  },
}));
const LeftBlock = styled.div`
  flex: 3;
`;
const RightBlock = styled.div`
  flex: 4;
`;
const IconsContainer = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    display: flex;
    gap: 8px;
    align-items: center;
    & svg {
      fill: ${theme.palette.button.primary};
    }
    padding-left: 8px;
  `}
`;