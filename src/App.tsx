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

  // Controlled form state
  const [studentName, setStudentName] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [bookTitle, setBookTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  const [submittedRequests, setSubmittedRequests] = useState<BookRequest[]>([]);

  // Uncontrolled form refs
  const nameRef = useRef<HTMLInputElement>(null); 
  const idRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const reasonRef = useRef<HTMLTextAreaElement>(null);

  // Controlled submit
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

  // Uncontrolled submit
  const handleUncontrolledSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nameRef.current && idRef.current && titleRef.current && authorRef.current && reasonRef.current) {

      if (nameRef.current.value === "" || idRef.current.value === "" || titleRef.current.value === "" || authorRef.current.value === "" || reasonRef.current.value === "" ) {
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
    <div style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1>Library Book Request Form</h1>

      {/* Controlled Form */}
      <h2>Controlled Form</h2>
      <form onSubmit={handleControlledSubmit}>
        <div>
          <label>Student Name:</label><br />
          <input
            type="text"
            value={studentName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStudentName(e.target.value)
            }
          />
        </div>
        <br/>

        <div>
          <label>Student ID:</label><br />
          <input
            type="text"
            value={studentId}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStudentId(e.target.value)
            }
          />
        </div>
        <br/>

        <div>
          <label>Book Title:</label><br />
          <input
            type="text"
            value={bookTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setBookTitle(e.target.value)
            }
          />
        </div>
        <br/>

        <div>
          <label>Author:</label><br />
          <input
            type="text"
            value={author}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAuthor(e.target.value)
            }
          />
        </div>
        <br/>

        <div>
          <label>Reason for Request:</label><br />
          <textarea
            value={reason}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setReason(e.target.value)
            }
          />
        </div>
        <br/>
        <button type="submit">Submit Controlled Form</button>
      </form>

      {/* Display Submitted Requests */}
      {submittedRequests.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Submitted Requests</h3>

          {submittedRequests.map((req, index) => (
            <div key={index}>
              <p><strong>Name:</strong> {req.studentName}</p>
              <p><strong>ID:</strong> {req.studentId}</p>
              <p><strong>Book:</strong> {req.bookTitle}</p>
              <p><strong>Author:</strong> {req.author}</p>
              <p><strong>Reason:</strong> {req.reason}</p>
              <hr />
            </div>
          ))}
        </div>
      )}

      <hr style={{ margin: "40px 0" }} />

      {/* Uncontrolled Form */}
      <h2>Uncontrolled Form</h2>
      <form onSubmit={handleUncontrolledSubmit}>
        <div>
          <label>Student Name:</label><br />
          <input type="text" ref={nameRef} />
        </div>
        <br/>
        <div>
          <label>Student ID:</label><br />
          <input type="text" ref={idRef} />
        </div>
        <br/>
        <div>
          <label>Book Title:</label><br />
          <input type="text" ref={titleRef} />
        </div>
        <br/>
        <div>
          <label>Author:</label><br />
          <input type="text" ref={authorRef} />
        </div>
        <br/>
        <div>
          <label>Reason for Request:</label><br />
          <textarea ref={reasonRef} />
        </div>
        <br/>
        <button type="submit">Submit Uncontrolled Form</button>
      </form>
    </div>
  );
}

export default App;