import Contact from "../models/identify.models.js";

class IdentifyRepository {

  async create(data) {
    return await Contact.create(data);
  }

  // ✅ Find ALL contacts by email OR phone
  async findByEmailOrPhone(email, phoneNumber) {
    const query = [];

    if (email) query.push({ email });
    if (phoneNumber) query.push({ phoneNumber });

    return await Contact.find({
      $or: query
    }).sort({ createdAt: 1 }); // oldest first
  }

  // ✅ Get all linked contacts (primary + secondary)
  async findLinkedContacts(primaryId) {
    return await Contact.find({
      $or: [
        { _id: primaryId },
        { linkedId: primaryId }
      ]
    }).sort({ createdAt: 1 });
  }

  // ✅ Optional: still keep these if needed
  async findByEmail(email) {
    return await Contact.find({ email });
  }

  async findByPhoneNumber(phoneNumber) {
    return await Contact.find({ phoneNumber });
  }

  async findById(id) {
    return await Contact.findById(id);
  }

  // ✅ Update (useful for merging primaries)
  async update(id, data) {
    return await Contact.findByIdAndUpdate(id, data, { new: true });
  }
}

export default IdentifyRepository;