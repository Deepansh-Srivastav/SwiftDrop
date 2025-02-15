const forgotPasswordOTPTemplate = ({ name, otp }) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password OTP</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f0faff;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 15px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
            overflow: hidden;
            border: 1px solid #d1ecf1;
        }
        .header {
            background-color: #17a2b8;
            color: white;
            padding: 25px;
            text-align: center;
            font-size: 26px;
            font-weight: bold;
        }
        .content {
            padding: 25px;
            color: #333333;
        }
        .content p {
            font-size: 16px;
            line-height: 1.8;
        }
        .otp-box {
            background-color: #e2f3f5;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            letter-spacing: 4px;
            color: #17a2b8;
            margin: 20px 0;
        }
        .footer {
            background-color: #d1ecf1;
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #666666;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            SwiftDrop Password Reset
        </div>
        <div class="content">
            <p>Hello <strong>${name}</strong>,</p>
            <p>You have requested to reset your password. Please use the OTP below to proceed:</p>
            <div class="otp-box">${otp}</div>
            <p>This OTP is valid for 10 minutes. If you did not request a password reset, please ignore this email.</p>
        </div>
        <div class="footer">
            &copy; 2025 SwiftDrop. All rights reserved.
        </div>
    </div>
</body>
</html>
`
}

export default forgotPasswordOTPTemplate;
