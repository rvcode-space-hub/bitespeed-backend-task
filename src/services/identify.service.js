import IdentifyRepository from "../repositories/identify.repositorie.js";

class IdentifyService {
  constructor() {
    this.repo = new IdentifyRepository();
  }

  async createContact(userdata) {
    const { email, phoneNumber } = userdata;

    // 1. Find all matching contacts
    const existingContacts = await this.repo.findByEmailOrPhone(email, phoneNumber);

    // 2. No contact exists → create primary
    if (!existingContacts.length) {
      return await this.repo.create({
        ...userdata,
        linkPrecedence: "primary",
      });
    }

    // 3. Find primary contact
    let primary = existingContacts.find(c => c.linkPrecedence === "primary");

   // Agar nahi mila → oldest ko primary banao
if (!primary) {
  primary = existingContacts.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  )[0];
}


if (primary.linkedId) {
  primary = await this.repo.findById(primary.linkedId);
}
    // 4. Check if same data already exists
    const alreadyExists = existingContacts.some(
      c => c.email === email && c.phoneNumber === phoneNumber
    );


    // ✅ Agar already exist hai → kuch mat karo
    if (alreadyExists) {
      return primary;
    }

    await this.repo.create({
      email,
      phoneNumber,
      linkedId: primary._id,
      linkPrecedence: "secondary",
    });

    return primary;


  }

  async findById(id) {
    return await this.repo.findById(id);
  }
}

export default IdentifyService;