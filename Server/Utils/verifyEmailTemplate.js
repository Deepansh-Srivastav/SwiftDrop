const verifyEmailTemplate = ({ name, url }) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f7fc;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 6px 12px rgba(0,0,0,0.15);
            border: 1px solid #e0d7f9;
            overflow: hidden;
        }
        .header {
            background-color: #a685e2;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
        }
        .content {
            padding: 20px;
            color: #555555;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 25px;
            background-color: #a685e2;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-size: 16px;
            box-shadow: 0 4px 8px rgba(166,133,226,0.3);
        }
        .footer {
            background-color: #f1ebfa;
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            SwiftDrop Email Verification
        </div>
        <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for registering with SwiftDrop! Please verify your email address to complete your registration.</p>
            <p><a href=${url} class="button">Verify Email</a></p>
            <p>If you did not sign up for SwiftDrop, please ignore this email.</p>
        </div>
        <div class="footer">
            &copy; 2025 SwiftDrop. All rights reserved.
        </div>
    </div>
</body>
</html>
`
}

export default verifyEmailTemplate