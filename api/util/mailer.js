const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_PASS,
  }
});

const sendEmail = async (email, token, type) => {
  let link;
  let subject;
  let message;
  if (type === 'verify') {
    link = `${process.env.CLIENT_URL}/verify-email/${token}`;
    subject = "メールアドレスの確認";
    message = `<p>リンクをクリックしてメール認証を完了してください</p>`
  } else if (type === 'reset') {
    link = `${process.env.CLIENT_URL}/reset-password/${token}`;
    subject = 'パスワードリセットのご案内';
    message = `<p>リンクをクリックしてパスワードリセットをしてください</p>`;
  };
  const mailOptions = {
    from: process.env.APP_EMAIL,
    to: email,
    subject: subject,
    html: `${message}<a href="${link}">${link}</a>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('メールを送信しました');
  } catch (error) {
    console.error('メール送信エラー', error);
  }
};

module.exports = sendEmail;