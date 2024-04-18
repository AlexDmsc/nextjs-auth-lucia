export const passwordResetTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Password Reset Request</title>
<style>
  body { font-family: Arial, sans-serif; line-height: 1.6; }
  .container { width: 100%; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; }
  .button { background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; display: inline-block; font-size: 16px; margin: 10px 0; cursor: pointer; text-decoration: none; }
</style>
</head>
<body>
<div class="container">
  <h1>Password Reset Request</h1>
  <p>Hello {{name}},</p>
  <p>You have requested a password reset for your account. Please click on the link below to reset your password.</p>
  <a href="{{ resetLink }}" class="button">Reset My Password</a>
  <p>If you did not request a password reset, please ignore this email or contact us. The password reset link will expire in 2 hours.</p>
  <p>Thank you</p>
  <p>Alex Dmsc</p>
</div>
</body>
</html>
`;
