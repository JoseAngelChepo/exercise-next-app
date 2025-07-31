"use client";

export default function Home() {
  const sendRegister = () => {
    alert("Send register");
  };
  return (
    <>
      <div className="container-home">
        <h1 className="title-home">Registrar</h1>
        <p className="subtitle-home">
          Registrate de forma anticipada a New project
        </p>
        <input
          className="input-register"
          type="email"
          placeholder="email@email.com"
        />
        <button className="button-register" onClick={() => sendRegister()}>
          Registrar
        </button>
      </div>
      <style jsx>
        {`
          .container-home {
            display: flex;
            min-height: 70vh;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
          .title-home {
            font-size: 2rem;
            font-weight: 700;
          }
          .subtitle-home {
            font-size: 1.5rem;
            font-weight: 500;
          }
          .input-register {
            height: 50px;
            width: 300px;
            border: 2px solid #dadada;
            border-radius: 9px;
            padding: 0px 10px;
            margin: 20px;
            outline: none;
          }
          .button-register {
            background-color: #dadada;
            height: 50px;
            width: 200px;
            border-radius: 9px;
            color: #000;
            font-size: 1.1rem;
            font-weight: 600;
          }
        `}
      </style>
    </>
  );
}
