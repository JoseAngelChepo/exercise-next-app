"use client";
import { useEffect, useState } from "react";

export default function About(props) {
  const [data, setData] = useState(null);

  const loadData = () => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((response) => {
        setData(response.data);
      });
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-10">
        {data && (
          <div className="container-about">
            <h3 className="text-xl font-bold mt-2">
              {data.name}
              <span style={{ fontWeight: 300 }}> desarrollado por </span>
              {data.developer}
            </h3>
            <h1 className="mt-2">Disponible para</h1>
            <div className="container-available-languages">
              {data.language.map((item, index) => (
                <div key={index} className="container-option">
                  <p className="text-option">{item}</p>
                </div>
              ))}
            </div>
            <h1 className="mt-2">
              Desarrollado en: {data.implementation_language}
            </h1>
            <h1 className="mt-4">Descripción:</h1>
            <p className="mt-2">{data.description}</p>
            <h1 className="font-bold mt-2">Casos de uso</h1>
            <div className="container-list">
              {data.use_cases.map((item, index) => (
                <div key={index} className="container-item-list">
                  <p className="text-item-list">{item}</p>
                </div>
              ))}
            </div>
            <h1 className="font-bold mt-2">Beneficios</h1>
            <div className="container-list">
              {data.benefits.map((item) => (
                <div className="container-item-list">
                  <p className="text-item-list">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <style jsx>
        {`
          .container-about {
            width: 90%;
            display: flex;
            flex-direction: column;
            align-items: start;
          }
          .container-available-languages {
            display: flex;
            align-items: center;
            justify-content: start;
          }
          .container-option {
            background-color: #dadada;
            border-radius: 30px;
            margin: 5px 10px 5px 0px;
            padding: 0px 10px;
          }
          .text-option {
            font-size: 0.9rem;
            font-weight: 500;
            color: #000;
          }
          .container-list {
            display: flex;
            flex-direction: column;
            align-items: start;
            margin: 10px 0px 30px 0px;
          }
          .container-item-list {
            background-color: #dadada;
            border-radius: 3px;
            margin: 5px 10px 5px 0px;
            padding: 0px 10px;
          }
          .text-item-list {
            font-size: 1rem;
            font-weight: 500;
            color: #000;
          }
        `}
      </style>
    </>
  );
}
