import { useEffect, useState } from "react";
import "./Reports.css";

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/reports")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        return response.json();
      })
      .then((data) => {
        setReports(data);
      })
      .catch(() => {
        setError("Unable to load reports. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="reports-message">Loading reports...</p>;
  }

  if (error) {
    return <p className="reports-message error-message">{error}</p>;
  }

  return (
    <main className="reports-page">
      <h1>Reported Issues</h1>
      <p className="reports-intro">
        View reported public infrastructure issues.
      </p>

      {reports.length === 0 ? (
        <p className="reports-message">No reports submitted yet.</p>
      ) : (
        <div className="reports-grid">
          {reports.map((report) => (
            <article className="report-card" key={report._id}>
              <div className="report-card-header">
                <h2>{report.issueType}</h2>
                <span className="report-status">
                  {report.status || "Pending"}
                </span>
              </div>

              <p className="report-description">
                {report.description}
              </p>

              
              {report.image && (
                 <img
                 src={`http://localhost:5000${report.image}`}
                 alt={`${report.issueType} issue`}
                 className="report-image"
                />
              )}


              <div className="report-location">
                <p>
                  <strong>Location:</strong>{" "}
                  {[report.street, report.area, report.district, report.state]
                    .filter(Boolean)
                    .join(", ") || "Not provided"}
                </p>

                {report.issueDate && (
                  <p>
                    <strong>Issue Date:</strong>{" "}
                    {new Date(report.issueDate).toLocaleDateString("en-IN")}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Reports;
