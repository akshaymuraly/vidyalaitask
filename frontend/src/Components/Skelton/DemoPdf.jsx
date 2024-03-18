import "./DemoPdf.css"
import { IoCloudDownloadSharp } from "react-icons/io5";

const DemoPdf = () => {
  return (
    <div className="demo-pdf-container">
        <ol>
            <li>Select or drag the file to drop zone.</li>
            <li>File will be uploaded automatically to the server.</li>
            <li>Select the needed pages by clicking the pages</li>
            <li>Click the "Create new pdf" button to create the new pdf file</li>
            <li>Click the download icon <IoCloudDownloadSharp/> to download many copies as want.</li>
        </ol>
    </div>
  )
}

export default DemoPdf