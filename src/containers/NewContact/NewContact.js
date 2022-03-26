import { Form, Input, Button, Select, Radio, Space } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const NewContact = () => {
  const navigate = useNavigate();
  const { dispatch, openNotification } = useContext(ContactContext);

  const [newContact, setNewContact] = useState({
    name: "",
    surname: "",
    fatherName: "",
    email: "",
    additionalInfo: "",
    specialty: "",
    gender: "",
  });

  const {
    name,
    surname,
    fatherName,
    email,
    additionalInfo,
    specialty,
    gender,
  } = newContact;

  const onChangeInput = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  let selectValue;

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    selectValue = value;
    console.log(selectValue);
  };

  const onFinish = (e) => {
    navigate("/contacts");
    dispatch({
      type: "add_contact",
      contact: {
        name,
        surname,
        fatherName,
        email,
        additionalInfo,
        specialty,
        gender,
      },
    });
  };

  const enabled =
    name.length > 0 &&
    surname.length > 0 &&
    fatherName.length > 0 &&
    email.length > 0 &&
    additionalInfo.length > 0 &&
    specialty.length > 0 &&
    gender.length > 0;

  return (
    <>
      <div className="new-contact-container">
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="name"
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
              onChange={(e) => onChangeInput(e)}
            />
          </Form.Item>
          <Form.Item
            name="surname"
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
              onChange={(e) => onChangeInput(e)}
            />
          </Form.Item>
          <Form.Item
            name="fathername"
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
              onChange={(e) => onChangeInput(e)}
            />
          </Form.Item>
          <Form.Item
            name="email"
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
              onChange={(e) => onChangeInput(e)}
            />
          </Form.Item>
          <Form.Item
            name="additionalInfo"
            label="Additional Information"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea
              name="additionalInfo"
              value={additionalInfo}
              onChange={(e) => onChangeInput(e)}
            />
          </Form.Item>

          {/* <Form.Item
            name="specialty"
            label="Specialty"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              name="specialty"
              value={specialty}
              onChange={(e) => onChangeInput(e)}
              // onChange={handleChange}
            >
              <Option value="Information Technology">
                Information technology
              </Option>
              <Option value="Computer Engineering">Computer Engineering</Option>
              <Option value="Artificial Intelligence">
                Artificial Intelligence
              </Option>
              <Option value="Network Administrator">
                Network Administrator
              </Option>
            </Select>
          </Form.Item> */}

          <Form.Item
            name="specialty"
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
              onChange={(e) => onChangeInput(e)}
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group
              name="gender"
              value={gender}
              onChange={(e) => onChangeInput(e)}
            >
              <Radio value="man">Man</Radio>
              <Radio value="woman">Woman</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!enabled}
                onClick={() => openNotification("top", "added")}
              >
                Add New Contact
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default NewContact;
