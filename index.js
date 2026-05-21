const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    message: "🚀 Testing CI/CD Pipeline!",
    status: "All systems operational",
    deployedAt: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});