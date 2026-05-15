import { useContext } from "react";
import styles from "./Profile.module.css";
import UserContext from "../../contexts/UserContext";

const Profile = () => {
  const {user, token} = useContext(UserContext);

  return (
    <div className={styles.main}>
      PROFILE
      <br/>
      name: {user.fname}
      <br/>
      token: {token}
    </div>
  );
};

export default Profile;