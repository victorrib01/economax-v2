import { Checkbox } from "antd";
import styled from "styled-components";

export const Title = styled.h2`
  font-size: 20px;
  line-height: 20px;
  font-weight: 700;
  color: var(--darkGray);
  margin-bottom: 8px;
`;

export const SubTitle = styled.p`
  font-size: 14px;
  line-height: 14px;
  color: var(--darkGray);
  margin-bottom: 32px;
`;

export const NewSessionTitle = styled.h2`
  font-size: 14px;
  line-height: 22px;
  font-weight: 700;
  color: var(--darkGray);
  margin-top: 32px;
  margin-bottom: 24px;
`;
export const BottomWrapper = styled.div`
  /* position: absolute; */
  /* bottom: 24px;
  left: 16px;
  right: 16px; */
`;
export const CheckboxCustom = styled(Checkbox)`
  & + & {
    margin-top: 8px;
  }
`;
