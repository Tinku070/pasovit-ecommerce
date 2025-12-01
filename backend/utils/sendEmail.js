import nodemailer from "nodemailer";

const sendOrderEmail = async (order, user) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  const itemsHtml = order.items
    .map(
      (item) =>
        `<li>${item.name} (${item.size}) x ${item.qty} - ₹${item.price}</li>`
    )
    .join("");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Order Confirmation - #${order._id}`,
    html: `
      <h1>Thank you for your order!</h1>
      <p>Order ID: ${order._id}</p>
      <p>Date: ${new Date(order.orderDate).toLocaleDateString()}</p>
      <h3>Items:</h3>
      <ul>${itemsHtml}</ul>
      <h2>Total: ₹${order.totalPrice}</h2>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendOrderEmail;
