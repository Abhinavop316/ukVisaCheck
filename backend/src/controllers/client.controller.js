const Client = require("../models/client");

/**
 * Helper to produce clean user-facing server error messages
 */
const handleServerError = (res, error, defaultMessage = "An error occurred while processing your request.") => {
  console.error("Internal Server Error:", error);
  return res.status(500).json({
    success: false,
    message: "There is a temporary issue connecting to the immigration database service. Please try again in a few moments.",
  });
};

/**
 * @desc    Create a new client application
 * @route   POST /api/clients
 * @access  Public / Admin
 */
const createClient = async (req, res) => {
  try {
    const {
      Category,
      FullName,
      Email,
      Gender,
      Address,
      telephone,
      DOB,
      POB,
      CountryofCitizenship,
      PassportNumber,
      Status,
      Paragraph,
      photoUrl,
    } = req.body;

    // Validate required fields
    if (
      !FullName ||
      !Email ||
      !Address ||
      !telephone ||
      !DOB ||
      !POB ||
      !CountryofCitizenship ||
      !PassportNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const cleanPassport = PassportNumber.trim().toUpperCase();

    // Check if client with this passport number already exists
    const existingClient = await Client.findOne({
      PassportNumber: cleanPassport,
    });

    if (existingClient) {
      return res.status(400).json({
        success: false,
        message: `An application with Passport Number ${cleanPassport} already exists.`,
      });
    }

    const client = new Client({
      Category: Category || "Tourist Visa",
      FullName: FullName.trim(),
      Email: Email.trim().toLowerCase(),
      Gender: Gender || "Male",
      Address: Address.trim(),
      telephone: telephone.trim(),
      DOB,
      POB: POB.trim(),
      CountryofCitizenship: CountryofCitizenship.trim(),
      PassportNumber: cleanPassport,
      Status: Status || "Pending",
      photoUrl: photoUrl || "",
      Paragraph:
        Paragraph ||
        (Status === "Issued"
          ? "Your eVisa application has been successfully granted and issued."
          : "Currently the status is pending, the application is under review."),
    });

    const savedClient = await client.save();

    return res.status(201).json({
      success: true,
      message: "Application created successfully",
      client: savedClient,
    });
  } catch (error) {
    return handleServerError(res, error, "Failed to create application record.");
  }
};

/**
 * @desc    Update an existing client application by ID
 * @route   PUT /api/clients/:id
 * @access  Public / Admin
 */
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      Category,
      FullName,
      Email,
      Gender,
      Address,
      telephone,
      DOB,
      POB,
      CountryofCitizenship,
      PassportNumber,
      Status,
      Paragraph,
      photoUrl,
    } = req.body;

    const existingClient = await Client.findById(id);

    if (!existingClient) {
      return res.status(404).json({
        success: false,
        message: "Client application record not found.",
      });
    }

    // Check if updating passport number and it collides with another client
    if (PassportNumber) {
      const cleanPassport = PassportNumber.trim().toUpperCase();
      const duplicate = await Client.findOne({
        PassportNumber: cleanPassport,
        _id: { $ne: id },
      });

      if (duplicate) {
        return res.status(400).json({
          success: false,
          message: `Passport Number ${cleanPassport} is already used by another record.`,
        });
      }
      existingClient.PassportNumber = cleanPassport;
    }

    if (Category) existingClient.Category = Category;
    if (FullName) existingClient.FullName = FullName.trim();
    if (Email) existingClient.Email = Email.trim().toLowerCase();
    if (Gender) existingClient.Gender = Gender;
    if (Address) existingClient.Address = Address.trim();
    if (telephone) existingClient.telephone = telephone.trim();
    if (DOB) existingClient.DOB = DOB;
    if (POB) existingClient.POB = POB.trim();
    if (CountryofCitizenship) existingClient.CountryofCitizenship = CountryofCitizenship.trim();
    if (Status) existingClient.Status = Status;
    if (Paragraph !== undefined) existingClient.Paragraph = Paragraph;
    if (photoUrl !== undefined) existingClient.photoUrl = photoUrl;

    const updatedClient = await existingClient.save();

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
      client: updatedClient,
    });
  } catch (error) {
    return handleServerError(res, error, "Failed to update client application.");
  }
};

/**
 * @desc    Find client by Passport Number
 * @route   GET /api/clients/passport/:passportNumber or POST /api/clients/passport
 * @access  Public / Admin
 */
const getClientByPassport = async (req, res) => {
  try {
    const passportNumber =
      req.params.passportNumber ||
      req.query.passportNumber ||
      req.body.PassportNumber ||
      req.body.passportNumber;

    if (!passportNumber || !passportNumber.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a Passport Number to search.",
      });
    }

    const cleanPassport = passportNumber.trim().toUpperCase();
    const client = await Client.findOne({ PassportNumber: cleanPassport });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: `No application found for Passport Number: ${cleanPassport}`,
      });
    }

    return res.status(200).json(client);
  } catch (error) {
    return handleServerError(res, error, "Error fetching client record.");
  }
};

/**
 * @desc    Find client by Passport Number, Email, or identNum
 * @route   POST /api/get-client
 * @access  Public / Admin
 */
const getClientByQuery = async (req, res) => {
  try {
    const { PassportNumber, Email, identNum, passportNumber, email } = req.body;

    const pass = PassportNumber || passportNumber || identNum;
    const em = Email || email;

    const query = [];

    if (pass && pass.trim()) {
      query.push({ PassportNumber: pass.trim().toUpperCase() });
    }
    if (em && em.trim()) {
      query.push({ Email: em.trim().toLowerCase() });
    }

    if (query.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a Passport Number or Email to search.",
      });
    }

    const client = await Client.findOne({ $or: query });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "No client application record found matching your query.",
      });
    }

    return res.status(200).json(client);
  } catch (error) {
    return handleServerError(res, error, "Error fetching client application.");
  }
};

/**
 * @desc    Get all client applications
 * @route   GET /api/clients
 * @access  Admin
 */
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: clients.length,
      clients,
    });
  } catch (error) {
    return handleServerError(res, error, "Error fetching clients list.");
  }
};

/**
 * @desc    Get single client application by Mongo ID
 * @route   GET /api/clients/:id
 * @access  Public / Admin
 */
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client application record not found.",
      });
    }

    return res.status(200).json(client);
  } catch (error) {
    return handleServerError(res, error, "Error fetching client details.");
  }
};

/**
 * Temporary in-memory store for verification codes (with 10-minute expiry)
 */
const verificationCodeStore = new Map();

/**
 * Mask an email address for privacy display (e.g., j***e@example.com)
 */
const maskEmail = (email) => {
  if (!email || !email.includes("@")) return "your registered email";
  const [user, domain] = email.split("@");
  if (user.length <= 2) {
    return `${user[0]}***@${domain}`;
  }
  return `${user[0]}***${user[user.length - 1]}@${domain}`;
};

/**
 * @desc    Send 6-digit verification code to applicant's email using Resend
 * @route   POST /api/send-security-code
 * @access  Public
 */
const sendSecurityCode = async (req, res) => {
  try {
    const { passportNumber, PassportNumber, identNum } = req.body;
    const pass = passportNumber || PassportNumber || identNum;

    if (!pass || !pass.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid passport / document number.",
      });
    }

    const cleanPassport = pass.trim().toUpperCase();
    const client = await Client.findOne({ PassportNumber: cleanPassport });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "No application record found with this passport number in the UKVI database.",
      });
    }

    if (!client.Email) {
      return res.status(400).json({
        success: false,
        message: "No registered email address is linked to this application record.",
      });
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    verificationCodeStore.set(cleanPassport, {
      code,
      email: client.Email,
      expiresAt,
      attempts: 0,
    });

    const resendApiKey = process.env.RESEND_API || process.env.RESEND_API_KEY || process.env.RESEND;
    let emailSent = false;

    if (resendApiKey && resendApiKey.trim()) {
      try {
        const { Resend } = require("resend");
        const resend = new Resend(resendApiKey.trim());
        await resend.emails.send({
          from: "verification@contact.ukvisacheck.in",
          to: client.Email,
          subject: `${code} is your UKVI security code`,
          html: `
            <div style="font-family: Arial, Helvetica, sans-serif; max-width: 580px; margin: 0 auto; color: #0b0c0c; border: 1px solid #bfc1c3; padding: 30px; background-color: #ffffff;">
              <div style="border-bottom: 4px solid #1d70b8; padding-bottom: 16px; margin-bottom: 24px;">
                <span style="font-size: 22px; font-weight: bold; color: #0b0c0c;">GOV.UK</span>
                <span style="display: block; font-size: 16px; color: #505a5f; margin-top: 4px;">UK Visas and Immigration</span>
              </div>
              
              <h1 style="font-size: 20px; font-weight: bold; margin-bottom: 16px; color: #0b0c0c;">Your one-time security code</h1>
              
              <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Dear ${client.FullName},</p>
              
              <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                You requested a security code to sign in to your UK Visas and Immigration (UKVI) online account and view your immigration status (eVisa).
              </p>
              
              <div style="background-color: #f3f2f1; padding: 20px; border-left: 5px solid #1d70b8; margin: 25px 0; text-align: center;">
                <span style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #505a5f; display: block; margin-bottom: 8px;">Security Code</span>
                <span style="font-family: monospace, Courier, monospace; font-size: 34px; font-weight: bold; letter-spacing: 8px; color: #0b0c0c;">${code}</span>
              </div>
              
              <p style="font-size: 14px; color: #505a5f; line-height: 1.5;">
                This code will expire in <strong>10 minutes</strong>.
              </p>
              
              <p style="font-size: 14px; color: #505a5f; line-height: 1.5;">
                If you did not make this request, someone may have entered your document number by mistake. You can safely ignore this email.
              </p>
              
              <div style="border-top: 1px solid #bfc1c3; margin-top: 30px; padding-top: 16px; font-size: 12px; color: #6f777b;">
                This is an automated notification from the UK Visas and Immigration service. Please do not reply directly to this email.
              </div>
            </div>
          `,
        });
        emailSent = true;
        console.log(`[Resend] Security code successfully sent to ${client.Email}`);
      } catch (emailErr) {
        console.error("[Resend Error]:", emailErr);
      }
    } else {
      console.log(`[DEV MODE - No RESEND_API key in .env] Security code for ${cleanPassport} (${client.Email}) is: ${code}`);
    }

    return res.status(200).json({
      success: true,
      message: "A 6-digit security code has been sent to your registered email address.",
      maskedEmail: maskEmail(client.Email),
      passportNumber: cleanPassport,
      emailSent,
    });
  } catch (error) {
    return handleServerError(res, error, "Failed to send security code.");
  }
};

/**
 * @desc    Verify 6-digit code entered by user
 * @route   POST /api/verify-security-code
 * @access  Public
 */
const verifySecurityCode = async (req, res) => {
  try {
    const { passportNumber, PassportNumber, code } = req.body;
    const pass = passportNumber || PassportNumber;

    if (!pass || !code) {
      return res.status(400).json({
        success: false,
        message: "Please provide both passport number and the 6-digit security code.",
      });
    }

    const cleanPassport = pass.trim().toUpperCase();
    const cleanCode = code.toString().trim();

    const storedEntry = verificationCodeStore.get(cleanPassport);

    if (!storedEntry) {
      return res.status(400).json({
        success: false,
        message: "No security code was requested for this passport, or it has expired. Please request a new code.",
      });
    }

    if (Date.now() > storedEntry.expiresAt) {
      verificationCodeStore.delete(cleanPassport);
      return res.status(400).json({
        success: false,
        message: "Your security code has expired. Please request a new security code.",
      });
    }

    if (storedEntry.code !== cleanCode) {
      storedEntry.attempts = (storedEntry.attempts || 0) + 1;
      if (storedEntry.attempts >= 5) {
        verificationCodeStore.delete(cleanPassport);
        return res.status(400).json({
          success: false,
          message: "Too many incorrect attempts. Please request a new security code.",
        });
      }
      return res.status(400).json({
        success: false,
        message: "The 6-digit security code entered is incorrect.",
      });
    }

    // Code matched! Delete used code
    verificationCodeStore.delete(cleanPassport);

    const client = await Client.findOne({ PassportNumber: cleanPassport });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client application record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Security code verified successfully.",
      client,
    });
  } catch (error) {
    return handleServerError(res, error, "Failed to verify security code.");
  }
};

module.exports = {
  createClient,
  updateClient,
  getClientByPassport,
  getClientByQuery,
  getAllClients,
  getClientById,
  sendSecurityCode,
  verifySecurityCode,
};
