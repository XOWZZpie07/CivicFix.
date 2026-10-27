import { useState } from "react";

function ReportIssue() {
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [street, setStreet] = useState("");
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toLocaleDateString("en-CA");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (image && image.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size should be less than 5 MB.");
      return;
    }

    if (
      image &&
      !["image/jpeg", "image/png", "image/webp"].includes(image.type)
    ) {
      setErrorMessage("Only JPG, PNG and WEBP images are allowed.");
      return;
    }

    const complaintData = new FormData();

    complaintData.append("issueType", issueType);
    complaintData.append("description", description);
    complaintData.append("issueDate", issueDate);
    complaintData.append("state", state.trim());
    complaintData.append("district", district.trim());
    complaintData.append("area", area.trim());
    complaintData.append("street", street.trim());

    if (image) {
      complaintData.append("image", image);
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        body: complaintData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit complaint.");
      }

      setSuccessMessage("Complaint submitted successfully!");

      setIssueType("");
      setDescription("");
      setIssueDate("");
      setState("");
      setDistrict("");
      setArea("");
      setStreet("");
      setImage(null);

      e.target.reset();
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage(
        error.message || "Something went wrong while submitting the complaint."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Report an Issue</h1>
      <p>Report a public infrastructure issue.</p>

      {successMessage && (
        <p role="status" style={{ color: "green" }}>
          {successMessage}
        </p>
      )}

      {errorMessage && (
        <p role="alert" style={{ color: "red" }}>
          {errorMessage}
        </p>
      )}

      <label htmlFor="issueType">Issue Type</label>
      <select
        id="issueType"
        value={issueType}
        onChange={(e) => setIssueType(e.target.value)}
        required
      >
        <option value="">Select an issue type</option>
        <option value="pothole">Pothole</option>
        <option value="streetlight">Streetlight</option>
        <option value="water-leak">Water Leak</option>
        <option value="footpath">Footpath</option>
        <option value="open-drain">Open Drain</option>
        <option value="other">Other</option>
      </select>

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        minLength={10}
        required
      />

      <label htmlFor="issueDate">Issue Date</label>
      <input
        id="issueDate"
        type="date"
        value={issueDate}
        onChange={(e) => setIssueDate(e.target.value)}
        max={today}
        required
      />

      <label htmlFor="image">Issue Image (optional)</label>
      <input
        id="image"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => setImage(e.target.files[0] || null)}
      />
      <small>JPG, PNG or WEBP. Maximum size: 5 MB.</small>

      <label htmlFor="state">State</label>
      <input
        id="state"
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
      />

      <label htmlFor="district">District</label>
      <input
        id="district"
        type="text"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        required
      />

      <label htmlFor="area">Area</label>
      <input
        id="area"
        type="text"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        required
      />

      <label htmlFor="street">Street</label>
      <input
        id="street"
        type="text"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        required
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default ReportIssue;
