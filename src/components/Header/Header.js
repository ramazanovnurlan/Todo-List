import { Button, PageHeader } from "antd";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <PageHeader
      className="site-page-header"
      title="Contacts"
      style={{ border: "1px solid rgb(235, 237, 240)" }}
      extra={[
        <Button
          key="1"
          type="primary"
          htmlType="submit"
          block
          onClick={() => navigate("/contacts/new")}
          style={{
            width: "200px",
            backgroundColor: "#2bcbba",
            border: "#2bcbba",
          }}
        >
          Add New Contact
        </Button>,
      ]}
    />
  );
};

export default Header;
