export const deliveryOptions = [{
    id : '1',
    day: 7,
    Price : 0
},{
    id : '2',
    day: 2,
    Price : 499
},{
    id : '3',
    day: 1,
    Price : 999
}];
export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;
  
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });
    // console.log(deliveryOption)
    return deliveryOption;
  }