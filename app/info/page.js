"use client"

import styles from './page.module.css';
import {useState, useEffect, useRef} from "react"

export default function MyApp () {
  // const [count, setCount] = useState(20)
  const [svgContent, setSvgContent] = useState("")
  const [data, setData] = useState({});
  const [description1, setDescription1] = useState("")
  const [description2, setDescription2] = useState("")
  const [description3, setDescription3] = useState("")
  const [date, setDate] = useState("")
  const [provincename, setProvincename] = useState("")
  const descriptionRef = useRef(null);

    
  useEffect(() => {
    fetch("/thailand.svg")
    .then((response) => response.text())
    .then((data) => setSvgContent(data))
    .catch((err) => console.error("Error loading SVG:", err));
}, []);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error loading JSON:", err));
}, []); 

  function handleLocationClick (event) {
    const target = event.target
    if (target.tagName === "path") {
      const provinceName = target.getAttribute("name") || "Unknown"
      console.log("Clicked on province:", provinceName)
      
      setDescription1(data[provinceName].description1)
      setDescription2(data[provinceName].description2)
      setDescription3(data[provinceName].description3)
      setDate(data[provinceName].date)
      setProvincename(data[provinceName].provincename)

      if (descriptionRef.current) {
        descriptionRef.current.scrollIntoView({ behavior: 'smooth' });
      }

      if (target.classList.contains(styles.selectedProvince)) {
        target.classList.add(styles.deselectedProvince);
        target.classList.remove(styles.selectedProvince);
      }
      else {
        target.classList.add(styles.selectedProvince);
        target.classList.remove(styles.deselectedProvince);
      }
    }
  }

  function goHome() {
    window.location.href = "/";
  }

  return (
    <>

    <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src="/IMG_6707.PNG" // รูปภาพที่อยู่ใน public
          alt="Thailand Map Header"
          style={{ width: "100%", maxWidth: "600px", borderRadius: "15px" }}
        />
      </div>

    <div
      dangerouslySetInnerHTML={{ __html: svgContent}}
      onClick={handleLocationClick}
    ></div>

    <div ref={descriptionRef} style={{ backgroundColor: "#fbded4" , margin: "20px" , borderRadius: "20px"}}>
      <div style={{ padding: "10px" }}> 
        <div style={{ backgroundColor: "#fff5e1" , width: "10%" , textAlign: "center" , borderRadius: "20px" , marginBottom: "10px" , padding: "15px" }}>
          <div style={{ fontWeight: "bold" }}>{provincename}</div>
        </div>
      </div>   
      <div style={{ marginBottom: "10px" , padding: "10px" }}>{description1}</div>
      <div style={{ marginBottom: "10px" , padding: "10px" }}>{description2}</div>
      <div style={{ marginBottom: "10px" , padding: "10px" }}>{description3}</div>
      <div style={{ marginBottom: "10px" , padding: "10px" }}>{date}</div>
    </div>

    <div style={{textAlign: "right", paddingRight: "20px"}}>
        <button id="navigateButton" onClick={goHome} 
          style={{
            backgroundColor: "#fbded4",
            color: "black",
            padding: "10px 40px",
            fontSize: "16px",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            marginTop: "20px",
            }}>
          กลับ
        </button>
      </div>

    </>
  )
}