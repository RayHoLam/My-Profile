const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit-survey', (req, res) => {
    const { satisfaction, favoritePart, features, usability, feedback } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'lawholam670@example.com',
        subject: '網站問卷反饋',
        text: `
            滿意度: ${satisfaction}
            最喜歡的部分: ${favoritePart}
            希望增加的功能: ${features}
            可用性評價: ${usability}
            其他意見: ${feedback}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('發送失敗');
        }
        res.status(200).send('成功發送');
    });
});

app.listen(PORT, () => {
    console.log(`伺服器在 http://localhost:${PORT} 上運行`);
});