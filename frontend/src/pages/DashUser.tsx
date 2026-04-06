import React from "react";
import "../styles/DashUser.css";
import DashCard from "../components/DashCard";

const cards = [
  { title: "Attendance", main: "35%", desc: "Overall Attendance", attBar: true, quickActions: false },
  { title: "Active courses", main: "6", desc: "Semester 1", attBar: false, quickActions: false },
  { title: "CGPA", main: "8.9/10", desc: "Last sem 0", attBar: false, quickActions: false },
  { title: "Quick Actions", main: "", desc: "", attBar: false, quickActions: true },
]

const StudentDashboard: React.FC = () => {
  return (
    <div className="container">
      <div className="card-container">
        {cards.map((card, index) => (
          <DashCard key={index} title={card.title} main={card.main} desc={card.desc} attBar={card.attBar} quickActions={card.quickActions} />
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
