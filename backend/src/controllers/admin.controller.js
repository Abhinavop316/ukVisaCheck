/**
 * @desc    Admin login authentication using .env credentials
 * @route   POST /api/admin/login
 * @access  Public
 */
const adminLogin = async (req, res) => {
  try {
    const { username, id, password } = req.body;

    const inputUser = (username || id || "").trim();
    const inputPass = (password || "").trim();

    if (!inputUser || !inputPass) {
      return res.status(400).json({
        success: false,
        message: "Please provide both admin username/ID and password.",
      });
    }

    const envAdminUser = (process.env.ADMIN_USERNAME || process.env.ADMIN_ID || "admin").trim();
    const envAdminPass = (process.env.ADMIN_PASSWORD || "admin123").trim();

    if (inputUser !== envAdminUser || inputPass !== envAdminPass) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials. Access denied.",
      });
    }

    // Generate token string
    const token = `admin_session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    return res.status(200).json({
      success: true,
      message: "Admin authentication successful",
      token,
      admin: {
        username: envAdminUser,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error during admin authentication",
    });
  }
};

module.exports = {
  adminLogin,
};
