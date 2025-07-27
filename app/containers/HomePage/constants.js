/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
import tool1 from '../../images/tool1.png';
import tool2 from '../../images/tool2.png';
import tool3 from '../../images/tool3.png';
import tool4 from '../../images/tool4.png';

export const CHANGE_USERNAME = 'boilerplate/Home/CHANGE_USERNAME';

export const products = [
  {
    name: 'Xe máy điện VinFast Motio',
    price: '12,000,000 đ',
    image: '/images/vinfast-motio.png',
  },
  {
    name: 'Xe máy điện VinFast Evo Lite Neo',
    price: '14.400.000 đ',
    image: '/images/vinfast-evo-lite-neo.png',
  },
  {
    name: 'Xe máy điện VinFast Evo Neo',
    price: '17.800.000 đ',
    image: '/images/vinfast-evo-neo.png',
  },
];

export const explore_products = [
  {
    name: 'Xe máy điện VinFast Motio',
    price: '12,000,000 đ',
    image: '/images/vinfast-motio.png',
  },
  {
    name: 'Xe máy điện VinFast Evo Lite Neo',
    price: '14.400.000 đ',
    image: '/images/vinfast-evo-lite-neo.png',
  },
  {
    name: 'Xe máy điện VinFast Evo Neo',
    price: '17.800.000 đ',
    image: '/images/vinfast-evo-neo.png',
  },
  {
    name: 'Xe máy điện VinFast Motio',
    price: '12,000,000 đ',
    image: '/images/vinfast-motio.png',
  },
  {
    name: 'Xe máy điện VinFast Evo Lite Neo',
    price: '14.400.000 đ',
    image: '/images/vinfast-evo-lite-neo.png',
  },
  {
    name: 'Xe máy điện VinFast Evo Neo',
    price: '17.800.000 đ',
    image: '/images/vinfast-evo-neo.png',
  },
];

export const services = [
  {
    icon: tool1,
    title: 'CHÍNH SÁCH BẢO HÀNH',
    description:
      'Chính sách mang lại những sửa chữa cần thiết, sử dụng những phụ tùng mới hoặc những phụ tùng tái chế cho xe của Khách hàng trong chế độ được bảo hành.',
  },
  {
    icon: tool2,
    title: 'DỊCH VỤ BẢO DƯỠNG',
    description:
      'Dịch vụ kiểm tra, bảo dưỡng một cách định kỳ để đảm bảo chiếc xe của Khách hàng luôn được vận hành hiệu quả.',
  },
  {
    icon: tool3,
    title: 'DỊCH VỤ SỬA CHỮA',
    description:
      'Vinfast An Nhiên cung cấp dịch vụ sửa chữa đối với những hư hỏng do va chạm mà chiếc xe của Khách hàng gặp phải trong quá trình sử dụng.',
  },
  {
    icon: tool4,
    title: 'PHỤ TÙNG & PHỤ KIỆN',
    description:
      'Vinfast An Nhiên cung cấp tất cả các phụ tùng, phụ kiện chính hãng của Vinfast.',
  },
];
