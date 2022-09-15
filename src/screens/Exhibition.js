import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../firebase";

const Exhibition = () => {
  const [genre, setGenre] = useState("");
  const [designers, setDesigners] = useState([]);
  const getDesigners = async () => {
    const designRef = collection(dbService, "designers");
    const q = query(designRef, where("genre", "==", genre));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const newObj = {
        ...doc.data(),
        id: doc.id,
      };
      setDesigners([newObj]);
    });
    console.log(designers);
  };
  useEffect(() => {
    getDesigners();
  }, [genre]);

  const onClick = (event) => {
    setGenre(event.target.id);
    console.log(genre);
  };
  return (
    <div>
      <div>
        <span onClick={onClick} id="UX/UI">
          UX/UI
        </span>
        <span onClick={onClick} id="ADVERTISEMENT">
          ADVERTISEMENT
        </span>
        <span onClick={onClick} id="IDENTITY">
          IDENTITY
        </span>
        <span onClick={onClick} id="CHARACTER">
          CHARACTER
        </span>
        <span onClick={onClick} id="GAME">
          GAME
        </span>
      </div>
      {designers.map((designer) => (
        <div key={designer.id}>
          <img src={designer.thumnailUrl} height="300px" alt="" />
          <p>{designer.workName}</p>
          <p>{designer.genre}</p>
        </div>
      ))}
    </div>
  );
};
export default Exhibition;
