import PartImagesItem from "@/components/modules/PartPage/PartImagesItem";
import { $boilerPart } from "@/context/boilerPart";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useStore } from "effector-react";
import { useState } from "react";
import styles from '@/styles/part/index.module.scss';
import PartSlider from "./PartSlider";


const PartImagesList = () => {
    const boilerPart = useStore($boilerPart)
    const isMobile = useMediaQuery(850)
    const images = boilerPart.images ? (JSON.parse(boilerPart.images) as string[]) : []
    const [currentImagesSrc, setCurrentImagesSrc] = useState('');


    return (
        <div className={styles.part__images}>
            {isMobile ? <PartSlider images={images} />
                : (<>
                    <div className={styles.part__images__main}>
                        <img src={currentImagesSrc || images[0]} alt={boilerPart.name} />
                    </div>
                    <ul className={styles.part__images__list}>
                        {images.map((item, i) => <PartImagesItem
                            key={i}
                            alt={`image-${i + 1}`}
                            callback={setCurrentImagesSrc}
                            src={item}
                        />)}
                    </ul>
                </>)}
        </div >
    );
}

export default PartImagesList;