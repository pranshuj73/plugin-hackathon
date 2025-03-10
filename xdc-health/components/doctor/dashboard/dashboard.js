import { useEffect, useState } from "react";
import Modal from "../../utils/modal";
import Scaffold from "../../utils/scaffold";
import Table from "../../utils/table";
import Tabs from "../../utils/tabs";
import { dashboardTabs, links, testRecords, testTableHeaders } from "../config"

export default function DoctorDashboard() {
    let today = new Date();
    const [currentTab, setCurrentTab] = useState("Current Applications")
    const [isOpen, setIsOpen] = useState(false);

    const [currentSessions, setCurrentSessions] = useState([]);
    const [previousSessions, setPreviousSessions] = useState([]);

    useEffect(() => {
        let current = [];
        let previous = [];
        testRecords.forEach((record) => {
            if (record.isCompleted) {
                previous.push(record);
            } else {
                current.push(record);
            }
        })
        setCurrentSessions(current);
        setPreviousSessions(previous);
    }, [])

    const handleTabClick = (value) => {
        console.log(value)
        if (value != currentTab) setCurrentTab(value)
    }

    const handleEdit = (value) => {
        console.log(value)
    }

    return (
        <Scaffold links={links} page="Dashboard">
            <div className="">
                <h1 className="mt-6 text-4xl">Welcome, Doctor</h1>
                <h3>Today is {today.toDateString()} </h3>
            </div>
            <div className="py-3">
                <Tabs onClick={handleTabClick} tabs={dashboardTabs} current={currentTab} />
            </div>
            <div>
                {currentTab == "Current Applications" ? (
                    <Table head={testTableHeaders} data={currentSessions} onClick={handleEdit} editable />
                ) : (
                    <Table head={testTableHeaders} data={previousSessions} onClick={handleEdit} editable />
                )}
            </div>
            <Modal isOpen={isOpen} onCancel={() => setIsOpen(prev => !prev)} onSubmit={() => setIsOpen(prev => !prev)} >
                {/* <Field label="Adhaar Number" type="text" onChange={(e) => setAdhaar(e.target.value)} />
                <Field label="Name" type="text" onChange={(e) => setName(e.target.value)} />
                <Field label="Date of Birth" type="date" onChange={(e) => setDob(e.target.value)} />
                <Field label="Phone Number" type="tel" onChange={(e) => setPhone(e.target.value)} />
                <Field label="Address" type="text" onChange={(e) => setAddress(e.target.value)} /> */}
            </Modal>
        </Scaffold>
    )
}