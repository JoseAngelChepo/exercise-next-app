"use client";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <>
      <header className="container-header">
        <h1 className="font-bold">New project</h1>
        <div className="flex gap-10">
          <p
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/about")}
          >
            Acerca
          </p>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/profile")}
          >
            Perfil
          </p>
        </div>
      </header>
      <style jsx>
        {`
          .container-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 30px 50px;
          }
        `}
      </style>
    </>
  );
};

export default Header;
