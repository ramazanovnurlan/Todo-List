import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  SnippetsFilled,
} from "@ant-design/icons";
import { Table, Button, Modal, Popconfirm } from "antd";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { ContactContext } from "../../context/ContactContext";

const Contact = () => {
  const navigate = useNavigate();
  const { contacts, dispatch } = useContext(ContactContext);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const { confirm } = Modal;

  let objDetail = {
    name: "",
    surname: "",
    fatherName: "",
    email: "",
    additionalInfo: "",
    specialty: "",
    gender: "",
  };

  let contactDetail;
  const contactId = localStorage.getItem("id");
  contactDetail = contacts.find((x) => x.id == contactId);
  objDetail.id = contactDetail.id;
  objDetail.name = contactDetail.name;
  objDetail.surname = contactDetail.surname;
  objDetail.fatherName = contactDetail.fatherName;
  objDetail.email = contactDetail.email;
  objDetail.additionalInfo = contactDetail.additionalInfo;
  objDetail.specialty = contactDetail.specialty;
  objDetail.gender = contactDetail.gender;

  const showModal = (id) => {
    localStorage.setItem("id", id);
    setIsModalVisible(true);
  };
  const handleDetailOk = () => {
    setIsModalVisible(false);
  };

  const handleDetailCancel = () => {
    setIsModalVisible(false);
  };

  function showDeleteConfirm(contactId) {
    console.log(contactId);
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
        dispatch({ type: "remove_contact", id: contactId });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Father Name",
      dataIndex: "fatherName",
      key: "fatherName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: "Additional Information",
    //   dataIndex: "additionalInfo",
    //   key: "additionalInfo",
    // },
    {
      title: "Specialty",
      dataIndex: "specialty",
      key: "specialty",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Action",
      key: "action",
      render: (contact) => {
        return (
          <>
            <Button
              type="primary"
              onClick={() => showModal(contact.id)}
              style={{
                backgroundColor: "white",
                color: "grey",
                border: "1px solid #d9d9d9",
              }}
            >
              <SnippetsFilled />
            </Button>
            <Modal
              title="Contact Details"
              visible={isModalVisible}
              onOk={handleDetailOk}
              onCancel={handleDetailCancel}
            >
              <p><b>Id:</b> {objDetail.id}</p>
              <p><b>Name:</b> {objDetail.name}</p>
              <p><b>Surname:</b> {objDetail.surname}</p>
              <p><b>Father Name:</b> {objDetail.fatherName}</p>
              <p><b>Additional Information:</b> {objDetail.additionalInfo}</p>
              <p><b>Specialty:</b> {objDetail.specialty}</p>
              <p><b>Gender:</b> {objDetail.gender}</p>
            </Modal>
            <Button onClick={(e) => navigate(`/contacts/edit/${contact.id}`)}>
              <EditOutlined style={{ color: "#2bcbba" }} />
            </Button>
            <Button onClick={() => showDeleteConfirm(contact.id)} type="dashed">
              <DeleteOutlined style={{ color: "red" }} />
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div className="contact-container">
      <Header />
      <Table columns={columns} dataSource={contacts} />
    </div>
  );
};

export default Contact;
