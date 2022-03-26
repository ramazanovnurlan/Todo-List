import "./App.css";
import "../src/assets/scss/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";
import Contact from "./containers/Contact/Contact";
import NewContact from "./containers/NewContact/NewContact";
import EditContact from "./containers/EditContact/EditContact";
import ContactContextProvider from "./context/ContactContext";

function App() {
  return (
    <ContactContextProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/contacts" element={<Contact />} />
            <Route path="/contacts/new" element={<NewContact />} />
            <Route path="/contacts/edit/:id" element={<EditContact />} />
            <Route>Not Found</Route>
          </Routes>
        </div>
      </Router>
    </ContactContextProvider>
  );
}

export default App;
