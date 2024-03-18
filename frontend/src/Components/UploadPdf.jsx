import React, { useEffect, useRef, useState } from "react";
import "./UploadPdf.css";
import axios from "axios";
import { CiSettings } from "react-icons/ci";
import { IoCloudDownloadSharp } from "react-icons/io5";
import { Document, Page, pdfjs } from "react-pdf";
import PdfContent from "./pdfContent.jsx";
import DemoPdf from "./Skelton/DemoPdf.jsx";
import GoDownBtn from "./GoDownBtn.jsx";
import { userActions } from "../Store/Store.js";
import { useDispatch } from "react-redux";
axios.defaults.withCredentials = true;

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const UploadPdf = () => {
  const dispatch = useDispatch();
  const filDropAreaRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading,setLoading] = useState(false)
  const [pdf, setPdf] = useState(false);
  const [inputs, setInputs] = useState({
    file: null,
  });
  const [url, setUrl] = useState("");
  const [payload, setPayload] = useState({
    pagenumber: [],
  });
  const uploadBtnRef = useRef(null);

  const handleUpload = () => {
    uploadBtnRef.current.click();
  };
  const handleChange = (e) => {
    if (!e.target.files) {
      setErrorMessage("File selection cancelled!");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (errorMessage) {
      return;
    }
    if (file && file.type === "application/pdf") {
      setInputs({ file });
    } else {
      setErrorMessage(
        "Not a valid file type! /* .pdf only the valid file type."
      );
      console.log("Not supported!");
      setTimeout(() => setErrorMessage(""), 4000);
    }
  };

  const handleUploadFile = async () => {
    const formData = new FormData();
    for (const key in inputs) {
      formData.append(key, inputs[key]);
    }
    // console.log(formData);
    try {
      const response = await axios.post("api/pdfupload", formData,{withCredentials:true});
      setPdf(true)
    } catch (err) {
      setPdf(false);
       if(err?.response?.status===401){
        console.log(err)
        setErrorMessage(err?.response?.data?.message||"Authorization failed,login again!")
        setTimeout(()=>dispatch(userActions.userLogout()),3000);
        return
      }
      setErrorMessage(err?.response?.data?.message||"Something went wrong!")
    }
  };
  const handleselectPages = (e) => {
    if (
      e.target.name === "pagenumber" &&
      payload.pagenumber.includes(parseInt(e.target.value))
    ) {
      setPayload((prev) => ({
        ...prev,
        [e.target.name]: prev.pagenumber.filter(
          (item) => item !== parseInt(e.target.value)
        ),
      }));
      return;
    }
    setPayload((prev) => ({
      ...prev,
      ...(e.target.name === "pagenumber" && {
        [e.target.name]: [...prev.pagenumber, parseInt(e.target.value)],
      }),
    }));
  };
  const handleCreateNewPdf = async () => {
    if(!inputs.file){
      // console.log("No file selected")
     setErrorMessage("No files selected!") 
     setTimeout(()=>setErrorMessage(""),3000)
     return
    }
    if(!payload.pagenumber.length){
       setErrorMessage("No Pages selected, select atleast one!") 
     setTimeout(()=>setErrorMessage(""),3000)
     return
    }
    try {
      setLoading(true)
      const response = await axios.post(
        `api/generatepdf/${encodeURIComponent(inputs.file.name)}`,
        payload,
        {
          responseType: "blob",
        }
      );
      if (response.status === 200) {
        setLoading(false)
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setUrl(url);
      } else {
        console.error("Failed to generate and download PDF");
        setErrorMessage("Failed to load the file!")
        setTimeout(()=>setErrorMessage(""),3000)
      }
    } catch (err) {
      setLoading(false)
      if(err?.response?.status===401){
        setErrorMessage(err?.response?.data?.message||"Authorization failed,login again!")
        setTimeout(()=>dispatch(userActions.userLogout()),3000);
        return
      }
      setErrorMessage(err?.response?.data?.message||"Something went wrong!")
    }
  };
  useEffect(() => {
    const fileDropArea = filDropAreaRef.current;
    const handleDragOver = (e) => {
      e.preventDefault();
      fileDropArea.classList.add("drag-over");
    };

    const handleDragLeave = () => {
      fileDropArea.classList.remove("drag-over");
    };

    const handleDrop = (e) => {
      e.preventDefault();
      fileDropArea.classList.remove("drag-over");
      const file = e.dataTransfer.files[0];
      handleFile(file);
    };

    fileDropArea.addEventListener("dragover", handleDragOver);
    fileDropArea.addEventListener("dragleave", handleDragLeave);
    fileDropArea.addEventListener("drop", handleDrop);

    return () => {
      fileDropArea.removeEventListener("dragover", handleDragOver);
      fileDropArea.removeEventListener("dragleave", handleDragLeave);
      fileDropArea.removeEventListener("drop", handleDrop);
    };
  }, []);
  useEffect(() => {
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [url]);

  useEffect(() => {
    // console.log("Selected file: ", inputs);
    if (inputs.file) {
      handleUploadFile()
    }
  }, [inputs]);
  // useEffect(() => console.log(payload), [payload]);

  return (
    <section className="uploadpdf-container">
      {/* <GoDownBtn/> */}
      <div
        ref={filDropAreaRef}
        className="uploadpdf-btn"
        onClick={handleUpload}
      >
        <h2>
          {errorMessage
            ? errorMessage
            : inputs.file
            ? inputs.file.name
            : "Drag & drop or click to upload!"}
        </h2>
      </div>
      <div>
        {pdf ? (
          <PdfContent
            inputs={inputs}
            payload={payload}
            handleselectPages={handleselectPages}
          />
        ) : (
          <DemoPdf />
        )}
      </div>
      <div className="pdf-generator-btn-container" id="generator">
        <button onClick={handleCreateNewPdf} className="create-pdf-btn" disabled={loading}>
          {loading?(
            <>
            <CiSettings className={`create-pdf-btn-logo rotate`} />
            </>):(
            <>
            Create new pdf 
            <CiSettings className={`create-pdf-btn-logo`} />
            </>)
            }
        </button>
        {url && (
          <a className="download-link" href={url} download={"pdf.pdf"}>
            <IoCloudDownloadSharp className="download-link-icon" />
          </a>
        )}
      </div>
      <form action="" style={{ display: "none" }}>
        <input
          id="file"
          type="file"
          accept="application/pdf"
          ref={uploadBtnRef}
          onChange={handleChange}
        />
      </form>
    </section>
  );
};

export default UploadPdf;
