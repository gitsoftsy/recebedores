export default function Step1() {
  return (
    <div>
      <input
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        className="input"
        required
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        placeholder="Email Address"
        className="input"
        required
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        type="tel"
        placeholder="Phone Number"
        className="input"
        required
      />
    </div>
  );
}
