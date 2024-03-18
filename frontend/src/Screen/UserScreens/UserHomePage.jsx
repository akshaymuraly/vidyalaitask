import Header from "../../Components/Header.jsx";
import UploadPdf from "../../Components/UploadPdf.jsx";
import "./UserHomePage.css";

function UserHomePage() {
  return (
    <main className="UserHomePage">
      <Header />
      <UploadPdf />
    </main>
  );
}

export default UserHomePage;
