import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  CONFIRM_PAID_REQUEST,
  FETCH_DISTRICTS,
  FETCH_PROVINCES,
  FETCH_WARDS,
  PLACE_ORDER_REQUEST,
} from './constants';
import {
  confirmPaidFailure,
  confirmPaidSuccess,
  fetchDistrictsSuccess,
  fetchProvincesSuccess,
  fetchWardsSuccess,
  placeOrderFailure,
  placeOrderSuccess,
} from './actions';
import { firebase, db } from '../../firebaseConfig';
import axios from 'axios';

const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send';
const EMAILJS_SERVICE_ID = 'service_vt7h6ab';
const EMAILJS_TEMPLATE_ID = 'template_ouji7r8'; // làm 1 template dùng chung
const EMAILJS_PUBLIC_KEY = 'NjlIq0wLSb7wtpDzb';

function* fetchProvincesSaga() {
  const response = yield call(() =>
    axios.get('https://provinces.open-api.vn/api/p/'),
  );
  yield put(fetchProvincesSuccess(response.data));
}

function* fetchDistrictsSaga(action) {
  const response = yield call(() =>
    axios.get(
      `https://provinces.open-api.vn/api/p/${action.provinceCode}?depth=2`,
    ),
  );
  yield put(fetchDistrictsSuccess(response.data.districts));
}

function* fetchWardsSaga(action) {
  const response = yield call(() =>
    axios.get(
      `https://provinces.open-api.vn/api/d/${action.districtCode}?depth=2`,
    ),
  );
  yield put(fetchWardsSuccess(response.data.wards));
}

function sendViaEmailJS({ to, subject, html, bcc = '' }) {
  if (!isEmail(to)) {
    return Promise.reject(new Error('EMPTY_OR_INVALID_TO_EMAIL'));
  }

  const template_params = {
    to_email: to, // phải khớp template
    subject,
    message_html: html,
  };
  if (isEmail(bcc)) template_params.admin_bcc = bcc; // chỉ set khi có

  return fetch(EMAILJS_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY, // public key
      template_params,
    }),
  }).then(async res => {
    if (!res.ok) throw new Error(await res.text());
    return true;
  });
}

const BANK_CODE = 'VCB'; // ví dụ VCB, TCB, BIDV...
const BANK_ACCOUNT = '2222262679'; // số tài khoản
const BANK_ACCOUNT_NAME = 'CONG TY CO PHAN THUONG MAI AN NHIEN LOGI';
const SHOP_NAME = 'VinFast An Nhiên';
const MAIL_ADMIN = 'anhquannguyen303@gmail.com';
const vnd = n => Number(n || 0).toLocaleString('vi-VN') + 'đ';
const isEmail = s => typeof s === 'string' && /\S+@\S+\.\S+/.test(s);

const pad = n => String(n).padStart(2, '0');
const makeRef = () => {
  const d = new Date();
  return `VF-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(
    d.getDate(),
  )}-${Math.floor(100000 + Math.random() * 900000)}`;
};

function buildVietQR(amount, addInfo) {
  return (
    `https://img.vietqr.io/image/${BANK_CODE}-${BANK_ACCOUNT}-qr_only.png` +
    `?amount=${amount}` +
    `&addInfo=${encodeURIComponent(addInfo)}` +
    `&accountName=${encodeURIComponent(BANK_ACCOUNT_NAME)}`
  );
}

function* placeOrderSaga({ payload }) {
  try {
    const { method, items, amount, customer, shipping, note } = payload;

    const orderId = makeRef(); // ví dụ: VF-20250820-123456
    const transferContent = orderId;
    const qrUrl = method === 'bank' ? buildVietQR(amount, transferContent) : '';

    const orderDoc = {
      orderId,
      items,
      amount,
      customer,
      shipping,
      note: note || '',
      payment: { method, transferContent },
      status: method === 'bank' ? 'pending' : 'cod_pending',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(), // v8
    };

    // v8: dùng collection().doc().set()
    const ref = db.collection('orders').doc(orderId);
    yield call(() => ref.set(orderDoc));

    yield put(placeOrderSuccess({ ...orderDoc, qrUrl }));
  } catch (err) {
    console.log('placeOrderSaga error:', err);
    yield put(placeOrderFailure(err?.message || 'PLACE_ORDER_FAILED'));
  }
}

// (services/firebaseApp khởi tạo v8: import 'firebase/app'; import 'firebase/firestore'; ...)

const buildEmailHtml = (order, qrUrl) => {
  const {
    orderId,
    items = [], // [{name, qty, price}]
    amount = 0,
    payment = {}, // { method: 'bank'|'cod', transferContent }
    customer = {}, // { name, phone, email? }
    shipping = {}, // { address, ward, district, city }
    note = '',
  } = order || {};

  const rows = items
    .map(
      i => `
    <tr>
      <td style="padding:6px 0">${i.name} × ${i.qty}</td>
      <td style="padding:6px 0;text-align:right">${vnd(i.price * i.qty)}</td>
    </tr>
  `,
    )
    .join('');

  const payBlock =
    payment.method === 'bank'
      ? `
      <p><b>Nội dung chuyển khoản:</b> ${payment.transferContent || ''}</p>
      <p><b>Tài khoản nhận:</b> ${BANK_CODE} - ${BANK_ACCOUNT} - ${BANK_ACCOUNT_NAME}</p>
      ${
        qrUrl
          ? `<p><img src="${qrUrl}" alt="QR thanh toán" style="width:220px;height:220px;border-radius:8px" /></p>`
          : ''
      }
    `
      : `<p>Thanh toán khi nhận hàng (COD)</p>`;

  const fullAddr = [
    shipping.address || '',
    shipping.ward || '',
    shipping.district || '',
    shipping.city || '',
  ]
    .filter(Boolean)
    .join(', ');

  return `
  <div style="font-family:Inter,Arial,sans-serif;max-width:700px;margin:auto">
    <h2>${SHOP_NAME} – Đơn hàng #${orderId || ''}</h2>

    <table style="width:100%;border-collapse:collapse">
      <tbody>${rows}</tbody>
      <tfoot>
        <tr>
          <td style="padding-top:8px">Tổng</td>
          <td style="padding-top:8px;text-align:right"><b>${vnd(
            amount,
          )}</b></td>
        </tr>
      </tfoot>
    </table>

    <hr style="margin:16px 0;border:none;border-top:1px solid #eee" />

    <h3>Thông tin thanh toán</h3>
    <p><b>Phương thức:</b> ${
      payment.method === 'bank'
        ? 'Chuyển khoản ngân hàng'
        : 'Thanh toán khi nhận hàng'
    }</p>
    ${payBlock}

    <h3>Thông tin người nhận</h3>
    <p>
      <b>Họ tên:</b> ${customer.name || ''}<br/>
      <b>Điện thoại:</b> ${customer.phone || ''}<br/>
      <b>Địa chỉ:</b> ${fullAddr}
    </p>

    <h3>Thông tin bổ sung</h3>
    <p>${(note || '-').toString().replace(/\n/g, '<br/>')}</p>

    <p style="color:#666;font-size:12px">
      Vui lòng chuyển đúng số tiền & nội dung để hệ thống tự động xác nhận.
    </p>
  </div>`;
};

function* confirmPaidSaga({ payload }) {
  try {
    const { orderId, qrUrl } = payload;

    // lấy đơn & cập nhật trạng thái như cũ...
    const ref = db.collection('orders').doc(orderId);
    const snap = yield call(() => ref.get());
    if (!snap.exists) throw new Error('ORDER_NOT_FOUND');
    const order = snap.data();

    yield call(() =>
      ref.update({
        status: 'paid_manual',
        paidAt: firebase.firestore.FieldValue.serverTimestamp(),
      }),
    );

    const html = buildEmailHtml(order, qrUrl || '');
    const subjectCustomer = `Xác nhận đơn hàng #${orderId} – ${SHOP_NAME}`;
    const subjectAdmin = `Đơn hàng mới #${orderId} – ${order?.customer?.name ||
      ''}`;

    const customerEmail = (order?.customer?.email || '').trim();

    if (isEmail(customerEmail)) {
      // 1 request/đơn: khách ở To, admin ở Bcc
      yield call(sendViaEmailJS, {
        to: customerEmail,
        bcc: adminEmail,
        subject: subjectCustomer,
        html,
      });
    } else {
      //KH không có email → gửi cho admin
      yield call(sendViaEmailJS, {
        to: adminEmail,
        subject: subjectAdmin,
        html,
      });
    }

    yield put(confirmPaidSuccess({ orderId }));
  } catch (err) {
    console.log('confirmPaidSaga error:', err);
    yield put(confirmPaidFailure(err?.message || 'CONFIRM_PAID_FAILED'));
  }
}

// Individual exports for testing
export default function* paymentSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(FETCH_PROVINCES, fetchProvincesSaga);
  yield takeLatest(FETCH_DISTRICTS, fetchDistrictsSaga);
  yield takeLatest(FETCH_WARDS, fetchWardsSaga);
  yield takeLatest(PLACE_ORDER_REQUEST, placeOrderSaga);
  yield takeLatest(CONFIRM_PAID_REQUEST, confirmPaidSaga);
}
