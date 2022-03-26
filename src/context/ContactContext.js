import { notification } from "antd";
import { createContext, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

export const ContactContext = createContext();

const ContactContextProvider = (props) => {
  
  const reducer = (contacts, action) => {
    switch (action.type) {
      case "add_contact":
        return [
          ...contacts,
          {
            id: uuidv4(),
            key: uuidv4(),
            name: action.contact.name,
            surname: action.contact.surname,
            fatherName: action.contact.fatherName,
            email: action.contact.email,
            additionalInfo: action.contact.additionalInfo,
            specialty: action.contact.specialty,
            gender: action.contact.gender,
          },
        ];

      case "remove_contact":
        return contacts.filter((contact) => contact.id !== action.id);

      case "update_contact":
        return contacts.map((contact) => {
          if (contact.id == action.id) {
            action.updatedContact = {
              ...action.updatedContact,
              id: contact.id,
              key: contact.key,
            };
            return action.updatedContact;
          }
          return contact;
        });
      default:
        return contacts;
    }
  };

  const [contacts, dispatch] = useReducer(
    reducer,
    [
      {
        id: uuidv4(),
        key: uuidv4(),
        name: "Nurlan",
        surname: "Ramazanov",
        fatherName: "Neriman",
        email: "example@mail.ru",
        additionalInfo: "fgdfgf",
        specialty: "fgdfgf0",
        gender: "fgdfgf",
        //   [
        //     { id: 1, name: "Engineer 1" },
        //     { id: 2, name: "Engineer 2" },
        //   ],
      },
      {
        id: uuidv4(),
        key: uuidv4(),
        name: "Nurlan",
        surname: "Ramazanov",
        fatherName: "Neriman",
        email: "example@mail.ru",
        additionalInfo: "fgdfgf",
        specialty: "fgdfgf",
        gender: "fgdfgf",
        //   [
        //     { id: 1, name: "Engineer 1" },
        //     { id: 2, name: "Engineer 2" },
        //   ],
      },
    ],
    () => {
      const contacts = localStorage.getItem("contacts")
      return contacts ? JSON.parse(contacts) : [];
    }
  );

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  });
  const openNotification = (placement, value) => {
    notification.success({
      message: `Notification success`,
      description: `Contact was successfully ${value}`,
      placement,
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        dispatch,
        openNotification,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactContextProvider;
