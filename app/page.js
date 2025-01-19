"use client";

import styles from './page.module.css';
import { useState, useEffect } from "react";

const regions = {
  "ภาคกลาง": [
    "Bangkok", "Ang Thong", "Chai Nat", "Kamphaeng Phet", "Lop Buri",
    "Nakhon Nayok", "Nakhon Pathom", "Nonthaburi", "Pathum Thani",
    "Phetchabun", "Phichit", "Phitsanulok", "Samut Prakan",
    "Samut Sakhon", "Samut Songkhram", "Saraburi", "Sing Buri",
    "Suphan Buri", "Uthai Thani", "Phra Nakhon Si Ayutthaya", "Nakhon Sawan", "Sukhothai"
  ],
  "ภาคเหนือ": [
    "Chiang Mai", "Chiang Rai", "Lampang", "Lamphun",
    "Mae Hong Son", "Nan", "Phayao", "Phrae", "Uttaradit"
  ],
  "ภาคตะวันตก": [
    "Tak", "Kanchanaburi", "Phetchaburi", "Prachuap Khiri Khan", "Ratchaburi"
  ],
  "ภาคตะวันออกเฉียงเหนือ": [
    "Amnat Charoen", "Buriram", "Chaiyaphum", "Kalasin", "Khon Kaen",
    "Loei", "Maha Sarakham", "Mukdahan", "Nakhon Phanom", "Nakhon Ratchasima",
    "Nong Bua Lam Phu", "Nong Khai", "Roi Et", "Sakon Nakhon", "Si Sa Ket",
    "Surin", "Ubon Ratchathani", "Udon Thani", "Yasothon", "Bueng Kan"
  ],
  "ภาคตะวันออก": [
    "Chanthaburi", "Chachoengsao", "Chon Buri", "Prachin Buri",
    "Rayong", "Sa Kaeo", "Trat"
  ],
  "ภาคใต้": [
    "Chumphon", "Krabi", "Nakhon Si Thammarat", "Narathiwat", "Pattani",
    "Phangnga", "Phatthalung", "Phuket", "Ranong", "Satun", "Songkhla",
    "Surat Thani", "Trang", "Yala"
  ]
};

export default function MyApp() {
  const [svgContent, setSvgContent] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");

  useEffect(() => {
    fetch("/thailand.svg")
      .then((response) => response.text())
      .then((data) => setSvgContent(data))
      .catch((err) => console.error("Error loading SVG:", err));
  }, []);

  function handleLocationClick(event) {
    const target = event.target;
    if (target.tagName === "path") {
      const provinceName = target.getAttribute("name") || "Unknown";
      if (target === "Unknown") {
        console.error("Could not find province");
        return;
      }
      console.log("Clicked on province:", provinceName);
      if (target.classList.contains(styles.selectedProvince)) {
        target.classList.add(styles.deselectedProvince);
        target.classList.remove(styles.selectedProvince);
      } else {
        target.classList.add(styles.selectedProvince);
        target.classList.remove(styles.deselectedProvince);
      }
    }
  }

  function highlightProvince(provinceName) {
    const target = document.getElementsByName(provinceName)[0] || "Unknown"; // เลือก path ทั้งหมดใน SVG
    if (target === "Unknown") {
      console.error("Could not find province");
      return;
    }
    console.log("Clicked on province:", provinceName);
    if (target.classList.contains(styles.selectedProvince)) {
      target.classList.add(styles.deselectedProvince);
      target.classList.remove(styles.selectedProvince);
    } else {
      target.classList.add(styles.selectedProvince);
      target.classList.remove(styles.deselectedProvince);
    }
  }

  function goToInfoPage() {
    window.location.href = "/info";
  }

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src="/IMG_6704.PNG" // รูปภาพที่อยู่ใน public
          alt="Thailand Map Header"
          style={{ width: "100%", maxWidth: "600px", borderRadius: "15px" }}
        />
      </div>

      {/* <div style={{ textAlign: "center" , marginBottom: "20px" }}>
        !!สามารถคลิ้กจังหวัดที่เคยไป!!
      </div> */}
       
      <div style={{ marginBottom: "50px" }}>  
        <div
          dangerouslySetInnerHTML={{ __html: svgContent }}
          onClick={handleLocationClick} 
        ></div>
      </div>
 
      <div style={{ color: "#947480" , display: "flex" , gap: "8px" , marginBottom: "10px" , paddingLeft: "20px" }}>
        <div style={{ width: "40px" , height: "40px" , backgroundColor: "#d8b5a6" }}></div>
        จังหวัดที่เคยไป
      </div>  

      <div style={{ color: "#947480" , display: "flex" , gap: "8px" , marginBottom: "10px" , paddingLeft: "20px" }}>
        <div style={{ width: "40px" , height: "40px" , backgroundColor: "white" }}></div>
        จังหวัดที่รอโอกาสไปเที่ยว
      </div>

      

       

      {/* แสดงปุ่มแบ่งตามภาค */}
      {Object.keys(regions).map((region) => (
        <div key={region} style={{ paddingLeft: "20px"}}>
          <div style={{ marginBottom: '10px' }}>
            <div
              style={{
              backgroundColor: "#e2bcbb",
              color: "#333",
              padding: "10px 20px",
              fontSize: "20px",
              // fontWeight: "bold",
              // border: "2px solid #ddd",
              borderRadius: "30px",
              textAlign: "center",
              marginBottom: "10px",
              width: "fit-content",
              fontFamily: 'Chakra Petch'
              }}
              >
              {region}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {regions[region].map((province) => (
                <button
                  key={province}
                  onClick={() => highlightProvince(province)}
                  style={{
                    backgroundColor: "#fbded4",
                    color: "#ce8583",
                    padding: "10px 20px",
                    fontSize: "16px",
                    border: "none",
                    borderRadius: "30px",
                    cursor: "pointer",
                  }}
                >
                  {province}
                </button>
              ))}
            </div>
          </div>
        </div>

      ))}

      <div style={{textAlign: "right", paddingRight: "20px"}}>
        <button id="navigateButton" onClick={goToInfoPage} 
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
          ไปเที่ยวกันต่อ
        </button>
      </div>
    </>
  );
}
