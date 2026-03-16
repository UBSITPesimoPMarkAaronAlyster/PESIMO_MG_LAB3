import { useState, useRef, type FormEvent, type ChangeEvent } from "react";
import "./App.css";

interface BookRequest {
  studentName: string;
  studentId: string;
  bookTitle: string;
  author: string;
  reason: string;
}

function App() {

  // Controlled Form State
  const [studentName, setStudentName] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [bookTitle, setBookTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  const [submittedRequests, setSubmittedRequests] = useState<BookRequest[]>([]);

  // Uncontrolled Form Refs
  const nameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const reasonRef = useRef<HTMLTextAreaElement>(null);

  // Controlled Submit
  const handleControlledSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!studentName || !studentId || !bookTitle || !author || !reason) {
      alert("Please fill out all fields.");
      return;
    }

    const newRequest: BookRequest = {
      studentName,
      studentId,
      bookTitle,
      author,
      reason
    };

    setSubmittedRequests([...submittedRequests, newRequest]);

    setStudentName("");
    setStudentId("");
    setBookTitle("");
    setAuthor("");
    setReason("");
  };

  // Uncontrolled Submit
  const handleUncontrolledSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nameRef.current && idRef.current && titleRef.current && authorRef.current && reasonRef.current) {

      if (nameRef.current.value === "" || idRef.current.value === "" || titleRef.current.value === "" || authorRef.current.value === "" || reasonRef.current.value === "") {
        alert("Please fill out all fields.");
        return;
      }

      const data: BookRequest = {
        studentName: nameRef.current.value,
        studentId: idRef.current.value,
        bookTitle: titleRef.current.value,
        author: authorRef.current.value,
        reason: reasonRef.current.value
      };

      console.log("Uncontrolled Form Data:", data);
      alert("Check console for submitted request.");
    }
  };

  return (
    <div className="mt-4">

      <h1 className="mb-4">Library Book Request Form</h1>

      {/* Controlled Form */}
      <div className="p-4 mb-4">

        <h2 className="mb-3">Controlled Book Request Form</h2>
        <form onSubmit={handleControlledSubmit}>

          <div className="mb-3">
            <label className="form-label">Student Name</label>
            <input
              type="text"
              className="form-control"
              value={studentName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setStudentName(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Student ID</label>
            <input
              type="text"
              className="form-control"
              value={studentId}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setStudentId(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Book Title</label>
            <input
              type="text"
              className="form-control"
              value={bookTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBookTitle(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              className="form-control"
              value={author}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAuthor(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Reason for Request</label>
            <textarea
              className="form-control"
              value={reason}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setReason(e.target.value)
              }
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Request
          </button>

        </form>
      </div>

      {/* Display Submitted Requests */}
      {submittedRequests.length > 0 && (
        <div className="p-4 mb-4">

          <h3>Submitted Book Requests</h3>

          {submittedRequests.map((req, index) => (
            <div key={index} className="p-3 mb-3">

              <p><strong>Name:</strong> <span>{req.studentName}</span></p>
              <p><strong>ID:</strong> <span>{req.studentId}</span></p>
              <p><strong>Book:</strong> <span>{req.bookTitle}</span></p>
              <p><strong>Author:</strong> <span>{req.author}</span></p>
              <p><strong>Reason:</strong> <span>{req.reason}</span></p>

            </div>
          ))}

        </div>
      )}

      {/* Uncontrolled Form */}
      <div className="p-4">

        <h2 className="mb-3">Uncontrolled Book Request Form</h2>
        <form onSubmit={handleUncontrolledSubmit}>

          <div className="mb-3">
            <label className="form-label">Student Name</label>
            <input type="text" className="form-control" ref={nameRef} />
          </div>

          <div className="mb-3">
            <label className="form-label">Student ID</label>
            <input type="text" className="form-control" ref={idRef} />
          </div>

          <div className="mb-3">
            <label className="form-label">Book Title</label>
            <input type="text" className="form-control" ref={titleRef} />
          </div>

          <div className="mb-3">
            <label className="form-label">Author</label>
            <input type="text" className="form-control" ref={authorRef} />
          </div>

          <div className="mb-3">
            <label className="form-label">Reason for Request</label>
            <textarea className="form-control" ref={reasonRef} />
          </div>

          <button type="submit" className="btn btn-secondary">Submit Request</button>
        </form>
      </div>
    </div>
  );
}

export default App;