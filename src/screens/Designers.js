import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../firebase";

const Designer = () => {
  const [designers, setDesigners] = useState([]);
  const getDesigners = async () => {
    const q = query(collection(dbService, "designers"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const newObj = {
        ...doc.data(),
        id: doc.id,
      };
      setDesigners((prev) => [newObj, ...prev]);
    });
  };
  useEffect(() => {
    getDesigners();
  }, []);
  console.log(designers);
  return (
    <div>
      {designers.map((designer) => (
        <div key={designer.id}>
          <img src={designer.profileUrl} alt="" />
          <span>{designer.name}</span>
        </div>
      ))}
    </div>
  );
};
export default Designer;
