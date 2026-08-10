import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { amount, description, orderId, metadata } = await request.json();

    const shopId = process.env.YOOKASSA_SHOP_ID;
    const secretKey = process.env.YOOKASSA_SECRET_KEY;

    if (!shopId || !secretKey) {
      return NextResponse.json({ error: 'Нет ключей ЮKassa' }, { status: 500 });
    }

    const auth = Buffer.from(`${shopId}:${secretKey}`).toString('base64');

    const response = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
        'Idempotence-Key': orderId,
      },
      body: JSON.stringify({
        amount: {
          value: amount.toFixed(2),
          currency: 'RUB',
        },
        capture: true,
        confirmation: {
          type: 'redirect',
          return_url: `https://evseev.store/success`, 
        },
        description: description,
        metadata: metadata || {}, // Сохраняем данные клиента в платеже ЮKassa
      }),
    });

    const data = await response.json();

    if (data.confirmation && data.confirmation.confirmation_url) {
      return NextResponse.json({ url: data.confirmation.confirmation_url });
    } else {
      console.error('YooKassa Error:', data);
      return NextResponse.json({ error: 'Ошибка ЮKassa' }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}