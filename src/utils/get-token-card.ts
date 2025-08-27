export const getCardTokenAsync = ({
  card_number,
  card_exp_month,
  card_exp_year,
  card_cvv,
}: any) => {
  return new Promise((resolve, reject) => {
    (window as any).MembershipNew3ds.getCardToken(
      { card_number, card_exp_month, card_exp_year, card_cvv },
      {
        onSuccess: (response: any) => {
          resolve(response.token_id);
        },
        onFailure: (response: any) => {
          reject(response);
        },
      }
    );
  });
};
