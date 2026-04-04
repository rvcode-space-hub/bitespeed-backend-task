import IdentifyService from "../services/identify.service.js";

const identifyService = new IdentifyService();

export const identifyContact = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    // ✅ Validation
    if (!email && !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Email or PhoneNumber is required"
      });
    }

    // ✅ Step 1: Create / link contact
    const primaryContact = await identifyService.createContact({
      email,
      phoneNumber
    });

    // ✅ Step 2: Get all linked contacts
    const linkedContacts = await identifyService.repo.findLinkedContacts(
      primaryContact._id
    );

    // ✅ Step 3: Build response
    const emails = new Set();
    const phoneNumbers = new Set();

    const secondaryContactIds = [];

    linkedContacts.forEach(contact => {
      if (contact.email) emails.add(contact.email);
      if (contact.phoneNumber) phoneNumbers.add(contact.phoneNumber);

      if (contact.linkPrecedence === "secondary") {
        secondaryContactIds.push(contact._id);
      }
    });

    // ✅ Final Response
    return res.status(200).json({
      contact: {
        primaryContactId: primaryContact._id,
        emails: [...emails],
        phoneNumbers: [...phoneNumbers],
        secondaryContactIds
      }
    });

  } catch (error) {
    console.error("Identify Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};