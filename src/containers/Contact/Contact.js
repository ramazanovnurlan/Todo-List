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
  if (contacts.length != 0) {
  }

  const showModal = (id) => {
    contactDetail = contacts.find((x) => x.id == id);
    localStorage.setItem("contactDetail", JSON.stringify(contactDetail));
    contactDetail = JSON.parse(localStorage.getItem("contactDetail"));

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
              <p>
                <b>Id:</b>
                {JSON.parse(localStorage.getItem("contactDetail")) != null
                  ? JSON.parse(localStorage.getItem("contactDetail")).id
                  : ""}
              </p>
              <p>
                <b>Name:</b>
                {JSON.parse(localStorage.getItem("contactDetail")) != null
                  ? JSON.parse(localStorage.getItem("contactDetail")).name
                  : ""}
              </p>
              <p>
                <b>Surname:</b>
                {JSON.parse(localStorage.getItem("contactDetail")) != null
                  ? JSON.parse(localStorage.getItem("contactDetail")).surname
                  : ""}
              </p>
              <p>
                <b>Father Name:</b>
                {JSON.parse(localStorage.getItem("contactDetail")) != null
                  ? JSON.parse(localStorage.getItem("contactDetail")).fatherName
                  : ""}
              </p>
              <p>
                <b>Additional Information:</b>
                {JSON.parse(localStorage.getItem("contactDetail")) != null
                  ? JSON.parse(localStorage.getItem("contactDetail"))
                      .additionalInfo
                  : ""}
              </p>
              <p>
                <b>Specialty:</b>
                {JSON.parse(localStorage.getItem("contactDetail")) != null
                  ? JSON.parse(localStorage.getItem("contactDetail")).specialty
                  : ""}
              </p>
              <p>
                <b>Gender:</b>
                {JSON.parse(localStorage.getItem("contactDetail")) != null
                  ? JSON.parse(localStorage.getItem("contactDetail")).gender
                  : ""}
              </p>
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
