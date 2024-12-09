import LightGallery from "lightgallery/react";
import { useMemo } from "react";
import lgZoom from "lightgallery/plugins/zoom";
import styles from "./ListImage.module.scss";
import ImageWithFallback from "../Image/ImageWithFallback";
function ListImage({ images = [] }: any) {
  const max = 1;
  const countImage = useMemo(() => images.length, [images]);
  return (
    <>
      <LightGallery
        elementClassNames={styles.container}
        speed={500}
        plugins={[lgZoom]}
      >
        {images?.map((v: any, i: any) => (
          <a
            hidden={i >= max}
            className={styles.item_image}
            key={i}
            href={`${process.env.NEXT_PUBLIC_IMAGES}/${v}`}
          >
            <div className={styles.listimg}>
              <ImageWithFallback
                className={styles.image_sick}
                src={`${process.env.NEXT_PUBLIC_IMAGES}/${v}`}
                alt="Ảnh bài đăng"
                layout="fill"
              />
            </div>

            {i + 1 == max && countImage > max ? (
              <div className={styles.count}>+{countImage - max}</div>
            ) : null}
          </a>
        ))}
      </LightGallery>
    </>
  );
}

export default ListImage;
