import Button from "~/components/common/Button";
import ImageFill from "~/components/common/ImageFill";
import { PropsNoti } from "./interfaces";
import background from "~/constants/images/background";
import styles from "./Noti.module.scss";

function Noti({
  disableButton,
  img = background.empty_table,
  title = "Dữ liệu trống",
  des = "Hiện tại dữ liệu đang trống!",
  titleButton = " Tạo ngay",
  onClick = () => {},
}: PropsNoti) {
  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <ImageFill className={styles.icon} src={img} />
      </div>
      <h3>{title}</h3>
      <p>{des}</p>
      {!disableButton ? (
        <div className={styles.btn}>
          <Button primary bold rounded_8 onClick={onClick}>
            {titleButton}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default Noti;
