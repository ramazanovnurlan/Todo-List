import { Form, Input, Button, Select, Radio } from "antd";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContactContext } from "../../context/ContactContext";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const { Option } = Select;

const EditContact = () => {
  const { contacts, dispatch, openNotification } =
    useContext(ContactContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const contact = contacts.find((x) => x.id == id);

  const [name, setName] = useState(contact.name);
  const [surname, setSurname] = useState(contact.surname);
  const [fatherName, setFatherName] = useState(contact.fatherName);
  const [email, setEmail] = useState(contact.email);
  const [additionalInfo, setAdditionalInfo] = useState(contact.additionalInfo);
  const [specialty, setSpecialty] = useState(contact.specialty);
  const [gender, setGender] = useState(contact.gender);

  const updatedContact = {
    name,
    surname,
    fatherName,
    email,
    additionalInfo,
    specialty,
    gender,
  };

  const onFinish = (e) => {
    // updateContact(id, updatedContact);
    dispatch({ type: "update_contact", id, updatedContact });
    navigate("/contacts");
  };

  return (
    <>
      <div className="edit-contact-container">
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          className="nese"
        >
          <Form.Item
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Surname"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              name="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Father Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              name="fatherName"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
          >
            <Input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Additional Information">
            <Input.TextArea
              name="additionalInfo"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </Form.Item>

          {/* <Form.Item name="specialty" label="Specialty">
              <Select
                defaultValue="Information technology"
                style={{ width: 120 }}
                name="specialty"
                value={specialty}
                // onChange={(e) => setSpecialty(e.target.value)}
                onChange={handleChange}
              >
                <Option value="Information Technology">
                  Information technology
                </Option>
                <Option value="Computer Engineering">
                  Computer Engineering
                </Option>
                <Option value="Artificial Intelligence">
                  Artificial Intelligence
                </Option>
                <Option value="Network Administrator">
                  Network Administrator
                </Option>
              </Select>
            </Form.Item> */}

          <Form.Item
            label="Specialty"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              name="specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Gender">
            <Radio.Group
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <Radio value="man">Man</Radio>
              <Radio value="woman">Woman</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => openNotification("top", "updated")}
            >
              Edit Contact
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditContact;
