import { useState } from "react";
import { dbService, storageService } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import styled from "styled-components";

const DesignerForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  background-color: salmon;
  padding: 50px;
`;
const Form = () => {
  const [name, setname] = useState("");
  const [id, setid] = useState("");
  const genres = ["UX/UI", "ADVERTISEMENT", "IDENTITY", "CHARACTER", "GAME"];
  const [genre, setGenre] = useState("");
  const [workName, setWorkName] = useState("");
  const [profileAttachment, setProfileAttachment] = useState("");
  const [mainAttachment, setMainAttachment] = useState("");
  const [thumnailAttachment, setThumnailAttachment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    //파일 경로 참조 만들기
    const profileRef = ref(storageService, `${id}/profile`);
    const mainRef = ref(storageService, `${id}/main`);
    const thumnailRef = ref(storageService, `${id}/thumnail`);
    //storage 참조 경로로 파일 업로드 하기
    const profileResponse = await uploadString(
      profileRef,
      profileAttachment,
      "data_url"
    );
    const mainResponse = await uploadString(
      mainRef,
      mainAttachment,
      "data_url"
    );
    const thumnailResponse = await uploadString(
      thumnailRef,
      thumnailAttachment,
      "data_url"
    );
    //storage 참조 경로에 있는 파일의 URL을 다운로드해서 profileUrl 변수에 넣어서 업데이트
    const profileUrl = await getDownloadURL(profileResponse.ref);
    const mainUrl = await getDownloadURL(mainResponse.ref);
    const thumnailUrl = await getDownloadURL(thumnailResponse.ref);
    //트윗 오브젝트
    const nameObj = {
      name: name,
      id: id,
      genre: genre,
      workName: workName,
      profileUrl,
      mainUrl,
      thumnailUrl,
    };
    //트윗하기 누르면 nameObj 형태로 새로운 document 생성하여 nweets 콜렉션에 넣기
    await addDoc(collection(dbService, "designers"), nameObj);
    //state 비워서 form 비우기
    setname("");
    setid("");
    setGenre("");
    setWorkName("");
    setProfileAttachment("");
    setMainAttachment("");
    setThumnailAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "name") {
      setname(value);
    } else if (name === "id") {
      setid(value);
    } else if (name === "genre") {
      setGenre(value);
    } else if (name === "workName") {
      setWorkName(value);
    }
  };
  const onFileChange = (event) => {
    const {
      target: { name, files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      if (name === "profile") {
        setProfileAttachment(result);
      } else if (name === "main") {
        setMainAttachment(result);
      } else if (name === "thumnail") {
        setThumnailAttachment(result);
      }
    }; //리드가 끝났음을 알려주는 함수.
    reader.readAsDataURL(theFile);
  };

  return (
    <DesignerForm onSubmit={onSubmit}>
      <input
        name="name"
        value={name}
        onChange={onChange}
        type="text"
        placeholder="이름"
        maxLength={20}
      />
      <input
        name="id"
        value={id}
        onChange={onChange}
        type="text"
        placeholder="학번"
        maxLength={20}
      />
      <input
        name="workName"
        value={workName}
        onChange={onChange}
        type="text"
        placeholder="작품명"
        maxLength={20}
      />
      <select name="genre" onChange={onChange} value={genre}>
        {genres.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <p>
        Selected: <b>{genre}</b>
      </p>
      <div>
        <label htmlFor="profile-file">
          <p>학생사진</p>
        </label>
        <input
          name="profile"
          id="profile-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{
            opacity: 0,
          }}
        />
        {profileAttachment && (
          <div>
            <img
              src={profileAttachment}
              style={{
                backgroundImage: profileAttachment,
              }}
            />
          </div>
        )}
      </div>
      <div>
        <label htmlFor="main-file">
          <p>메인이미지</p>
        </label>
        <input
          name="main"
          id="main-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{
            opacity: 0,
          }}
        />
        {mainAttachment && (
          <div>
            <img
              src={mainAttachment}
              style={{
                backgroundImage: mainAttachment,
              }}
            />
          </div>
        )}
      </div>
      <div>
        <label htmlFor="thumnail-file">
          <p>썸네일이미지</p>
        </label>
        <input
          name="thumnail"
          id="thumnail-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{
            opacity: 0,
          }}
        />
        {thumnailAttachment && (
          <div>
            <img
              src={thumnailAttachment}
              style={{
                backgroundImage: thumnailAttachment,
              }}
            />
          </div>
        )}
      </div>
      <input type="submit" value="&rarr;" />
    </DesignerForm>
  );
};
export default Form;
