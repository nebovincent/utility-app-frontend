import React, { useState } from "react";
import nextConfig from "next.config";
import classes from "components/Auth/User/Register.module.css";
import Container from "components/utility/Container";
import axios from "axios";

function TestingImage() {
  const [file, setFile] = useState<any>();
  const [test, setTest] = useState("");

  const handleFileChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setFile(target?.files?.[0]);

    //   setFile(event.currentTarget.files);
  };

  //   console.log(file);

  const saveProfileImage = async (e: any) => {
    e.preventDefault();
    const data = new FormData();
    data.append("test", test);
    data.append("avatar", file);

    console.log(data);

    axios
      .post(`${nextConfig.env?.backend_url}/user/upload-image`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container className={classes.register__main_container}>
      <div className={classes.register__main}>
        <form
          onSubmit={saveProfileImage}
          style={{ display: "flex", flexDirection: "column", gap: "50px" }}
          encType="multipart/form-data"
        >
          {/* profile picture section */}
          <label htmlFor="avatar">Profile Photo</label>
          <input
            type="file"
            id="avatar"
            className={classes.profile_input}
            onChange={handleFileChange}
            style={{ color: "black" }}
          />
          <input
            type="text"
            onChange={(e) => {
              setTest(e.target.value);
            }}
          />
          <button type="submit">Submit</button>

          {/* profile picture section */}
        </form>
      </div>
    </Container>
  );
}

export default TestingImage;
