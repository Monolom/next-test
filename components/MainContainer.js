import { useEffect, useState } from "react";
import Head from "next/head";
import { Button, FormGroup, InputGroup, Text, Label } from "@blueprintjs/core";
import { validateEmail } from "../helpersJs/index";
import { useAppContext } from "../context/Context";

import Modal from "./Modal";

const initialData = {
  email: "sayten@test.com",
  pass: "paholainen",
};
const initialAlertData = {
  email: "",
  pass: "",
};

const MainContainer = ({ email, children }) => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(initialData);
  const [alert, setAlert] = useState(initialAlertData);
  const [context, loginUser, , reloginUser] = useAppContext();
  const [loadMasage, setLoadMasage] = useState("");
  const { error } = context;

  useEffect(() => {
    setLoadMasage("");
    if (error) {
      setAlert((state) => ({ ...state, pass: "пароль или емайл не подходит" }));
    } else {
      setAlert((state) => ({ ...state, pass: "" }));
    }
  }, [context]);

  const toogleModal = () => {
    setModal((state) => !state);
  };

  const onLogin = () => {
    console.log("login");
    if (!validateEmail(data.email)) {
      setAlert((state) => ({ ...state, email: "введите коректную почту" }));
    }
    setLoadMasage("Загрузка");
    loginUser(data.email, data.pass);
  };

  return (
    <>
      <Head>
        <meta
          keywords={!email ? "Страница логина" : `контент для: ${email}`}
        ></meta>
        <title>{!email ? "Страница логина" : `Контент`}</title>
      </Head>
      <div className="navbar">
        <div className="logo">Тестовое задание</div>
        <div className="login-container">
          {email ? (
            <div onClick={toogleModal} className="avatar-container">
              <Text>{email}</Text>
              <div className="avatar"></div>
            </div>
          ) : (
            <Button onClick={toogleModal} className="btn-logo">
              Вход
            </Button>
          )}
        </div>
      </div>
      <Modal isVisible={modal} onClose={toogleModal}>
        <div className="login-modal-wrapper">
          {email ? (
            <>
              <Text style={{ marginBottom: "20px" }} className="login-title">
                Выход?
              </Text>
              <div className="button-row">
                <Button onClick={toogleModal} className="pagination-button">
                  Нет
                </Button>
                <Button
                  onClick={() => {
                    reloginUser();
                  }}
                  className="pagination-button"
                >
                  Да
                </Button>
              </div>
            </>
          ) : (
            <>
              <Text>Вход</Text>
              <FormGroup helperText={alert.email} intent={"warning"}>
                <Label className="input-label">email</Label>
                <InputGroup
                  placeholder={"email"}
                  value={data.email}
                  className="form-input"
                  onChange={(event) => {
                    setAlert(initialAlertData);
                    setData({ ...data, email: event.target.value });
                  }}
                ></InputGroup>
              </FormGroup>
              <FormGroup helperText={alert.pass} intent={"warning"}>
                <Label className="input-label">password</Label>
                <InputGroup
                  placeholder={"password"}
                  value={data.pass}
                  className="form-input"
                  onChange={(event) => {
                    setAlert(initialAlertData);
                    setData({ ...data, pass: event.target.value });
                  }}
                ></InputGroup>
              </FormGroup>
              <InputGroup
                type="submit"
                value={loadMasage ? loadMasage : "Войти"}
                className="form-submit"
                onClick={onLogin}
                disabled={!data.pass || !data.email}
              ></InputGroup>
            </>
          )}
        </div>
      </Modal>

      {children}
    </>
  );
};

export default MainContainer;
